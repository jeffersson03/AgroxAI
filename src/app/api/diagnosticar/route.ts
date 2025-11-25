import { NextRequest, NextResponse } from "next/server";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import jpeg from 'jpeg-js';

// 1. Configuración Segura del Backend (Solo una vez)
if (tf.getBackend() !== 'cpu') {
    await tf.setBackend('cpu');
}

async function cargar_modelo_agrox() {
    const modelJsonPath = path.join(process.cwd(), 'public', 'agrox-model', 'model.json');
    const weightsPath = path.join(process.cwd(), 'public', 'agrox-model', 'weights.bin');

    try {
        const modelJson = JSON.parse(await fs.readFile(modelJsonPath, 'utf-8'));
        const weightsBuffer = await fs.readFile(weightsPath);
        const weightsArrayBuffer = weightsBuffer.buffer.slice(
            weightsBuffer.byteOffset, 
            weightsBuffer.byteOffset + weightsBuffer.byteLength
        );

        const handler = {
            load: async () => {
                return {
                    modelTopology: modelJson.modelTopology || modelJson,
                    weightSpecs: modelJson.weightsManifest[0].weights,
                    weightData: weightsArrayBuffer
                };
            }
        };
        return await tf.loadLayersModel(handler);
    } catch (error) {
        console.error("Error cargando modelo:", error);
        throw error;
    }
}

function procesar_imagen_para_tensor(imageBuffer: Buffer): tf.Tensor {
    const rawImageData = jpeg.decode(imageBuffer, { useTArray: true });
    const imageTensor = tf.browser.fromPixels({
        data: new Uint8Array(rawImageData.data),
        width: rawImageData.width,
        height: rawImageData.height
    });
    const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
    const normalized = resized.expandDims(0).toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1));
    imageTensor.dispose();
    resized.dispose();
    return normalized;
}

async function guardar_imagen_temporal(fileBuffer: Buffer, fileName: string): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    try { await fs.access(uploadDir); } catch { await fs.mkdir(uploadDir, { recursive: true }); }
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, fileBuffer);
    return `/uploads/${fileName}`;
}

export async function POST(req: NextRequest) {
    // 2. LIMPIEZA DE MEMORIA (Vital para evitar errores al re-analizar)
    tf.disposeVariables();

    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) return NextResponse.json({ error: "No imagen" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${uuidv4()}-${file.name.replace(/\s/g, '_')}`;
        
        const savedPath = await guardar_imagen_temporal(buffer, fileName);
        const model = await cargar_modelo_agrox();

        let tensorInput;
        try {
             tensorInput = procesar_imagen_para_tensor(buffer);
        } catch (e) {
            return NextResponse.json({ error: "Usa JPG válido." }, { status: 400 });
        }

        const predictions = model.predict(tensorInput) as tf.Tensor;
        const data = await predictions.data();
        
        // Asegúrate que estas clases coincidan con tu modelo
        const clases = ["Sana", "ArañitaRoja", "Cochinilla", "Oidium", "PegadorBrotes", "Trips"];
        const maxIndex = Array.from(data).indexOf(Math.max(...Array.from(data)));
        const plagaDetectada = clases[maxIndex];
        const confianza = parseFloat((data[maxIndex] * 100).toFixed(2));
        const severidad = confianza > 90 ? 'Alta' : (confianza > 70 ? 'Media' : 'Baja');

        // Limpieza final
        tf.dispose([tensorInput, predictions]);
        model.dispose(); 

        return NextResponse.json({
            success: true,
            diagnostico: {
                imagen_url: savedPath,
                plaga: plagaDetectada,
                confianza: confianza.toFixed(2),
                severidad: severidad,
                mensaje: `Detectado ${plagaDetectada}`
            }
        });

    } catch (error) {
        console.error("Error en API:", error);
        return NextResponse.json({ error: "Error procesando imagen" }, { status: 500 });
    }
}
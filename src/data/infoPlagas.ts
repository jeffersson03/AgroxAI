// src/data/infoPlagas.ts

export interface InfoPlaga {
  nombre: string;
  nombreCientifico: string;
  descripcion: string;
  sintomas: string[];
  tratamientoBio: string[]; // Tratamiento Biológico/Orgánico
  tratamientoQuim: string[]; // Tratamiento Químico
}

export const infoPlagas: Record<string, InfoPlaga> = {
  "Sana": {
    nombre: "Planta Sana",
    nombreCientifico: "Vitis vinifera (Ejemplo)",
    descripcion: "La planta no presenta signos visibles de estrés, plagas o enfermedades.",
    sintomas: ["Hojas verdes y turgentes", "Crecimiento vigoroso", "Frutos sin manchas"],
    tratamientoBio: ["Mantener riego adecuado", "Fertilización balanceada"],
    tratamientoQuim: ["Ninguno requerido"]
  },
  "ArañitaRoja": {
    nombre: "Arañita Roja",
    nombreCientifico: "Tetranychus urticae",
    descripcion: "Pequeño ácaro que se alimenta de la savia de las hojas, causando decoloración y defoliación.",
    sintomas: [
      "Puntos amarillos en el haz de las hojas",
      "Telarañas finas en el envés",
      "Hojas bronceadas o secas"
    ],
    tratamientoBio: [
      "Aplicación de acaricidas naturales (aceite de neem)",
      "Liberación de depredadores naturales (Phytoseiulus persimilis)",
      "Lavado a presión con agua para romper telarañas"
    ],
    tratamientoQuim: [
      "Acaricidas específicos (Abamectina, Fenpiroximato)",
      "Aplicar rotando ingredientes activos para evitar resistencia"
    ]
  },
  "Cochinilla": {
    nombre: "Cochinilla Harinosa",
    nombreCientifico: "Planococcus ficus / Pseudococcus spp.",
    descripcion: "Insectos cubiertos de una cera blanca polvorienta que succionan savia y secretan melaza.",
    sintomas: [
      "Masas algodonosas blancas en troncos y hojas",
      "Presencia de melaza pegajosa y fumagina (hongo negro)",
      "Debilitamiento general de la planta"
    ],
    tratamientoBio: [
      "Jabón potásico + Aceite vegetal",
      "Control biológico con Cryptolaemus montrouzieri (mariquita)",
      "Limpieza manual en focos pequeños"
    ],
    tratamientoQuim: [
      "Insecticidas sistémicos (Imidacloprid, Espirotetramat)",
      "Aplicaciones dirigidas al tronco y cuello de la planta"
    ]
  },
  "Oidium": {
    nombre: "Oidium (Oídio)",
    nombreCientifico: "Erysiphe necator",
    descripcion: "Hongo que cubre los tejidos verdes con un micelio blanco polvoriento, afectando la fotosíntesis y calidad del fruto.",
    sintomas: [
      "Polvo blanco ceniciento en hojas y bayas",
      "Hojas encarrujadas o deformes",
      "Agrietamiento de bayas (Cracking)"
    ],
    tratamientoBio: [
      "Azufre en polvo o mojable (preventivo)",
      "Bicarbonato de potasio",
      "Bacillus subtilis"
    ],
    tratamientoQuim: [
      "Fungicidas triazoles (Tebuconazol, Penconazol)",
      "Estrobilurinas (en rotación)"
    ]
  },
  "PegadorBrotes": {
    nombre: "Pegador de Hojas/Brotes",
    nombreCientifico: "Argyrotaenia sphaleropa (ejemplo común)",
    descripcion: "Larvas que unen las hojas o brotes con hilos de seda para protegerse mientras se alimentan.",
    sintomas: [
      "Hojas pegadas entre sí",
      "Brotes tiernos comidos o perforados",
      "Presencia de larvas verdes activas al abrir los refugios"
    ],
    tratamientoBio: [
      "Bacillus thuringiensis (Bt) variedad kurstaki",
      "Trampas de feromonas para monitoreo",
      "Liberación de Trichogramma spp."
    ],
    tratamientoQuim: [
      "Insecticidas reguladores de crecimiento (IGRs)",
      "Spinosinas (Spinosad)"
    ]
  },
  "Trips": {
    nombre: "Trips",
    nombreCientifico: "Frankliniella occidentalis",
    descripcion: "Insectos diminutos y alargados que raspan los tejidos y chupan los jugos vegetales.",
    sintomas: [
      "Manchas plateadas o plateado-bronceado en hojas (plateado)",
      "Puntos negros (excrementos) en las zonas dañadas",
      "Caída de flores o frutos deformes (anillo de russet en uva)"
    ],
    tratamientoBio: [
      "Trampas pegajosas azules o amarillas",
      "Extracto de ajo y ají",
      "Hongos entomopatógenos (Beauveria bassiana)"
    ],
    tratamientoQuim: [
      "Spinetoram",
      "Insecticidas neonicotinoides (con precaución por abejas)"
    ]
  }
};
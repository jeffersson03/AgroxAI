// src/services/cultivoService.ts
import { createServer } from '@/lib/supabase';

// This type should be shared, perhaps from src/types/index.ts
export type Cultivo = {
  nombre_comun: string;
  referencia_imagen_url: string;
};

/**
 * Fetches all cultivos from the database.
 * This function is designed to be called from a Server Component, Route Handler, or Server Action.
 * @returns {Promise<{cultivos: Cultivo[], error: any}>} An object containing the list of cultivos and a potential error.
 */
export async function getCultivos(): Promise<{ cultivos: Cultivo[]; error: any }> {
  const supabase = createServer();
  
  const { data, error } = await supabase
    .from('cultivo')
    .select('nombre_comun, referencia_imagen_url');

  if (error) {
    console.error('Database Error: Failed to fetch cultivos.', error);
    return { cultivos: [], error: error };
  }

  // Transform the filesystem paths into public URL paths for the Next.js Image component.
  const transformedCultivos: Cultivo[] = (data || []).map(cultivo => ({
    ...cultivo,
    referencia_imagen_url: cultivo.referencia_imagen_url.replace(/^src\/public/, ''),
  }));
  
  return { cultivos: transformedCultivos, error: null };
}

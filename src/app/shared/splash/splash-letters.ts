/**
 * Letras de "GrowthProject AI" (versión de texto oscuro), cada una en su propio archivo de public/branding/splash/.
 * Las posiciones son porcentajes sobre el nombre completo (839×166 px), de modo que, apiladas, reconstruyen
 * el logo exacto y la pantalla de carga puede animarlas una a una.
 * Archivo generado a partir de las imágenes del logo; no editar a mano.
 */
export const SPLASH_NAME_ASPECT = 839 / 166;

export interface SplashLetter {
  file: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export const SPLASH_LETTERS: SplashLetter[] = [
  { file: 'letra-01.webp', left: 3.456, top: 17.470, width: 11.323, height: 54.819 },
  { file: 'letra-02.webp', left: 14.779, top: 34.337, width: 5.006, height: 36.747 },
  { file: 'letra-03.webp', left: 19.309, top: 33.735, width: 7.986, height: 38.554 },
  { file: 'letra-04.webp', left: 26.460, top: 34.337, width: 11.561, height: 36.747 },
  { file: 'letra-05.webp', left: 37.664, top: 25.904, width: 4.768, height: 45.783 },
  { file: 'letra-06.webp', left: 42.312, top: 20.482, width: 7.151, height: 50.602 },
  { file: 'letra-07.webp', left: 50.179, top: 19.880, width: 7.390, height: 51.205 },
  { file: 'letra-08.webp', left: 57.330, top: 37.349, width: 3.456, height: 33.735 },
  { file: 'letra-09.webp', left: 59.952, top: 37.349, width: 6.675, height: 33.735 },
  { file: 'letra-10.webp', left: 64.839, top: 25.904, width: 3.337, height: 56.627 },
  { file: 'letra-11.webp', left: 67.938, top: 37.349, width: 6.317, height: 33.735 },
  { file: 'letra-12.webp', left: 74.017, top: 37.349, width: 5.959, height: 33.735 },
  { file: 'letra-13.webp', left: 79.380, top: 28.916, width: 3.814, height: 42.169 },
  { file: 'letra-14.webp', left: 83.194, top: 21.687, width: 10.846, height: 51.205 },
  { file: 'letra-15.webp', left: 93.564, top: 21.687, width: 3.099, height: 50.602 },
];

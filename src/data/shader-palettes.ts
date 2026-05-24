/**
 * Shader palettes for FluidShader.
 *
 * Kept in their own file so the component file only exports the React
 * component (react-refresh/only-export-components).
 */

/** RGB triplet in 0..1 space (GLSL-ready). */
export type ShaderRGB = readonly [number, number, number];

/** Three-colour palette: deep base, mid blend tone, and a "streak" highlight. */
export interface ShaderPalette {
  deep:      ShaderRGB;
  mid:       ShaderRGB;
  highlight: ShaderRGB;
}

/** Default — deep teal hero palette. */
export const TEAL_PALETTE: ShaderPalette = {
  deep:      [0.016, 0.118, 0.118], // #041e1e
  mid:       [0.039, 0.200, 0.200], // #0a3333
  highlight: [0.000, 0.898, 0.800], // #00e5cc cyan streak
};

/** Warm cream-and-sand for beige sections — "luxury hotel marble" feel. */
export const BEIGE_PALETTE: ShaderPalette = {
  deep:      [0.961, 0.941, 0.902], // #F5F0E6 — section base
  mid:       [0.910, 0.859, 0.761], // #E8DBC2 — soft sand
  highlight: [0.722, 0.596, 0.373], // #B8985F — warm honey vein
};

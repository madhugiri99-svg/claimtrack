// Breakpoints match the three Figma frame sizes (375 / 768 / 1280).
// CSS custom properties can't be used inside media queries, so the
// values live here and in the @media rules in each component's CSS.
export const breakpoints = {
  tablet: 768,
  desktop: 1280,
} as const;

export const media = {
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
} as const;

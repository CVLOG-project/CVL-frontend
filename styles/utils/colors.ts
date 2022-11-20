/**
 * ### color에 대한 palette정의
 * - primary 색상
 * - secondary 색상
 * - semantic 색상 (error, warning, success, info)
 * - gray scale
 * - white, black
 */
type Density = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type Property = 'bg' | 'text' | 'border' | 'placeholder';
type Color = keyof typeof colorMap;

const colorMap = {
  white: 'white',
  black: 'black',
  primary: 'blue',
  positive: 'green',
  warn: 'yellow',
  error: 'red',
  gray: 'gray',
} as const;

/**
 * @param color - colorMap에 정의된 color
 * @param density - 50 ~ 900
 * @param property - bg, text, border, placeholder
 * @returns - color, density, property에 대한 css class
 * @example - bg-primary-500
 */
export const colors = (
  color: Color,
  property: Property = 'text',
  density: Density = 500
) => {
  if (color === 'white' || color === 'black') return `${property}-${color}`;
  return `${property}-${colorMap[color]}-${density}`;
};

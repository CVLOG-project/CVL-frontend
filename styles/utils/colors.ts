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
  slate: 'slate',
} as const;

export const colors = (
  color: Color,
  property: Property = 'text',
  density: Density = 500
) => {
  if (color === 'white' || color === 'black')
    return `${property}-${colorMap[color]}`;
  return `${property}-${colorMap[color]}-${density}`;
};

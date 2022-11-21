// TODO: convert 함수를 사용할 경우 tailwind에서 제대로 적용되지 않는 버그 발견 (수정필요)

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
  if (color === 'white' || color === 'black') return `${property}-${color}`;
  return `${property}-${colorMap[color]}-${density}`;
};

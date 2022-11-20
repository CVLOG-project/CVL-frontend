export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'labelMd'
  | 'labelSm'
  | 'base'
  | 'footnote'
  | 'caption';

const fontSizeWeightMap = {
  h1: 'text-4xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-bold',
  h4: 'text-lg font-normal',
  h5: 'text-xs font-normal',
  labelMd: 'text-md font-normal',
  labelSm: 'text-xs font-normal',
  base: 'text-sm font-normal',
  footnote: 'text-xs font-normal',
  caption: 'text-xs font-normal',
} as const;

export const textStyle = (variant: TextVariant) => fontSizeWeightMap[variant];

export const cn = (...args: string[]) => args.filter(Boolean).join(' ');

export const cond = (condition: boolean, className: string) =>
  condition ? className : '';

export const nbsp = '\u00A0';

export function noBreakSpace(value: string) {
  return value.replaceAll(' ', nbsp);
}

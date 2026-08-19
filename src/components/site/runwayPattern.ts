export const DESKTOP_WIDTHS = [30, 22, 34, 24, 20, 28];
export const TABLET_WIDTHS = [52, 40, 56, 44, 36, 48];
export const PHONE_WIDTHS = [80, 72, 84, 76, 68, 78];
export const RATIOS = ["3/4", "2/3", "4/5", "3/4", "1/1", "3/4"];

export function patternIndex(position: number): number {
  return position % 6;
}

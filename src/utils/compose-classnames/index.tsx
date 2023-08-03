export function composeClassnames(...classNames: any[]) {
  return classNames.filter(Boolean).join(' ');
}

export function ArrayMap<T>(arr: T[], exp: (it: T) => any) {
  return (arr || {}).map(exp);
}

export function ArrayFilter<T>(arr: T[], exp: (it: T, inx?: number, arr?: T[]) => boolean): T[] {
  return (arr || []).filter(exp);
}

export function ArrayFind<T>(arr: T[], exp: (it: T, inx?: number, arr?: T[]) => boolean): T | undefined {
  return (arr || []).find(exp);
}

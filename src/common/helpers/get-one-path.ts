export function getOnePath(path: string | string[]): string {
  if (Array.isArray(path)) {
    return path[0];
  }
  if (typeof path !== 'string') {
    throw new Error('path未传入');
  }
  return path;
}

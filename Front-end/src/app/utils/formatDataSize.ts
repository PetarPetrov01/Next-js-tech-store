export function formatDataSize(bytes: number): string {
  if (bytes < 1000) return `${bytes} B`;

  const units = ["KB", "MB", "GB", "TB", "PB"];
  let unitIndex = -1;
  let roundedSize = bytes;

  while (roundedSize >= 1000 && unitIndex < units.length - 1) {
    roundedSize /= 1024;
    unitIndex++;
  }

  return `${Math.round(roundedSize)} ${units[unitIndex]}`;
}

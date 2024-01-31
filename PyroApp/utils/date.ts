export function convertFormatDate(dateString: string): string {
  const dateObj = new Date(dateString);

  const dateFormated = dateObj.toLocaleString('fr-FR');

  return dateFormated;
}

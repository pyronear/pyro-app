export function convertFormatDate(dateString: string): string {
  const dateObj = new Date(dateString);

  const jour = dateObj.getDate().toString().padStart(2, '0');
  const mois = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const annee = dateObj.getFullYear();

  const heures = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  const dateFormated = `${jour}/${mois}/${annee} ${heures}:${minutes}`;

  return dateFormated;
}

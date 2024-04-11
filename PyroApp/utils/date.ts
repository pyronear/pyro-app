export function convertFormatDate(dateString: string): string {
  const dateObj = new Date(dateString);

  const dateFormated = dateObj.toLocaleString('fr-FR');

  return dateFormated;
}

export function formatToLongDate(dateString: string): string {
  // Création d'un objet Date à partir de la chaîne
  const date = new Date(dateString);

  // Jours de la semaine
  const joursSemaine = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];

  // Mois de l'année
  const moisAnnee = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];

  // Récupération des éléments de la date
  const jourSemaine = joursSemaine[date.getDay()];
  const jourMois = date.getDate();
  const mois = moisAnnee[date.getMonth()];
  const annee = date.getFullYear();
  const heures = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  // Construction de la chaîne de caractères formatée
  const dateFormatee = `${jourSemaine} ${jourMois} ${mois} ${annee} à ${heures}:${minutes}`;

  return dateFormatee;
}

export type Cities = {
  Limassol: [number, number];
  Paphos: [number, number];
  Nicosia: [number, number];
  Warsaw: [number, number];
};

export const cities: Cities = {
  Limassol: [34.684, 33.0379],
  Paphos: [34.7768, 32.4245],
  Nicosia: [35.1753, 33.3642],
  Warsaw: [52.237, 21.0175],
};

export type CityName = keyof typeof cities;

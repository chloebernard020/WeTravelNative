const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchLieux = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi`);
    const lieux = await response.json();
    return lieux;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les lieux.");
  }
};

export const fetchLieuxParVille = async (villeId) => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi/parville/${villeId}`);
    const lieuxparville = await response.json();
    return lieuxparville;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les lieux pour cette ville.");
  }
};

export const fetchLieu = async (idLieu) => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi/${idLieu}`);
    const lieu = await response.json();
    return lieu;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger le lieu.");
  }
};

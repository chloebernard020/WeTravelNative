const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchVillesParPays = async (paysId) => {
  try {
    const response = await fetch(`${rootEndpoint}/VilleApi/parpays/${paysId}`);
    const villesparpays = await response.json();
    return villesparpays;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les villes.");
  }
};
export const fetchVille = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/VilleApi/${id}`);
    const ville = await response.json();
    return ville;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger la ville.");
  }
};

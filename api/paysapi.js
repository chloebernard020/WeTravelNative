const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchLesPays = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/PaysApi`);
    const pays = await response.json();
    return pays;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les pays.");
  }
};

export const fetchPays = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/PaysApi/${id}`);
    const pays = await response.json();
    return pays;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger le pays.");
  }
};

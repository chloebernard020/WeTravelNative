const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchVisitesParCompte = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/VisiteApi/parcompte/${id}`);
    const visites = await response.json();
    return visites;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les visites.");
  }
};

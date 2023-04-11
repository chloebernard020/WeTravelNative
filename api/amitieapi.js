const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchAmitiesParCompte = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/AmitieApi/parcompte/${id}`);
    const amitie = await response.json();
    return amitie;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les appréciations.");
  }
};

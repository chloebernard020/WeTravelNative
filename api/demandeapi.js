const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchDemandes = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/DemandeApi`);
    const demande = await response.json();
    return demande;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les demandes.");
  }
};
export const addDemande = async (user1, user2) => {
  try {
    const response = await fetch(`${rootEndpoint}/DemandeApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compteDemandeurId: user1.id,
        compteReceveurId: user2.id,
      }),
    });
    const demande = await response.json();
    return demande;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeDemande = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/DemandeApi/${id}`, {
      method: `DELETE`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

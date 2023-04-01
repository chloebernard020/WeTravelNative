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

export const addVisite = async (user, place, datevisite) => {
  try {
    const response = await fetch(`${rootEndpoint}/VisiteApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compteId: user.id,
        lieuId: place.id,
        date: datevisite,
      }),
    });
    const visite = await response.json();
    return visite;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeVisite = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/VisiteApi/${id}`, {
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

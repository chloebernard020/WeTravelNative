const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchFavorisParCompte = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/FavoriApi/parcompte/${id}`);
    const favoris = await response.json();
    return favoris;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les favoris.");
  }
};

export const addFavori = async (user, place) => {
  try {
    const response = await fetch(`${rootEndpoint}/FavoriApi`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compteId: user.id,
        lieuId: place.id,
      }),
    });
    const favori = await response.json();
    return favori;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeFavori = async (user, place) => {
  try {
    const response = await fetch(`${rootEndpoint}/FavoriApi`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compteId: user.id,
        lieuId: place.id,
      }),
    });
    const favori = await response.json();
    return favori;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

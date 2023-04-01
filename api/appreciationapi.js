const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchAppreciationsParLieu = async (id) => {
  try {
    const response = await fetch(
      `${rootEndpoint}/AppreciationApi/parlieu/${id}`
    );
    const appreciations = await response.json();
    return appreciations;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les appréciations.");
  }
};

export const addAppreciation = async (user, place, _date, _commentaire) => {
  try {
    const response = await fetch(`${rootEndpoint}/AppreciationApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentaire: _commentaire,
        compteId: user.id,
        lieuId: place.id,
        date: _date,
      }),
    });
    const appreciation = await response.json();
    return appreciation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeAppreciation = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/AppreciationApi/${id}`, {
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

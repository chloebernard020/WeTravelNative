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

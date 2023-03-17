const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchCulturesParLieu = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/CultureApi/parlieu/${id}`);
    const cultures = await response.json();
    return cultures;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les points culture.");
  }
};

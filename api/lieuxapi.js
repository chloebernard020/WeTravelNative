const rootEndpoint = "https://localhost:7240/api";

export const fetchLieux = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/LieuApi`);
    const lieux = await response.json();
    return lieux;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les lieux.");
  }
};

const fetchLieu = async (idLieu) => {
  const response = await fetch(`${rootEndpoint}/LieuApi/${idLieu}`);
  const lieu = await response.json();
  return lieu[0];
};

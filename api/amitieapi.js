const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchAmities = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/AmitieApi`);
    const amitie = await response.json();
    return amitie;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les amitiés.");
  }
};

export const addAmitie = async (user1Id, user2Id) => {
  try {
    const response = await fetch(`${rootEndpoint}/AmitieApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compte1Id: user1Id,
        compte2Id: user2Id,
      }),
    });
    const amitie = await response.json();
    return amitie;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeAmitie = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/AmitieApi/${id}`, {
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

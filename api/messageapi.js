const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchMessages = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/MessageApi`);
    const messages = await response.json();
    return messages;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les messages.");
  }
};

export const addMessage = async (
  _compteEnvoyeurId,
  _compteReceveurId,
  _conversationId,
  _date,
  _mess
) => {
  try {
    const response = await fetch(`${rootEndpoint}/MessageApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compteEnvoyeurId: _compteEnvoyeurId,
        comptereceveurId: _compteReceveurId,
        conversationId: _conversationId,
        date: _date,
        mess: _mess,
      }),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

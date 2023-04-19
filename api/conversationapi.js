const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchConversations = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/ConversationApi`);
    const conversation = await response.json();
    return conversation;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les conversations.");
  }
};

export const addConversation = async (user1Id, user2Id) => {
  try {
    const response = await fetch(`${rootEndpoint}/ConversationApi`, {
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
    const conversation = await response.json();
    return conversation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeConversation = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/ConversationApi/${id}`, {
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

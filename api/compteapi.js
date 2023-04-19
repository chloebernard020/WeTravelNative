const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

export const fetchComptes = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/CompteApi`);
    const comptes = await response.json();
    return comptes;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les comptes.");
  }
};

export const addCompte = async (_nom, _prenom, _mail, _password) => {
  try {
    const response = await fetch(`${rootEndpoint}/CompteApi`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: _nom,
        prenom: _prenom,
        mail: _mail,
        motDePasse: _password,
      }),
    });
    const compte = await response.json();
    return compte;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editCompte = async (_id, _mail, _nom, _prenom, _mdp) => {
  try {
    const response = await fetch(`${rootEndpoint}/CompteApi/${_id}`, {
      method: `PUT`,
      headers: {
        Accept: `application/json`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
        mail: _mail,
        nom: _nom,
        prenom: _prenom,
        mail: _mail,
        motDePasse: _mdp,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCompte = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/CompteApi/${id}`);
    const compte = await response.json();
    return compte;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger le compte.");
  }
};

export const authenticateUser = async (mail, motdepasse) => {
  const comptes = await fetchComptes();
  const user = comptes.find(
    (u) => u.mail === mail && u.motDePasse === motdepasse
  );
  return user ? user : null;
};

export const removeCompte = async (id) => {
  try {
    const response = await fetch(`${rootEndpoint}/CompteApi/${id}`, {
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

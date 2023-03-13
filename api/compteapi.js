const rootEndpoint = "https://enscwetravel.azurewebsites.net/api";

const fetchComptes = async () => {
  try {
    const response = await fetch(`${rootEndpoint}/CompteApi`);
    const comptes = await response.json();
    return comptes;
  } catch (error) {
    console.error(error);
    throw new Error("Impossible de charger les comptes.");
  }
};

/*const fetchCompte = async (idCompte) => {
  try {
    const comptes = await fetchComptes();
    return (
      // Search for the first user matching login and password
      comptes.find((u) => u.mail === mail && u.motDePasse === motDePasse) ||
      null
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};*/

export default authenticateUser = async (mail, motDePasse) => {
  const comptes = await fetchComptes();
  return (
    // Search for the first user matching login and password

    comptes.find((u) => u.mail === mail && u.motDePasse === motDePasse) || null
  );
};

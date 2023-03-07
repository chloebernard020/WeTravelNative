const rootEndpoint = "https://locahost:7240/api";

const fetchComptes = async () => {
  const response = await fetch(`${rootEndpoint}/CompteApi`);
  const comptes = await response.json();
  return new Promise((resolve) => {
    resolve(comptes);
  });
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

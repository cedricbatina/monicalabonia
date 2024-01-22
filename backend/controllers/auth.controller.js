exports.allAccess = (_req, res) => {
  res.status(200).json({ message: "Contenu publique" });
};

exports.adminBoard = (_req, res) => {
  res.status(200).json({ message: "Contenu administrateur" });
};

exports.userBoard = (_req, res) => {
  res.status(200).json({ message: "Contenu utilisateur" });
};

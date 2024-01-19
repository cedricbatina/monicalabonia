exports.allAccess = (req, res) => {
  res.status(200).json({ message: "Contenu publique" });
};
exports.adminBoard = (res) => {
  res.status(200).json({ message: "Contenu administrateur" });
};
exports.userBoard = (res) => {
  res.status(200).json({ message: "Contenu utilisateur" });
};

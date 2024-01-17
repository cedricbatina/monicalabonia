export const allAccess = (req, res) => {
  res.status(200).json({ message: "Contenu publique" });
};
export const adminBoard = (res) => {
  res.status(200).json({ message: "Contenu administrateur" });
};
export const userBoard = (res) => {
  res.status(200).json({ message: "Contenu utilisateur" });
};

export const notFound = (req, res) => {
  res.status(404).json({ message: "Ressource non trouvée" });
};
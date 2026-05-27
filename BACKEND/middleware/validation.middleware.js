import { z } from "zod";

// Définition du schéma de validatioon avec zod, chaque champ forme le corps de la requete
export const validateRegister = (req, res, next) => {
  const schema = z.object({
    username: z.email(), // username doit être un email valide qui sera stocker en db
    password: z.string().min(6), // mdp de plus de 6caracteres
    confirmPassword: z.string().min(6),
  });
  try {
    // On tente de parser le corps de la requete avec le schéma register, si un champ est invalide zod lance une exception avec le catch
    schema.parse(req.body);
    if (req.body.password !== req.body.confirmPassword) {
      return res
        .status(400)
        .json({ message: `Les mots de passe ne correspondent pas` });
    }

    next();
    // Tout est valide on passe au souvant
  } catch (e) {
    // En cas d'erreur zod on récupère les message d'erreur
    // e.issues et un tableau d'erreurs, on les joint en une string
    return res
      .status(400)
      .json({ message: e.issues.map((err) => err.message).join(", ") });
  }
};

export const validateLogin = (req, res, next) => {
  const schema = z.object({
    username: z.email(),
    password: z.string().min(6),
  });

  try {
    schema.parse(req.body);

    next();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Identifiant ou mot de passe incorrect" });
  }
};

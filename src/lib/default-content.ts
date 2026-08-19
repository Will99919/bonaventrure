import { LookCategory } from "@/generated/prisma/enums";

// Contenu par défaut, repris à l'identique du prototype de maquettage.
// Sert à deux choses : le seed initial de la base, et le repli du site public
// si une donnée est absente ou vide (le site ne doit jamais paraître cassé).

export const DEFAULT_TEXTS = {
  heroTitle: "Sur mesure",
  heroIntro:
    "Hermide Bonaventure dessine, coupe et coud chaque pièce à vos mesures : mariée, soirée, vestiaire de jour, accessoires.",
  manifeste:
    "Une seule paire de mains, quatre rendez-vous, et un vêtement qui n’ira jamais parfaitement à personne d’autre. Ici, la taille n’existe pas : il y a votre corps, et le tissu qu’on lui coupe.",
  bio: "Formée à la coupe et au flou, elle travaille sur rendez-vous seulement. Le nombre de commandes est volontairement limité : c’est ce qui permet les deux essayages, les retouches millimétrées, et les finitions faites à la main.",
  citation: "« Le sur mesure n’est pas un luxe de tissu, c’est un luxe d’attention. »",
  contact:
    "Adresse à compléter, Lyon\nMardi — samedi, sur rendez-vous\nbonjour@bonaventure.fr\nà compléter",
};

export const DEFAULT_LOOKS = [
  { name: "Robe Aubade", category: LookCategory.Mariee, year: "2026", note: "robe longue, plein pied" },
  { name: "Tailleur Grès", category: LookCategory.Vestiaire, year: "2026", note: "veste + pantalon" },
  { name: "Robe Nocturne", category: LookCategory.Soiree, year: "2025", note: "drapé, lumière basse" },
  { name: "Cape Ivoire", category: LookCategory.Mariee, year: "2025", note: "cape en mouvement" },
  { name: "Ceinture Obi", category: LookCategory.Accessoire, year: "2025", note: "macro, soie" },
  { name: "Manteau Vent", category: LookCategory.Vestiaire, year: "2024", note: "manteau, dos" },
].map((look, index) => ({ ...look, order: index }));

export const DEFAULT_POSTS = [
  "toile d’essai",
  "coupe du tissu",
  "boutonnière main",
  "coupons de soie",
  "essayage",
  "atelier, matin",
].map((caption, index) => ({ caption, order: index }));

export const DEFAULT_FAQS = [
  {
    question: "Combien de temps prend une pièce ?",
    answer:
      "3 à 6 semaines selon la complexité, jusqu’à 3 mois pour une robe de mariée brodée. Les créneaux d’essayage se réservent à l’avance.",
  },
  {
    question: "Quel budget prévoir ?",
    answer:
      "Chaque pièce est chiffrée après la consultation, selon le tissu et le travail de main. Le devis est détaillé, gratuit, et ne bouge plus une fois signé.",
  },
  {
    question: "Faut-il venir avec une idée précise ?",
    answer:
      "Non. Des images, une occasion, un vêtement que vous aimez déjà suffisent : le croquis se construit ensemble au premier rendez-vous.",
  },
  {
    question: "Travaillez-vous à distance ?",
    answer:
      "La première consultation peut se faire en visio, mais deux essayages à l’atelier restent nécessaires pour garantir la coupe.",
  },
  {
    question: "Reprenez-vous des vêtements existants ?",
    answer:
      "Uniquement les pièces sorties de l’atelier, et les robes de famille à remettre à votre taille.",
  },
].map((faq, index) => ({ ...faq, order: index }));

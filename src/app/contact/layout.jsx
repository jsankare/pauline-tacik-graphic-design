export const metadata = {
  title: "Contact | Pauline Tacik, graphiste à Metz, Nancy, Luxembourg",
  description:
    "Parlons de votre projet de communication : identité visuelle, logo, affiche, édition et supports imprimés. Demande de devis et collaboration à Metz, Nancy et Luxembourg.",
  openGraph: {
    title: "Contact — Devis et collaborations | Pauline Tacik",
    description:
      "Contactez une graphiste freelance pour vos projets: logotype, identité visuelle, affiche, flyers, carte de visite et édition. Basée à Metz, active à Nancy et Luxembourg.",
    images: [{ url: "/ptacik-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Pauline Tacik, graphiste freelance",
    description:
      "Demande de devis et collaboration en communication visuelle : logo, identité visuelle, supports imprimés.",
    images: ["/ptacik-logo.png"],
  },
};

export default function ContactLayout({ children }) {
  return children;
}

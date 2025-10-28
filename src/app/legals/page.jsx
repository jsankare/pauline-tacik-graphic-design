export const metadata = {
    title: "Mentions légales & CGU | Pauline Tacik",
    description: "Mentions légales du site paulinetacik.com, conditions générales d’utilisation et informations d’hébergement.",
    openGraph: {
        title: "Mentions légales & CGU | Pauline Tacik",
        description: "Mentions légales, CGU et informations d’hébergement.",
        images: [{ url: "/ptacik-logo.png" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Mentions légales & CGU | Pauline Tacik",
        description: "Mentions légales, CGU et informations d’hébergement.",
        images: ["/ptacik-logo.png"],
    },
};

export default function Legals() {
    return (
        <main className="text-gray-800 antialiased leading-relaxed max-w-4xl mx-auto p-6 md:p-12">
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Mentions légales & CGU</h1>
            </header>

            <article className="p-6 md:p-10">
                {/* === Définitions === */}
                <section className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">Définitions</h2>
                    <p className="mb-2"><strong>Client :</strong> tout professionnel ou personne physique capable au sens des articles 1123 et suivants du Code civil, ou personne morale, qui visite le Site objet des présentes conditions générales.</p>
                    <p className="mb-2"><strong>Prestations et Services :</strong> <a href="/" className="text-primary hover:underline">paulinetacik.com</a> met à disposition des Clients :</p>
                    <p className="mb-2"><strong>Contenu :</strong> Ensemble des éléments constituants l’information présente sur le Site, notamment textes – images – vidéos.</p>
                    <p className="mb-2"><strong>Informations clients :</strong> Données personnelles détenues par <a href="/" className="text-primary hover:underline">paulinetacik.com</a> pour la gestion du compte et de la relation client.</p>
                    <p className="mb-2"><strong>Utilisateur :</strong> Internaute se connectant, utilisant le site susnommé.</p>
                    <p className="text-sm text-gray-600">Les termes « données à caractère personnel », « personne concernée », « sous-traitant » et « données sensibles » ont le sens défini par le RGPD (n° 2016-679).</p>
                </section>

                {/* === Présentation du site === */}
                <section className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">1. Présentation du site internet</h2>
                    <p className="mb-3">En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet <a href="/" className="text-primary hover:underline">paulinetacik.com</a> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
                    <p className="mb-2"><strong>Propriétaire :</strong> Entrepreneur individuel Pauline Tacik — adresse non divulguée conformément à l’article A123-96 du Code de commerce.</p>
                    <p className="mb-2"><strong>Responsable de la publication :</strong> Pauline Tacik — <a href="mailto:hello@paulinetacik.com" className="text-primary hover:underline">hello@paulinetacik.com</a></p>
                    <p className="mb-2"><strong>Webmaster :</strong> Pauline Tacik — <a href="mailto:hello@paulinetacik.com" className="text-primary hover:underline">hello@paulinetacik.com</a></p>
                    <p className="mb-2"><strong>Hébergeur :</strong> Vercel Inc — 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis — <a href="https://vercel.com" className="text-primary hover:underline">vercel.com</a></p>
                </section>

                {/* === Utilisation du site === */}
                <section className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">2. Conditions générales d’utilisation</h2>
                    <p className="mb-3">L’utilisation du site implique l’acceptation pleine et entière des présentes conditions. Ces conditions peuvent être modifiées à tout moment ; l’utilisateur est invité à les consulter régulièrement.</p>
                </section>

                {/* === Données personnelles === */}
                <section className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">3. Gestion des données personnelles</h2>
                    <p className="mb-3">Conformément au RGPD (n° 2016-679), les données collectées via ce site sont traitées par Pauline Tacik, responsable du traitement. Elles ne sont pas revendues ni transférées à des tiers sans consentement préalable.</p>
                    <p className="mb-3">Vous pouvez exercer vos droits (accès, rectification, suppression) en écrivant à <a href="mailto:hello@paulinetacik.com" className="text-primary hover:underline">hello@paulinetacik.com</a>.</p>
                </section>

                {/* === Hébergement === */}
                <section className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-3">4. Hébergement</h2>
                    <p className="mb-3">Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (<a href="https://vercel.com" className="text-primary hover:underline">vercel.com</a>).</p>
                </section>

                {/* === Droits === */}
                <section>
                    <h2 className="text-lg font-medium text-gray-900 mb-3">5. Droit applicable</h2>
                    <p className="mb-3">Tout litige en relation avec l’utilisation du site est soumis au droit français. Attribution exclusive de juridiction aux tribunaux compétents de Metz.</p>
                </section>
            </article>

            <footer className="mt-6 text-sm text-gray-500">Dernière mise à jour : octobre 2025 — Mention légales adaptées au statut d’entrepreneur individuel avec adresse masquée (article A123-96 du Code de commerce).</footer>
        </main>
    );
}

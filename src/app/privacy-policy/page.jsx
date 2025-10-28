export const metadata = {
    title: "Politique de confidentialité | Pauline Tacik",
    description: "Politique de confidentialité du site paulinetacik.com : données collectées, finalités, droits RGPD et contact.",
    openGraph: {
        title: "Politique de confidentialité | Pauline Tacik",
        description: "Données collectées, finalités, droits RGPD et contact.",
        images: [{ url: "/ptacik-logo.png" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Politique de confidentialité | Pauline Tacik",
        description: "Données collectées, finalités, droits RGPD et contact.",
        images: ["/ptacik-logo.png"],
    },
};

export default function Confidentialite() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
            <h1 className="text-3xl font-bold mb-8 text-center">Politique de confidentialité</h1>

            <section className="space-y-6">
                <p>
                    Cette politique de confidentialité décrit la manière dont les données personnelles
                    sont collectées, utilisées et protégées lors de votre utilisation du site{" "}
                    <a href="https://paulinetacik.com" className="text-blue-600 hover:underline">
                        paulinetacik.com
                    </a>.
                </p>

                <h2 className="text-2xl font-semibold mt-8">1. Responsable du traitement</h2>
                <p>
                    Les données personnelles collectées sur ce site sont traitées par :
                    <br />
                    <b>Pauline Tacik</b> – Entrepreneur individuel <br />
                    Email : <a href="mailto:hello@paulinetacik.com" className="text-blue-600 hover:underline">
                    hello@paulinetacik.com
                </a>
                    <br />
                    Adresse : non divulguée conformément à l’article A123-96 du Code de commerce.
                </p>

                <h2 className="text-2xl font-semibold mt-8">2. Données collectées</h2>
                <p>
                    Les données suivantes peuvent être collectées :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Données transmises via le formulaire de contact (nom, prénom, email, message).</li>
                    <li>Données de navigation (adresse IP, navigateur, pages consultées) à des fins de mesure d’audience.</li>
                    <li>Cookies de fonctionnement et analytiques (le cas échéant).</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8">3. Finalités du traitement</h2>
                <p>
                    Les données collectées servent exclusivement à :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Répondre aux demandes envoyées via le formulaire de contact.</li>
                    <li>Améliorer la navigation et l’expérience utilisateur du site.</li>
                    <li>Analyser la fréquentation du site de manière anonyme (via outils type Vercel Analytics).</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8">4. Base légale du traitement</h2>
                <p>
                    Les traitements reposent sur :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Le consentement de l’utilisateur (formulaire de contact, cookies analytiques).</li>
                    <li>L’intérêt légitime du responsable du traitement à assurer le bon fonctionnement du site.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8">5. Conservation des données</h2>
                <p>
                    Les données ne sont conservées que le temps nécessaire pour répondre à la demande de contact
                    ou pour des besoins légaux et administratifs (maximum 3 ans après le dernier contact).
                </p>

                <h2 className="text-2xl font-semibold mt-8">6. Hébergement des données</h2>
                <p>
                    Le site est hébergé par <b>Vercel Inc.</b> – 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.
                    <br />
                    Les données peuvent être hébergées dans l’Union européenne ou aux États-Unis selon la configuration de déploiement.
                </p>

                <h2 className="text-2xl font-semibold mt-8">7. Droits des utilisateurs</h2>
                <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Droit d’accès, de rectification et d’effacement de vos données.</li>
                    <li>Droit d’opposition et de limitation du traitement.</li>
                    <li>Droit à la portabilité des données.</li>
                    <li>Droit de retirer votre consentement à tout moment.</li>
                </ul>
                <p>
                    Pour exercer vos droits, contactez :
                    <br />
                    <a href="mailto:hello@paulinetacik.com" className="text-blue-600 hover:underline">
                        hello@paulinetacik.com
                    </a>
                </p>

                <h2 className="text-2xl font-semibold mt-8">8. Sécurité des données</h2>
                <p>
                    Pauline Tacik met en œuvre des mesures techniques et organisationnelles appropriées
                    pour protéger vos données contre la perte, l’accès non autorisé ou la divulgation.
                </p>

                <h2 className="text-2xl font-semibold mt-8">9. Cookies</h2>
                <p>
                    Le site utilise uniquement des cookies strictement nécessaires à son fonctionnement et,
                    le cas échéant, des cookies analytiques soumis à votre consentement.
                    Vous pouvez modifier vos préférences à tout moment dans les paramètres de votre navigateur.
                </p>

                <h2 className="text-2xl font-semibold mt-8">10. Contact et réclamations</h2>
                <p>
                    Pour toute question relative à la présente politique de confidentialité, contactez :
                    <br />
                    <a href="mailto:hello@paulinetacik.com" className="text-blue-600 hover:underline">
                        hello@paulinetacik.com
                    </a>
                </p>
                <p>
                    Vous pouvez également déposer une réclamation auprès de la CNIL :{" "}
                    <a href="https://www.cnil.fr/fr/plaintes" target="_blank" className="text-blue-600 hover:underline">
                        www.cnil.fr
                    </a>
                </p>

                <div className="mt-12 border-t border-gray-300 pt-6 text-sm text-gray-600 text-center">
                    <p>Dernière mise à jour : <span className="font-medium text-gray-800">Octobre 2025</span></p>
                </div>
            </section>
        </div>
    )
}

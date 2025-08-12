import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full h-20 shrink-0 border-t border-neutral-200 p-5">
            <section>
                <p className="text-center text-sm text-neutral-500">
                    &copy; 2020 - {new Date().getFullYear()} Pauline Tacik. Tous droits réservés.
                </p>
                <p className="text-center text-sm text-neutral-500">
                    Fait avec <span className="text-red-500">♥</span> par <Link className="text-blue-950" target={"blank"} href={"https://www.jsankare.dev"}>Jordan Sankaré</Link>
                </p>
                <div className="text-center text-sm">
                    <a href="/privacy-policy" className="text-blue-950 hover:underline">Politique de confidentialité</a>
                    <span className="mx-2">|</span>
                    <a href="/terms-of-service" className="text-blue-950 hover:underline">Mentions légales</a>
                </div>
            </section>
        </footer>
    )
}

export default Footer;
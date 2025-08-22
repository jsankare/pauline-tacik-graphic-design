import Link from "next/link";
import TransitionLink from "./TransitionLink";

const Footer = () => {
    return (
        <footer className="w-full h-20 shrink-0 border-t border-neutral-200 p-5">
            <section>
                <p className="text-center text-sm text-neutral-500">
                    &copy; 2020 - {new Date().getFullYear()} Pauline Tacik. Tous droits réservés.
                </p>
                <p className="text-center text-sm text-neutral-500">
                    Fait avec <span className="text-red-500">♥</span> par <Link className="text-primary" target={"blank"} href={"https://www.jsankare.dev"}>Jordan Sankaré</Link>
                </p>
                <div className="text-center text-sm">
                    <TransitionLink href="/privacy-policy" label="Politique de confidentialité" />
                    <span className="mx-2">|</span>
                    <TransitionLink href="/legals" label="Mentions légales" />
                </div>
            </section>
        </footer>
    )
}

export default Footer;
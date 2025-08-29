import Link from "next/link";
import TransitionLink from "./TransitionLink";

const Footer = () => {
    return (
        <footer className="w-full h-20 shrink-0 p-5 font-omnes-semicond">
            <section className="max-w-6xl mx-auto">
                <p className="text-center text-sm text-neutral-500 font-omnes-semicond">
                    &copy; 2020 - {new Date().getFullYear()} Pauline Tacik. Tous droits réservés.
                </p>
                <p className="text-center text-sm text-neutral-500 font-omnes-semicond">
                    Fait avec <span className="text-red-500">♥</span> par <Link className="text-primary hover:text-secondary transition-colors duration-200" target={"blank"} href={"https://www.jsankare.dev"}>Jordan Sankaré</Link>
                </p>
                <div className="text-center text-sm mt-2">
                    <TransitionLink 
                        href="/privacy-policy" 
                        label={
                            <span className="text-neutral-500 hover:text-primary transition-colors duration-200 font-omnes-semicond">
                                Politique de confidentialité
                            </span>
                        } 
                    />
                    <span className="mx-2 text-neutral-400">|</span>
                    <TransitionLink 
                        href="/legals" 
                        label={
                            <span className="text-neutral-500 hover:text-primary transition-colors duration-200 font-omnes-semicond">
                                Mentions légales
                            </span>
                        } 
                    />
                </div>
            </section>
        </footer>
    )
}

export default Footer;
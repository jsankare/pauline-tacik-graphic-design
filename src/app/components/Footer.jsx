import Link from "next/link";
import TransitionLink from "./TransitionLink";

const Footer = () => {
    return (
        <footer className="w-full shrink-0 font-omnes-semicond p-4">
            <section className="w-full mx-auto flex flex-col-reverse gap-4 md:flex-row justify-between">
                <div className="text-center md:text-left">
                    <p className="text-center md:text-left text-primary/60 font-omnes-semicond">
                        &copy; 2020 - {new Date().getFullYear()} Pauline Tacik. Tous droits réservés.
                    </p>
                    <p className="text-center md:text-left text-primary/60 font-omnes-semicond">
                        Fait avec <span className="text-red-500">♥</span> par <Link className="text-primary hover:text-secondary transition-colors duration-200" target={"blank"} href={"https://www.jsankare.dev"}>Jordan Sankaré</Link>
                    </p>
                </div>
                <div>
                    <div className="text-center flex flex-col">
                        <a
                            href="/privacy-policy"
                            className="text-center md:text-right text-primary/60 font-omnes-semicond"
                        >Politique de confidentialité</a>
                        <a
                            href="/legals"
                            className="text-center md:text-right text-primary/60 font-omnes-semicond"
                        >Mentions légales</a>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer;
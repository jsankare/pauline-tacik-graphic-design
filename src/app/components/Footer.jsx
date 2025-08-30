import Link from "next/link";
import TransitionLink from "./TransitionLink";

const Footer = () => {
    return (
        <footer className="w-full h-20 shrink-0 p-5 font-omnes-semicond">
            <section className="w-full justify-between mx-auto flex pb-3">
                <div className="text-left">
                    <p className="text-left text-primary/60 font-omnes-semicond">
                        &copy; 2020 - {new Date().getFullYear()} Pauline Tacik. Tous droits réservés.
                    </p>
                    <p className="text-left text-primary/60 font-omnes-semicond">
                        Fait avec <span className="text-red-500">♥</span> par <Link className="text-primary hover:text-secondary transition-colors duration-200" target={"blank"} href={"https://www.jsankare.dev"}>Jordan Sankaré</Link>
                    </p>
                </div>
                <div>
                    <div className="text-center text-sm mt-2 flex flex-col">
                        <TransitionLink
                            href="/privacy-policy"
                            label={
                                <span className="text-lg text-primary/60 hover:text-primary/80 transition-colors duration-200 font-omnes-semicond">
                                Politique de confidentialité
                            </span>
                            }
                        />
                        <TransitionLink
                            href="/legals"
                            label={
                                <span className="text-lg text-primary/60 hover:text-primary/80 transition-colors duration-200 font-omnes-semicond">
                                Mentions légales
                            </span>
                            }
                        />
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer;
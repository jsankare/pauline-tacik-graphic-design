import TransitionLink from "@/app/components/TransitionLink";
import Image from "next/image";
import Logo from "../../../public/ptacik-logo.png";

const Navigation = () => {
    return (
        <nav className="w-full flex flex-col gap-6">
            <TransitionLink href="/" label={<Image src={Logo} alt={"ceci est un logo"} />} />
            <div className="flex flex-col gap-3 items-start">
                <TransitionLink href="/" label="Projets" />
                <TransitionLink href="/workshops" label="Ateliers" />
                <TransitionLink href="/about" label="À propos" />
                <TransitionLink href="/contact" label="Contact" />
            </div>
        </nav>
    );
}

export default Navigation;
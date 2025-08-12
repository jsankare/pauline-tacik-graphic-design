import TransitionLink from "@/app/components/TransitionLink";

const Navigation = () => {
    return (
        <nav className="w-full p-5 flex flex-row place-items-center justify-between">
            <h1 className="text-3xl tracking-tight font-bold text-neutral-900" >NextJS Boilerplate w/ Transition</h1>
            <div className="flex gap-5">
                <TransitionLink href="/" label="Home" />
                <TransitionLink href="/about" label="About" />
                <TransitionLink href="/contact" label="Contact" />
            </div>
        </nav>
    );
}

export default Navigation;
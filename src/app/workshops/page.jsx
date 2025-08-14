import TransitionLink from "../components/TransitionLink";
import Workshops from "../workshops.json";
import Image from "next/image";
import { H1 } from "../components/ui/ui";

const WorkshopsPage = () =>{
    return (
        <section className="p-4">
            <H1 title="Ateliers" />

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-10">
                {Workshops.workshops.map((workshop, id) => (
                    <TransitionLink
                        key={id}
                        href={workshop.link}
                        label={
                            <div className="relative group overflow-hidden rounded-lg shadow-lg">
                                <Image
                                    width={500}
                                    height={300}
                                    alt={workshop.name}
                                    src={workshop.thumbnail}
                                    className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-lg font-semibold text-center px-4">{workshop.name}</span>
                                </div>
                            </div>
                        }
                    />
                ))}
            </section>
        </section>
    )
}

export default WorkshopsPage;
"use client";

import { H1 } from "../components/ui/ui";
import Image from "next/image";
import Illustration from "../../../public/gravure-eblouie.jpg";
import TransitionLink from "../components/TransitionLink";
import Dot from "../../../public/pois.png";

const AboutPage = () => {

    return (
        <div className="min-h-screen bg-white font-omnes-semicond">
            <div className="max-w-6xl mx-auto px-6 py-20">
                {/* Middle Section - Text & Illustration Side by Side */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
                    {/* Left Column - Text */}
                    <div className="flex-1 space-y-6 text-lg leading-relaxed">
                        {/* Top Section - Title and Introduction */}
                        <div className="mb-10">
                            <H1 noMt color="text-primary" title="Pauline Tacik" align="text-left" />
                            <p className="text-xl text-primary italic mb-8 font-omnes-semicond">
                                Design graphique, illustration et gravure
                            </p>
                        </div>
                        <p className="text-gray-900 font-omnes-semicond">
                            Diplômée d'un bachelor en Design graphique, options médias imprimés à l'École de Condé (Nancy)
                            après des études en stratégie de communication, je travaille en tant qu'indépendante depuis 2019.
                        </p>
                        <p className="text-gray-900 font-omnes-semicond">
                            Je conçois des supports imprimés, des identités visuelles ainsi que des illustrations pour diverses structures, des très petites et des grandes entreprises, ainsi que des associations et des collectivités.
                        </p>
                        <p className="text-gray-900 text-justify font-omnes-semicond">
                            Je développe également un travail personnel autour de l’estampe, plus particulièrement
                            la linogravure et la gravure sur tetrapak, et du papier.
                        </p>
                        <p className="text-gray-900 text-justify font-omnes-semicond">
                            Au fil de mon expérimentation, j’ai eu envie de partager ces pratiques et j’anime
                            régulièrement des ateliers pour les enfants et les adultes, notamment à
                            <span className="text-primary"> l’Échelle</span>, <span className="text-primary">Céramique
                            et cie</span>,  en <span className="text-primary">médiathèques</span> et
                            <span className="text-primary"> centres culturels</span>, etc.
                        </p>
                    </div>

                    {/* Right Column - Illustration */}
                    <div className="flex-1 w-full h-96 lg:h-[600px] relative group">
                        <Image
                            src={Illustration}
                            alt="Pauline Tacik - Illustration personnelle"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Skills / Services Section */}
                <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-8 lg:gap-12 mb-16 text-center">
                    {/* Row 1 */}
                    <div className="space-y-4 group transition-transform duration-300 hover:scale-105 relative">
                        <h3 className="relative text-2xl m-auto mb-6 max-w-3/4 font-bold leading-tight text-balance text-primary"
                            style={{ fontFamily: 'var(--font-aracau)' }}>
                            <span className="relative z-10">identités visuelles</span>
                            <Image
                                src={Dot}
                                alt="decoration Dot"
                                width={50}
                                height={50}
                                className="absolute -top-6 left-3/5 -translate-x-1/2 z-0 md:left-auto md:translate-x-0 md:right-28 lg:right-3"
                            />
                        </h3>
                        <p className="text-gray-900 font-omnes-semicond">Logos, chartes graphiques</p>
                    </div>
                    <div className="hidden lg:block"></div>
                    <div className="space-y-4 group transition-transform duration-300 hover:scale-105">
                        <h3 className="relative text-2xl m-auto mb-6 max-w-3/4 font-bold leading-tight text-balance text-primary"
                            style={{ fontFamily: 'var(--font-aracau)' }}>
                            <span className="relative z-10">illustration & gravure</span>
                            <Image
                                src={Dot}
                                alt="decoration Dot"
                                width={50}
                                height={50}
                                className="absolute -top-6 right-1/2 -translate-x-1/2 z-0 md:left-auto md:translate-x-0 md:right-58 lg:right-14"
                            />
                        </h3>
                        <p className="text-gray-900 font-omnes-semicond">Créations sur mesure</p>
                    </div>
                    <div className="hidden lg:block"></div>

                    {/* Row 2 */}
                    <div className="hidden lg:block"></div>
                    <div className="space-y-4 group transition-transform duration-300 hover:scale-105">
                        <h3 className="relative text-2xl m-auto mb-6 max-w-3/4 font-bold leading-tight text-balance text-primary"
                            style={{ fontFamily: 'var(--font-aracau)' }}>
                            <span className="relative z-10">supports imprimés</span>
                            <Image
                                src={Dot}
                                alt="decoration Dot"
                                width={50}
                                height={50}
                                className="absolute -bottom-6 right-3/5 -translate-x-1/2 z-0 md:translate-x-0 md:left-28 lg:left-0"
                            />
                        </h3>
                        <p className="text-gray-900 font-omnes-semicond">Brochures, affiches, cartes</p>
                    </div>
                    <div className="hidden lg:block"></div>
                    <div className="space-y-4 group transition-transform duration-300 hover:scale-105">
                        <h3 className="relative text-2xl m-auto mb-6 max-w-3/4 font-bold leading-tight text-balance text-primary"
                            style={{ fontFamily: 'var(--font-aracau)' }}>
                            <span className="relative z-10">ateliers tous publics</span>
                            <Image
                                src={Dot}
                                alt="decoration Dot"
                                width={50}
                                height={50}
                                className="absolute -bottom-4 right-1/5 -translate-x-1/2 z-0 md:left-auto md:translate-x-0 md:right-26 lg:-right-2"
                            />
                        </h3>
                        <p className="text-gray-900 font-omnes-semicond">Partage de pratiques artistiques</p>
                    </div>
                </div>

                {/* Contact Button Section */}
                <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-evenly text-center gap-6">
                    <p className="text-3xl text-gray-900 font-omnes-semicond">
                        Envie de <span className="text-primary font-semibold">collaborer</span> ?
                    </p>

                    <TransitionLink
                        href="/contact"
                        label={
                            <span className="inline-block px-6 py-2 border border-primary text-primary rounded-full font-omnes-semicond transition-colors duration-300 hover:bg-primary hover:text-white">
                                Contactez-moi
                            </span>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

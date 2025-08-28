"use client";

import { H1 } from "../components/ui/ui";
import { useState } from "react";
import Image from "next/image";
import Illustration from "../../../public/gravure-eblouie.jpg"

const AboutPage = () => {
    const [cvDownloaded, setCvDownloaded] = useState(false);

    const handleCvDownload = () => {
        console.log("Téléchargement du CV et portfolio");
        setCvDownloaded(true);
        setTimeout(() => setCvDownloaded(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white font-aracau">
            <div className="max-w-6xl mx-auto px-6 py-20">
                {/* Top Section - Title and Introduction */}
                <div className="mb-16">
                    <H1 color="text-primary" title="Pauline Tacik" align="text-left" />
                    <p className="text-xl text-primary italic mb-8">
                        Design graphique, illustration et gravure
                    </p>
                    <div className="space-y-4 text-lg leading-relaxed max-w-4xl">
                        <p className="text-gray-900">
                            Diplômée d'un bachelor en Design graphique, options médias imprimés à l'École de Condé (Nancy) 
                            après des études en stratégie de communication, je travaille en tant qu'indépendante depuis 2019.
                        </p>
                        <p className="text-gray-900">
                            Je conçois des supports imprimés, des identités visuelles ainsi que des illustrations.
                        </p>
                    </div>
                </div>

                {/* Middle Section - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
                    {/* Left Column - Main Illustration */}
                    <div className="relative">
                        <div className="relative w-full h-96 lg:h-[500px] rounded-sm overflow-hidden">
                            <Image
                                src={Illustration}
                                alt="Pauline Tacik - Illustration personnelle"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column - Personal Practice */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-primary">
                            Pratique personnelle
                        </h2>
                        <div className="space-y-4 text-lg leading-relaxed">
                            <p className="text-gray-900 text-justify">
                                Je développe également un travail personnel, particulièrement
                                de la linogravure et de la gravure sur tetrapak, et du papier.
                            </p>
                            <p className="text-gray-900 text-justify">
                                Au fil de mon expérimentation, j'ai eu envie de partager ces pratiques et j'anime 
                                régulièrement des ateliers, notamment à l'Échelle, céramique et cie.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 grid-rows-2 gap-12">
                    {/* Row 1 */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-primary">identités visuelles</h3>
                        <p className="text-gray-900">Logos, chartes graphiques</p>
                    </div>
                    <div></div> {/* empty */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-primary">illustrations & gravures</h3>
                        <p className="text-gray-900">Créations sur mesure</p>
                    </div>
                    <div></div> {/* empty */}

                    {/* Row 2 */}
                    <div></div> {/* empty */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-primary">supports imprimés</h3>
                        <p className="text-gray-900">Brochures, affiches, cartes</p>
                    </div>
                    <div></div> {/* empty */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-primary">ateliers tous publics</h3>
                        <p className="text-gray-900">Partage de pratiques artistiques</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;
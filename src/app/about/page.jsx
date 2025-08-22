"use client";

import { Button } from "../components/ui/ui";
import { useState } from "react";
import Image from "next/image";
import Illustration from "../../../public/hybride-insta2.png"

const AboutPage = () => {
    const [cvDownloaded, setCvDownloaded] = useState(false);

    const handleCvDownload = () => {
        console.log("Téléchargement du CV et portfolio");
        setCvDownloaded(true);
        setTimeout(() => setCvDownloaded(false), 2000);
    };

    return (
        <div className="relative min-h-screen bg-white font-aracau">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
            <div className="relative overflow-hidden">
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                    Pauline
                                    <span className="block text-primary">Tacik</span>
                                </h1>
                                <p className="text-xl text-gray-600 font-light tracking-wide">
                                    Designer graphique & créatrice.
                                </p>
                            </div>
                            
                            <div className="space-y-6 text-lg leading-relaxed">
                                <p className="text-gray-700">
                                    Diplômée d'un bachelor en Design graphique, options médias imprimés à l'École de Condé (Nancy) 
                                    après des études en stratégie de communication, je travaille en tant qu'indépendante depuis 2019.
                                </p>
                                <p className="text-gray-700">
                                    Je conçois des supports imprimés, des identités visuelles ainsi que des illustrations.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Éléments décoratifs */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary/30 rounded-full"></div>
                            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/20 rounded-full"></div>
                            <div className="absolute top-1/2 -left-8 w-6 h-6 bg-secondary/40 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-square bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50"></div>
                                <Image src={Illustration} alt={"illustration"} width={350} height={350} />
                            </div>
                            
                            {/* Éléments décoratifs */}
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/30 rounded-full"></div>
                            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/40 rounded-full"></div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-gray-900">
                                Travail <span className="text-secondary">personnel</span>
                            </h2>
                            <div className="space-y-4 text-lg leading-relaxed">
                                <p className="text-gray-700">
                                    Je développe également un travail personnel, particulièrement
                                    de la linogravure et de la gravure sur tetrapak, et du papier.
                                </p>
                                <p className="text-gray-700">
                                    Au fil de mon expérimentation, j'ai eu envie de partager ces pratiques et j'anime 
                                    régulièrement des ateliers, notamment à l'Échelle, céramique et cie.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Ce que je <span className="text-primary">propose</span>
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Identités visuelles", desc: "Logos, chartes graphiques" },
                            { title: "Supports imprimés", desc: "Brochures, affiches, cartes" },
                            { title: "Illustrations", desc: "Créations sur mesure" },
                            { title: "Ateliers créatifs", desc: "Partage de techniques" }
                        ].map((service, index) => (
                            <div key={index} className="group relative">
                                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-primary group-hover:shadow-xl group-hover:-translate-y-2">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">
                                                {['🎨', '📄', '✏️', '👥'][index]}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                            <p className="text-gray-600">{service.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold text-gray-900">
                            Envie de <span className="text-primary">collaborer</span> ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Vous pouvez me contacter pour toute demande de collaboration, de commande ou d'atelier. 
                            Je serai ravie de discuter avec vous de votre projet et de vos envies !
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button 
                                text="Me contacter" 
                                onClick={() => window.location.href = '/contact'}
                            />
                            <Button 
                                text={cvDownloaded ? "Téléchargé !" : "Télécharger CV"} 
                                onClick={handleCvDownload}
                                admin={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
"use client";

import { Button, H1 } from "../components/ui/ui";
import Input from "../components/layout/form/input";
import TextArea from "../components/layout/form/textArea";
import {useEffect, useState} from "react";
import emailjs from '@emailjs/browser';

const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY;

const ContactPage = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        emailjs.init(publicKey);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const isDisabled = !formData.firstName || !formData.lastName || !formData.email || !formData.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        alert("Fonctionnalité en cours de développement, merci de revenir plus tard !");
        setLoading(false);
        return;

        try {
            await emailjs.send(serviceID, templateID, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                message: formData.message,
            });

            alert("Message envoyé avec succès !");
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            alert("Une erreur est survenue, veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 w-full flex flex-col items-start text-primary">
                    <H1 title="Me contacter" color="text-primary" />
                    <p className="mt-4 text-lg max-w-2xl">
                        Vous avez un projet en tête ? Une question ?
                    </p>
                    <p className="mt-4 text-lg max-w-2xl">
                        N'hésitez pas à me contacter, je serai ravie d'échanger avec vous !
                    </p>
                </div>

                {/* Contact Form */}
                <div className="text-primary" >
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-6">
                                    Discutons de votre <span className="text-secondary" >projet</span>
                                </h3>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input 
                                        label="Prénom" 
                                        name="firstName" 
                                        type="text" 
                                        onChange={handleChange} 
                                        required={true} 
                                    />
                                    <Input 
                                        label="Nom" 
                                        name="lastName" 
                                        type="text" 
                                        onChange={handleChange} 
                                        required={true} 
                                    />
                                </div>
                                
                                <Input 
                                    label="Email" 
                                    name="email" 
                                    type="email" 
                                    onChange={handleChange} 
                                    required={true} 
                                />
                                
                                <TextArea 
                                    name="message" 
                                    label="Message" 
                                    placeholder="Décrivez votre projet, vos besoins, vos questions..." 
                                    onChange={handleChange} 
                                    required={true} 
                                />
                                
                                <Button 
                                    text={loading ? "Envoi en cours..." : "Envoyer le message"} 
                                    disabled={isDisabled || loading} 
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage;
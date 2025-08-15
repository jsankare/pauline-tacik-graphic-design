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
        <section>
            <H1 title="Me contacter" />
            <form onSubmit={handleSubmit}>
                <Input label="Nom" name="lastName" type="text" onChange={handleChange} required={true} />
                <Input label="Prénom" name="firstName" type="text" onChange={handleChange} required={true} />
                <Input label="Email" name="email" type="email" onChange={handleChange} required={true} />
                <TextArea name="message" label="Message" placeholder="Message" onChange={handleChange} required={true} />
                <Button text={loading ? "Envoi en cours..." : "Envoyer"} disabled={isDisabled || loading} />
            </form>
        </section>
    )
}

export default ContactPage;
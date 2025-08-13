"use client";

import {Button, H1} from "@/app/components/ui/ui";
import Input from "@/app/components/layout/form/input";
import TextArea from "@/app/components/layout/form/textArea";
import { useState } from "react";

const ContactPage = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const isDisabled = !formData.firstName || !formData.lastName || !formData.email || !formData.message;

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate form submission
            console.log("Form submitted with data:", formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    }

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
"use client";

import { Button, H1 } from "../components/ui/ui";
import Input from "../components/layout/form/input";
import { useEffect, useState, Suspense } from "react";
import TransitionLink from "../components/TransitionLink";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/admin";

    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const isDisabled = !formData.username || !formData.password;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                username: formData.username,
                password: formData.password,
                redirect: false,
            });
            if (result?.error) {
                console.log("Erreur de connexion :", result.error);
            } else {
                router.push(callbackUrl);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
            <Input label="Nom d'utilisateur" name="username" type="text" onChange={handleChange} value={formData.username} />
            <Input label="Mot de passe" name="password" type="password" onChange={handleChange} value={formData.password} />
            <Button text={loading ? "Connexion en cours..." : "Connexion"} disabled={isDisabled || loading} />
        </form>
    );
}

export default function LoginPage() {
    useEffect(() => {
        const root = document.documentElement;
        root.classList.add("hide-chrome");
        return () => root.classList.remove("hide-chrome");
    }, []);

    return (
        <div className="max-w-4xl mx-auto items-center flex flex-col gap-4">
            <H1 title="Connexion à l'espace administrateur" />
            <Suspense fallback={<div>Chargement...</div>}>
                <LoginForm />
            </Suspense>
            <TransitionLink label="Retour à l'accueil" centered={true} href="/" />
        </div>
    );
}

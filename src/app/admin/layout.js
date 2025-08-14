'use client';

import { SessionProvider } from 'next-auth/react';
import TransitionLink from "@/app/components/TransitionLink";
import { signOut } from 'next-auth/react';
import {Button} from "@/app/components/ui/ui";

const AdminLayout = ({ children }) => {
    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    };

    const handleShowProjects = () => {
        console.log("Show projects");
    }

    const handleShowWorkshops = () => {
        console.log("Show workshops");
    }


    return (
        <SessionProvider>
            <header className="w-full border-b border-neutral-200 p-4 flex items-center justify-between">
                <div className="text-lg font-semibold">Admin</div>
                <div className="flex gap-4" >
                    <Button text="Projets" onClick={handleShowProjects} admin={true} />
                    <Button text="Ateliers" onClick={handleShowWorkshops} admin={true} />
                </div>
                <div className="flex items-center gap-3">
                    <TransitionLink href="/" label="Visit site" />
                    <Button
                        className="bg-primary text-white transition-all hover:scale-105 hover:cursor-pointer px-4 py-2 rounded-md hover:bg-primary-dark"
                        onClick={handleLogout}
                        text="Logout"
                        danger={true}
                    />
                </div>
            </header>
            <div className="p-4">
                {children}
            </div>
        </SessionProvider>
    );
}

export default AdminLayout;
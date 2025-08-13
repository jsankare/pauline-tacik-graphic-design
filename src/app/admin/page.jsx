"use client";

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {useEffect} from "react";

const AdminPage = () =>  {

    const router = useRouter();

    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    };

    return(
        <p>this the admin page</p>
    )
}

export default AdminPage;
"use client";

import { useSession } from 'next-auth/react';
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

    return(
        <section>
            <p>this the admin page</p>
        </section>
    )
}

export default AdminPage;
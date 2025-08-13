'use client';

import { SessionProvider } from 'next-auth/react';

const AdminLayout = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}

export default AdminLayout;
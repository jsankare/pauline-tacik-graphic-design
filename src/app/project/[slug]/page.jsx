'use client';

import { useParams } from 'next/navigation';

const SingleProjectPage = () => {

    const params = useParams();
    const projectName = params.slug;

    return (
        <p>single project page with param {projectName}</p>
    )
}

export default SingleProjectPage;
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { H1 } from '../../components/ui/ui';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const SingleProjectPage = async ({ params }) => {
    const projectId = params.slug;

    // Fetch project from MongoDB
    let project = null;
    try {
        const client = await clientPromise;
        const db = client.db();

        // Check if the ID is a valid ObjectId
        if (!ObjectId.isValid(projectId)) {
            notFound();
        }

        project = await db.collection('projects').findOne({ _id: new ObjectId(projectId) });

        if (!project) {
            notFound();
        }
    } catch (error) {
        console.error('Error fetching project:', error);
        notFound();
    }

    return (
        <div className="mx-auto my-auto h-full p-4 text-primary">
            <div className="flex flex-col lg:flex-row gap-8 py-24 items-start">
                {/* Left Side - Images */}
                <div className="space-y-4 w-full lg:w-6/10">
                    {/* Thumbnail */}
                    {project.thumbnail && (
                        <div className="relative w-full h-96 overflow-hidden">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Images Gallery */}
                    {project.images && project.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {project.images.map((image, index) => (
                                <div key={index} className="relative h-48 overflow-hidden">
                                    <Image
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side - Information */}
                <div className="space-y-6 lg:w-4/10 flex flex-col">
                {/* Title */}
                    <div className="mt-0 pt-0">
                        <H1 color="text-primary" align="text-left" title={project.title} />
                    </div>

                    {/* Type */}
                    {project.type && (
                        <div>
                            <p className="text-gray-700">{project.type}</p>
                        </div>
                    )}

                    {/* Date */}
                    {project.date && (
                        <div>
                            <p className="text-gray-700">
                                {new Date(project.date).getFullYear()}
                            </p>
                        </div>
                    )}

                    {/* Description */}
                    {project.description && (
                        <div>
                            <p className="text-gray-700">{project.description}</p>
                        </div>
                    )}

                    {/* Long Description */}
                    {project.longDescription && (
                        <div>
                            <p className="text-gray-700">{project.longDescription}</p>
                        </div>
                    )}

                    {/* Link */}
                    {project.link && (
                        <div>
                            <h3 className="font-semibold  mb-1">Lien</h3>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                {project.link}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleProjectPage;
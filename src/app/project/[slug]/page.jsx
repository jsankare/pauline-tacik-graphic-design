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
        <div className="max-w-4xl mx-auto p-4">
            <H1 title={project.title} />
            
            <div className="mt-8 space-y-6">
                {/* Thumbnail */}
                {project.thumbnail && (
                    <div className="relative w-full h-64 sm:h-96 rounded-sm overflow-hidden">
                        <Image
                            src={project.thumbnail || '/placeholder.svg'}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                
                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                            <p className="text-gray-700">{project.description}</p>
                        </div>
                        
                        {project.longDescription && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Description détaillée</h2>
                                <p className="text-gray-700">{project.longDescription}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-4">
                        {project.type && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Type</h3>
                                <p className="text-gray-700">{project.type}</p>
                            </div>
                        )}
                        
                        {project.date && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Date</h3>
                                <p className="text-gray-700">
                                    {project.date ? new Date(project.date).getFullYear() : '—'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Images Gallery */}
                {project.images && project.images.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Galerie d'images</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.images.map((image, index) => (
                                <div key={index} className="relative h-48 rounded-sm overflow-hidden">
                                    <Image
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleProjectPage;
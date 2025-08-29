import { notFound } from 'next/navigation';
import Image from 'next/image';
import { H1 } from '../../components/ui/ui';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import NavigationArrows from '../../components/NavigationArrows';

const SingleProjectPage = async ({ params }) => {
    const projectId = params.slug;

    // Fetch project from MongoDB
    let project = null;
    let allProjects = [];
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

        // Fetch all projects for navigation
        allProjects = await db.collection('projects').find({}).sort({ date: -1 }).toArray();
    } catch (error) {
        console.error('Error fetching project:', error);
        notFound();
    }

    // Find current project index and get previous/next
    const currentIndex = allProjects.findIndex(p => p._id.toString() === projectId);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    // Parse types
    const types = project.type ? project.type.split(',').map(type => type.trim()).filter(Boolean) : [];

    return (
        <div className="mx-auto my-auto h-full p-4 text-primary font-omnes-semicond">
            <div className="flex flex-col lg:flex-row gap-8 py-24 items-start">
                {/* Left Side - Images */}
                <div className="space-y-4 w-full lg:w-5/10">
                    {/* Thumbnail */}
                    {project.thumbnail && (
                        <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden">
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
                                <div key={index} className="relative h-64 lg:h-80 overflow-hidden">
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
                <div className="space-y-6 lg:w-5/10 flex flex-col lg:pl-12">
                {/* Title */}
                    <div className="mt-0 pt-0">
                        <H1 color="text-primary" align="text-left" title={project.title} />
                    </div>

                    {/* Types */}
                    {types.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {types.map((type, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-omnes-semicond">
                                    {type}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Date */}
                    {project.date && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">
                                {new Date(project.date).getFullYear()}
                            </p>
                        </div>
                    )}

                    {/* Description */}
                    {project.description && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">{project.description}</p>
                        </div>
                    )}

                    {/* Long Description */}
                    {project.longDescription && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">{project.longDescription}</p>
                        </div>
                    )}

                    {/* Link */}
                    {project.link && (
                        <div>
                            <h3 className="font-semibold mb-1" style={{fontFamily: 'var(--font-aracau)'}}>Lien</h3>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline font-omnes-semicond"
                            >
                                {project.link}
                            </a>
                        </div>
                    )}
                </div>
            </div>
            <NavigationArrows
                prevItem={prevProject ? { id: prevProject._id.toString(), title: prevProject.title } : null}
                nextItem={nextProject ? { id: nextProject._id.toString(), title: nextProject.title } : null}
                basePath="/project"
            />
        </div>
    );
};

export default SingleProjectPage;
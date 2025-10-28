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
        console.error('Error fetching projects:', error);
        notFound();
    }

    // Find current project index and get previous/next
    const currentIndex = allProjects.findIndex(p => p._id.toString() === projectId);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    // Parse types
    const types = project.type ? project.type.split(',').map(type => type.trim()).filter(Boolean) : [];

    return (
        <div className="mx-auto my-auto h-full text-primary font-omnes-semicond">
            <div className="mx-auto max-w-[80%] py-20 flex flex-col-reverse gap-12 items-start">
                {/* Images */}
                <div className="flex-1 flex flex-col items-center gap-6 w-full">
                    {/* Thumbnail */}
                    {project.thumbnail && (
                        <div className="flex items-center justify-center w-full h-[600px]">
                            <Image
                                src={project.thumbnail}
                                alt={project.title}
                                width={900}
                                height={600}
                                className="object-contain max-h-full w-auto"
                            />
                        </div>
                    )}

                    {/* Gallery */}
                    {project.images && project.images.length > 0 && (
                        <div className="flex flex-col items-center gap-6 w-full">
                            {project.images.map((image, index) => (
                                <div key={index} className="flex items-center justify-center w-full h-[600px]">
                                    <Image
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        width={900}
                                        height={600}
                                        className="object-contain max-h-full w-auto"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Infos */}
                <div className="flex-1 flex flex-col h-full justify-between w-full mx-auto max-w-[900px]">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    {/* Col gauche : titre + types */}
                        <div className="space-y-4">
                            <H1 noMt color="text-primary" align="text-left" title={project.title} />
                        </div>

                        {/* Col droite : reste des infos */}
                        <div className="space-y-4 text-left">
                            <div className="flex flex-col gap-1" >
                                {types.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {types.map((type, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 border border-primary/75 rounded-full text-sm font-omnes-semicond text-primary/75"
                                            >
                                            {type}
                                        </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {project.description && <p className="text-gray-800">{project.description}</p>}
                            {project.date && (
                                <p className="font-medium font-omnes-semicond text-primary/75">
                                    {project.date}
                                </p>
                            )}
                            <div className="flex flex-col gap-1">
                                <p>{project.format}</p>
                                {(project.pages && project.pages > 0) &&
                                    <span>{project.pages} {project.pages === 1 ? "page" : "pages"}</span>
                                }
                            </div>
                            {project.link && (
                                <div>
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
                    </section>
                </div>

            </div>
            <div className="max-w-[900px] mx-auto" >
                <NavigationArrows
                    prevItem={prevProject ? { id: prevProject._id.toString(), title: prevProject.title } : null}
                    nextItem={nextProject ? { id: nextProject._id.toString(), title: nextProject.title } : null}
                    basePath="/project"
                />
            </div>
        </div>
    );
};

export default SingleProjectPage;
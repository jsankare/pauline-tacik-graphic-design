import { notFound } from 'next/navigation';
import Image from 'next/image';
import { H1 } from '../../components/ui/ui';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import NavigationArrows from '../../components/NavigationArrows';

const SingleWorkshopPage = async ({ params }) => {
    const workshopId = params.slug;

    // Fetch workshop from MongoDB
    let workshop = null;
    let allWorkshops = [];
    try {
        const client = await clientPromise;
        const db = client.db();
        
        // Check if the ID is a valid ObjectId
        if (!ObjectId.isValid(workshopId)) {
            notFound();
        }
        
        workshop = await db.collection('workshops').findOne({ _id: new ObjectId(workshopId) });
        
        if (!workshop) {
            notFound();
        }

        // Fetch all workshops for navigation
        allWorkshops = await db.collection('workshops').find({}).sort({ date: -1 }).toArray();
    } catch (error) {
        console.error('Error fetching workshop:', error);
        notFound();
    }

    // Find current workshop index and get previous/next
    const currentIndex = allWorkshops.findIndex(w => w._id.toString() === workshopId);
    const prevWorkshop = currentIndex > 0 ? allWorkshops[currentIndex - 1] : null;
    const nextWorkshop = currentIndex < allWorkshops.length - 1 ? allWorkshops[currentIndex + 1] : null;

    // Parse types
    const types = workshop.type ? workshop.type.split(',').map(type => type.trim()).filter(Boolean) : [];

    return (
        <div className="mx-auto my-auto h-full p-4 text-primary font-omnes-semicond">
            <div className="mx-auto max-w-[80%] py-24 flex flex-col-reverse gap-12 items-start">
                {/* Images */}
                <div className="flex-1 flex flex-col items-center gap-6 w-full">
                    {/* Thumbnail */}
                    {workshop.thumbnail && (
                        <div className="flex items-center justify-center w-full h-[600px]">
                            <Image
                                src={workshop.thumbnail}
                                alt={workshop.name}
                                width={900}
                                height={600}
                                className="object-contain max-h-full w-auto"
                            />
                        </div>
                    )}

                    {/* Gallery */}
                    {workshop.images && workshop.images.length > 0 && (
                        <div className="flex flex-col items-center gap-6 w-full">
                            {workshop.images.map((image, index) => (
                                <div key={index} className="flex items-center justify-center w-full h-[600px]">
                                    <Image
                                        src={image}
                                        alt={`${workshop.name} - Image ${index + 1}`}
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
                <div className="flex-1 flex flex-col h-full max-w-[900px] mx-auto">
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                        {/* Col gauche : titre + types */}
                        <div className="space-y-4">
                            <H1 noMt color="text-primary" align="text-left" title={workshop.name} />
                            {types.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {types.map((type, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 rounded-full text-sm font-omnes-semicond"
                                        >
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Col droite : reste des infos */}
                        <div className="space-y-4">
                            {workshop.date && (
                                <p className="font-medium font-omnes-semicond">
                                    {new Date(workshop.date).toLocaleDateString('fr-FR')}
                                </p>
                            )}
                            {workshop.duration && <p className="font-medium font-omnes-semicond">{workshop.duration}</p>}
                            {workshop.price && <p className="font-medium font-omnes-semicond">{workshop.price}€</p>}
                            {workshop.location && <p className="font-medium font-omnes-semicond">{workshop.location}</p>}
                            {workshop.longDescription && <p>{workshop.longDescription}</p>}
                            {workshop.requirements && <p className="italic">{workshop.requirements}</p>}
                        </div>
                    </section>
                </div>

            </div>
            <NavigationArrows
                prevItem={prevWorkshop ? { id: prevWorkshop._id.toString(), title: prevWorkshop.name } : null}
                nextItem={nextWorkshop ? { id: nextWorkshop._id.toString(), title: nextWorkshop.name } : null}
                basePath="/workshop"
            />
        </div>
    );
};

export default SingleWorkshopPage;
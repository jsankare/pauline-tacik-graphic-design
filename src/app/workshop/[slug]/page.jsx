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
            <div className="flex flex-col lg:flex-row gap-8 py-24 px-24 items-start">
                {/* Left Side - Information */}
                <div className="space-y-6 lg:w-6/10 flex flex-col">
                    {/* Title */}
                    <div className="mt-0 pt-0">
                        <H1 color="text-primary" align="text-left" title={workshop.name} />
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
                    {workshop.date && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">
                                {new Date(workshop.date).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    )}

                    {/* Duration */}
                    {workshop.duration && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">{workshop.duration}</p>
                        </div>
                    )}

                    {/* Price */}
                    {workshop.price && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">{workshop.price}€</p>
                        </div>
                    )}

                    {/* Location */}
                    {workshop.location && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">{workshop.location}</p>
                        </div>
                    )}

                    {/* Description */}
                    {workshop.shortDescription && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">{workshop.shortDescription}</p>
                        </div>
                    )}

                    {/* Long Description */}
                    {workshop.longDescription && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">{workshop.longDescription}</p>
                        </div>
                    )}

                    {/* Requirements */}
                    {workshop.requirements && (
                        <div>
                            <p className="text-gray-700 font-omnes-semicond">{workshop.requirements}</p>
                        </div>
                    )}
                </div>
                {/* Right Side - Images */}
                <div className="space-y-4 w-full lg:w-4/10">
                    {/* Thumbnail */}
                    {workshop.thumbnail && (
                        <div className="relative w-full h-96 overflow-hidden">
                            <Image
                                src={workshop.thumbnail}
                                alt={workshop.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    
                    {/* Images Gallery */}
                    {workshop.images && workshop.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                            {workshop.images.map((image, index) => (
                                <div key={index} className="relative h-48 overflow-hidden">
                                    <Image
                                        src={image}
                                        alt={`${workshop.name} - Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
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
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { H1 } from '../../components/ui/ui';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const SingleWorkshopPage = async ({ params }) => {
    const workshopId = params.slug;

    // Fetch workshop from MongoDB
    let workshop = null;
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
    } catch (error) {
        console.error('Error fetching workshop:', error);
        notFound();
    }

    return (
        <div className="mx-auto my-auto h-full p-4 text-primary">
            <div className="flex flex-col lg:flex-row gap-8 py-24 px-24 items-start">
                {/* Left Side - Information */}
                <div className="space-y-6 lg:w-3/10 ml-12 flex flex-col">
                    {/* Title */}
                    <div className="mt-0 pt-0">
                        <H1 color="text-primary" align="text-left" title={workshop.name} />
                    </div>

                    {/* Date */}
                    {workshop.date && (
                        <div>
                            <h3 className="font-semibold mb-1">Date</h3>
                            <p className="text-gray-700">
                                {new Date(workshop.date).toLocaleDateString('fr-FR')}
                            </p>
                        </div>
                    )}

                    {/* Duration */}
                    {workshop.duration && (
                        <div>
                            <h3 className="font-semibold mb-1">Durée</h3>
                            <p className="text-gray-700">{workshop.duration}</p>
                        </div>
                    )}

                    {/* Price */}
                    {workshop.price && (
                        <div>
                            <h3 className="font-semibold mb-1">Prix</h3>
                            <p className="text-gray-700">{workshop.price}€</p>
                        </div>
                    )}

                    {/* Capacity */}
                    {workshop.capacity && (
                        <div>
                            <h3 className="font-semibold mb-1">Capacité</h3>
                            <p className="text-gray-700">{workshop.capacity} personnes</p>
                        </div>
                    )}

                    {/* Location */}
                    {workshop.location && (
                        <div>
                            <h3 className="font-semibold mb-1">Lieu</h3>
                            <p className="text-gray-700">{workshop.location}</p>
                        </div>
                    )}

                    {/* Description */}
                    {workshop.shortDescription && (
                        <div>
                            <h3 className="font-semibold mb-2">Description</h3>
                            <p className="text-gray-700">{workshop.shortDescription}</p>
                        </div>
                    )}

                    {/* Long Description */}
                    {workshop.longDescription && (
                        <div>
                            <h3 className="font-semibold mb-2">Description détaillée</h3>
                            <p className="text-gray-700">{workshop.longDescription}</p>
                        </div>
                    )}

                    {/* Requirements */}
                    {workshop.requirements && (
                        <div>
                            <h3 className="font-semibold mb-2">Prérequis</h3>
                            <p className="text-gray-700">{workshop.requirements}</p>
                        </div>
                    )}
                </div>
                {/* Right Side - Images */}
                <div className="space-y-4 w-full lg:w-7/10">
                    {/* Thumbnail */}
                    {workshop.thumbnail && (
                        <div className="relative w-full h-96 rounded-sm overflow-hidden">
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
                                <div key={index} className="relative h-48 rounded-sm overflow-hidden">
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
        </div>
    );
};

export default SingleWorkshopPage;
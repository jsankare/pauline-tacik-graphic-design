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
        <div className="max-w-4xl mx-auto p-4">
            <H1 title={workshop.name} />
            
            <div className="mt-8 space-y-6">
                {/* Thumbnail */}
                {workshop.thumbnail && (
                    <div className="relative w-full h-64 sm:h-96 rounded-sm overflow-hidden">
                        <Image
                            src={workshop.thumbnail || '/placeholder.svg'}
                            alt={workshop.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                
                {/* Workshop Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
                            <p className="text-gray-700">{workshop.shortDescription}</p>
                        </div>
                        
                        {workshop.longDescription && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Description détaillée</h2>
                                <p className="text-gray-700">{workshop.longDescription}</p>
                            </div>
                        )}
                        
                        {workshop.requirements && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Prérequis</h2>
                                <p className="text-gray-700">{workshop.requirements}</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-4">
                        {workshop.date && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Date</h3>
                                <p className="text-gray-700">
                                    {new Date(workshop.date).toLocaleDateString('fr-FR')}
                                </p>
                            </div>
                        )}
                        
                        {workshop.duration && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Durée</h3>
                                <p className="text-gray-700">{workshop.duration}</p>
                            </div>
                        )}
                        
                        {workshop.price && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Prix</h3>
                                <p className="text-gray-700">{workshop.price}€</p>
                            </div>
                        )}
                        
                        {workshop.capacity && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Capacité</h3>
                                <p className="text-gray-700">{workshop.capacity} personnes</p>
                            </div>
                        )}
                        
                        {workshop.location && (
                            <div>
                                <h3 className="font-semibold text-gray-900">Lieu</h3>
                                <p className="text-gray-700">{workshop.location}</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Images Gallery */}
                {workshop.images && workshop.images.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Galerie d'images</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleWorkshopPage;
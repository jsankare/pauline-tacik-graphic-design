"use client";

import { useState } from 'react';
import { CloseIcon, InfoIcon } from '@/app/components/icons';

const ImagesGrid = ({ images, onDelete, onRefresh }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingImage, setDeletingImage] = useState(null);

    const handleDeleteClick = (image) => {
        setSelectedImage(image);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedImage) return;
        
        setDeletingImage(selectedImage.filename);
        try {
            const response = await fetch(`/api/images/${selectedImage.filename}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                setShowDeleteModal(false);
                setSelectedImage(null);
                onRefresh(); // Refresh the images list
            } else {
                const error = await response.json();
                if (error.isUsed) {
                    alert(`Cette image ne peut pas être supprimée car elle est utilisée dans ${error.usageCount} projet(s) ou workshop(s).`);
                } else {
                    alert(`Erreur: ${error.message}`);
                }
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Erreur lors de la suppression');
        } finally {
            setDeletingImage(null);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!images || images.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-lg font-medium mb-2">Aucune image</h3>
                <p className="text-sm">Commencez par uploader des images dans vos projets ou workshops</p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {images.map((image, id) => (
                    <div 
                        key={id}
                        className={`bg-white rounded-sm border overflow-hidden hover:shadow-lg transition-shadow ${
                            image.isUsed ? 'border-secondary/20 bg-secondary/50' : 'border-gray-200'
                        }`}
                    >
                        {/* Image Preview */}
                        <div className="relative group">
                            <img
                                src={image.url}
                                alt={image.filename}
                                className="w-full h-48 object-cover"
                            />
                            
                            {/* Usage Badge */}
                            {image.isUsed && (
                                <div className="absolute top-2 left-2 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                                    Utilisée ({image.usageCount})
                                </div>
                            )}
                            
                            {/* Delete Button */}
                            {!image.isUsed && (
                                <button
                                    onClick={() => handleDeleteClick(image)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                    title="Supprimer cette image"
                                >
                                    <CloseIcon className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        
                        {/* Image Info */}
                        <div className="p-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500 font-mono truncate">
                                    {image.filename}
                                </span>
                                {image.isUsed && (
                                    <InfoIcon className="w-4 h-4 text-secondary" title="Image utilisée" />
                                )}
                            </div>
                            
                            <div className="text-xs text-gray-600 space-y-1">
                                <div className="flex justify-between">
                                    <span>Taille:</span>
                                    <span>{formatFileSize(image.size)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Créée:</span>
                                    <span>{formatDate(image.createdAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Usage:</span>
                                    <span className={image.isUsed ? 'text-secondary font-medium' : 'text-gray-500'}>
                                        {image.isUsed ? `${image.usageCount} fois` : 'Non utilisée'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedImage && (
                <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-40 p-4">
                    <div className="bg-white rounded-sm p-6 max-w-md w-full shadow-2xl border border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <CloseIcon className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                    Confirmer la suppression
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Cette action est irréversible
                                </p>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-sm text-gray-700 mb-3">
                                Êtes-vous sûr de vouloir supprimer cette image ?
                            </p>
                            <div className="bg-gray-50 rounded-sm p-3">
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.filename}
                                    className="w-full h-32 object-cover rounded"
                                />
                                <p className="text-xs text-gray-600 mt-2 font-mono">
                                    {selectedImage.filename}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={deletingImage === selectedImage.filename}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {deletingImage === selectedImage.filename ? 'Suppression...' : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImagesGrid; 
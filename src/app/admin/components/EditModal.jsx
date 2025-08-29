"use client";

import { useState, useEffect } from 'react';
import { CloseIcon } from '@/app/components/icons';
import ImageUpload from './ImageUpload';
import Toggle from '@/app/components/layout/form/toggle';

const EditModal = ({ isOpen, onClose, item, onSave, type }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (item) {
            setFormData(item);
        } else {
            setFormData({});
        }
    }, [item]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleToggleChange = (field, checked) => {
        const value = checked ? 'Portrait' : 'Landscape';
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Process form data before saving
        const processedData = { ...formData };
        
        // Convert date string to Date object
        if (processedData.date && typeof processedData.date === 'string') {
            processedData.date = new Date(processedData.date);
        }
        
        // Convert numeric fields
        if (processedData.price) processedData.price = parseFloat(processedData.price);
        if (processedData.capacity) processedData.capacity = parseInt(processedData.capacity);
        
        // Remove empty password field for users if not changed
        if (type === 'user' && !processedData.password) {
            delete processedData.password;
        }
        
        onSave(processedData);
    };

    if (!isOpen) return null;

    const getFields = () => {
        switch (type) {
            case 'project':
                return [
                    { field: 'title', label: 'Titre', type: 'text', required: true },
                    { field: 'description', label: 'Description', type: 'textarea', required: true },
                    { field: 'shortDescription', label: 'Description courte', type: 'textarea', required: true },
                    { field: 'longDescription', label: 'Description longue', type: 'textarea', required: true },
                    { field: 'thumbnail', label: 'Miniature', type: 'image', required: false },
                    { field: 'orientation', label: 'Orientation', type: 'toggle', required: false },
                    { field: 'images', label: 'Images', type: 'imageArray', required: false },
                    { field: 'date', label: 'Date', type: 'date', required: true },
                    { field: 'type', label: 'Types (séparés par des virgules)', type: 'textarea', required: false },
                    { field: 'link', label: 'Lien', type: 'url', required: false }
                ];
            case 'workshop':
                return [
                    { field: 'name', label: 'Nom', type: 'text', required: true },
                    { field: 'shortDescription', label: 'Description courte', type: 'textarea', required: true },
                    { field: 'longDescription', label: 'Description longue', type: 'textarea', required: true },
                    { field: 'thumbnail', label: 'Miniature', type: 'image', required: false },
                    { field: 'orientation', label: 'Orientation', type: 'toggle', required: false },
                    { field: 'images', label: 'Images', type: 'imageArray', required: false },
                    { field: 'date', label: 'Date', type: 'date', required: true },
                    { field: 'link', label: 'Lien', type: 'url', required: false },
                    { field: 'duration', label: 'Durée', type: 'text', required: true },
                    { field: 'price', label: 'Prix (€)', type: 'number', required: true },
                    { field: 'location', label: 'Lieu', type: 'text', required: true },
                    { field: 'capacity', label: 'Capacité', type: 'number', required: true },
                    { field: 'type', label: 'Types (séparés par des virgules)', type: 'textarea', required: false },
                    { field: 'requirements', label: 'Prérequis', type: 'textarea', required: false }
                ];
            case 'user':
                return [
                    { field: 'username', label: 'Nom d\'utilisateur', type: 'text', required: true },
                    { field: 'password', label: 'Mot de passe (laisser vide pour ne pas changer)', type: 'password', required: false },
                    { field: 'role', label: 'Rôle', type: 'select', options: ['admin', 'user'], required: true }
                ];
            default:
                return [];
        }
    };

    const renderField = (fieldConfig) => {
        const { field, label, type, required, options } = fieldConfig;
        const value = formData[field] || '';

        if (type === 'toggle') {
            const isPortrait = value === 'Portrait';
            return (
                <Toggle
                    name="Orientation"
                    description=""
                    checked={isPortrait}
                    onChange={(checked) => handleToggleChange(field, checked)}
                    onLabel="Portrait"
                    offLabel="Paysage"
                />
            );
        }

        if (type === 'image') {
            return (
                <ImageUpload
                    label="Miniature / Thumbnail (1)"
                    value={value}
                    onChange={(url) => handleInputChange(field, url)}
                    multiple={false}
                    required={required}
                    placeholder="Cliquez pour sélectionner une image"
                />
            );
        }

        if (type === 'imageArray') {
            return (
                <ImageUpload
                    label="Images"
                    value={value}
                    onChange={(urls) => handleInputChange(field, urls)}
                    multiple={true}
                    required={required}
                    placeholder="Cliquez pour sélectionner des images"
                />
            );
        }

        if (type === 'textarea') {
            return (
                <textarea
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    required={required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    rows={3}
                />
            );
        }

        if (type === 'select') {
            return (
                <select
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    required={required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                    <option value="">Sélectionner...</option>
                    {options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        }

        if (type === 'password') {
            return (
                <input
                    type="password"
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    required={required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    placeholder={item?._id ? "Laisser vide pour ne pas changer" : ""}
                />
            );
        }

        if (type === 'url') {
            return (
                <input
                    type="url"
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    required={required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
            );
        }

        if (type === 'number') {
            return (
                <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    required={required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
            );
        }

        const today = new Date().toISOString().split("T")[0];

        if (type === 'date') {
            return (
                <input
                    type="date"
                    value={value ? new Date(value).toISOString().split('T')[0] : today}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    required={required}
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
            );
        }

        return (
            <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(field, e.target.value)}
                required={required}
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
        );
    };

    return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-40 p-2 sm:p-4">
            <div className="bg-white rounded-sm p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {item?._id ? 'Modifier' : 'Créer'} {type === 'project' ? 'le projet' : type === 'workshop' ? 'le workshop' : 'l\'utilisateur'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 p-1"
                    >
                        <CloseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {getFields().map((fieldConfig) => (
                        <div key={fieldConfig.field}>
                            {fieldConfig.type !== 'image' && fieldConfig.type !== 'imageArray' && fieldConfig.type !== 'toggle' && (
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {fieldConfig.label}
                                    {fieldConfig.required && <span className="text-red-500">*</span>}
                                </label>
                            )}
                            {renderField(fieldConfig)}
                        </div>
                    ))}

                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {item?._id ? 'Modifier' : 'Créer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal; 
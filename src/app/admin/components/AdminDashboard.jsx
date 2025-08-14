"use client";

import { useState, useEffect } from 'react';
import { PlusIcon } from '@/app/components/icons';
import DataTable from './DataTable';
import EditModal from './EditModal';
import ImagesGrid from './ImagesGrid';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const tabs = [
        { id: 'projects', label: 'Projets', icon: '📁' },
        { id: 'workshops', label: 'Workshops', icon: '🔨' },
        { id: 'users', label: 'Utilisateurs', icon: '👥' },
        { id: 'images', label: 'Images', icon: '🖼️' }
    ];

    const columns = {
        projects: [
            { field: 'thumbnail', label: 'Miniature' },
            { field: 'title', label: 'Titre' },
            { field: 'description', label: 'Description' },
            { field: 'type', label: 'Type' },
            { field: 'date', label: 'Date' },
            { field: 'images', label: 'Images' },
            { field: 'createdAt', label: 'Créé le' }
        ],
        workshops: [
            { field: 'thumbnail', label: 'Miniature' },
            { field: 'name', label: 'Nom' },
            { field: 'instructor', label: 'Instructeur' },
            { field: 'type', label: 'Type' },
            { field: 'date', label: 'Date' },
            { field: 'price', label: 'Prix' },
            { field: 'capacity', label: 'Capacité' },
            { field: 'images', label: 'Images' }
        ],
        users: [
            { field: 'username', label: 'Nom d\'utilisateur' },
            { field: 'role', label: 'Rôle' },
            { field: 'createdAt', label: 'Créé le' }
        ]
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/${activeTab}`);
            if (response.ok) {
                const result = await response.json();
                setData(Array.isArray(result) ? result : []);
            } else {
                console.log('Erreur lors de la récupération des données, possiblement vides');
                setData([]);
            }
        } catch (error) {
            console.error('Erreur:', error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsCreating(false);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingItem(null);
        setIsCreating(true);
        setIsModalOpen(true);
    };

    const handleSave = async (formData) => {
        try {
            let response;
            if (isCreating) {
                response = await fetch(`/api/${activeTab}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            } else {
                response = await fetch(`/api/${activeTab}/${editingItem._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            }

            if (response.ok) {
                setIsModalOpen(false);
                fetchData();
            } else {
                const error = await response.json();
                alert(`Erreur: ${error.message}`);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la sauvegarde');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
            return;
        }

        try {
            const response = await fetch(`/api/${activeTab}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchData();
            } else {
                const error = await response.json();
                alert(`Erreur: ${error.message}`);
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de la suppression');
        }
    };

    const getTabIcon = (tabId) => {
        const tab = tabs.find(t => t.id === tabId);
        return tab ? tab.icon : '📁';
    };

    const renderContent = () => {
        if (activeTab === 'images') {
            return (
                <ImagesGrid 
                    images={data} 
                    onDelete={() => {}} 
                    onRefresh={fetchData}
                />
            );
        }

        return (
            <>
                {/* Content Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-xl sm:text-2xl">{getTabIcon(activeTab)}</span>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h2>
                        {loading && (
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-indigo-600"></div>
                        )}
                    </div>
                    {/* Hide "Ajouter" button for users tab */}
                    {activeTab !== 'users' && (
                        <button
                            onClick={handleCreate}
                            className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto justify-center"
                        >
                            <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            Ajouter
                        </button>
                    )}
                </div>

                {/* Data Table */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <DataTable
                        data={data}
                        columns={columns[activeTab]}
                        onEdit={activeTab === 'users' ? null : handleEdit}
                        onDelete={activeTab === 'users' ? null : handleDelete}
                        type={activeTab === 'projects' ? 'projet' : activeTab === 'workshops' ? 'workshop' : 'utilisateur'}
                    />
                </div>

                {/* Edit/Create Modal - Only show for non-user tabs */}
                {activeTab !== 'users' && (
                    <EditModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        item={editingItem}
                        onSave={handleSave}
                        type={activeTab.slice(0, -1)} // Remove 's' from end
                    />
                )}
            </>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Administration
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                    Gérez vos projets, workshops, utilisateurs et images
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-6 sm:mb-8">
                <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <span className="text-base sm:text-lg">{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            {renderContent()}
        </div>
    );
};

export default AdminDashboard; 
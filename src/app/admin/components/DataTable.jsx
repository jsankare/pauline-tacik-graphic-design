"use client";

import { useState } from 'react';
import { EditImageIcon, CloseIcon } from '@/app/components/icons';

const DataTable = ({ data, columns, onEdit, onDelete, type }) => {
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortField) return 0;
        
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        if (aVal instanceof Date) aVal = aVal.getTime();
        if (bVal instanceof Date) bVal = bVal.getTime();
        
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const formatValue = (value, field) => {
        // Handle date fields (createdAt, date, etc.)
        if ((field === 'createdAt' || field === 'date' || field === 'updatedAt') && value) {
            try {
                const date = new Date(value);
                if (!isNaN(date.getTime())) {
                    return date.toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                }
            } catch (error) {
                console.error('Error parsing date:', error);
            }
        }
        
        // Handle Date objects (fallback)
        if (value instanceof Date) {
            return value.toLocaleDateString('fr-FR');
        }
        
        if (field === 'thumbnail' && value) {
            return (
                <div className="flex items-center space-x-2">
                    <img 
                        src={value} 
                        alt="Thumbnail" 
                        className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded"
                    />
                    <span className="text-xs text-gray-500 hidden sm:inline">Image</span>
                </div>
            );
        }
        
        if (field === 'images' && Array.isArray(value)) {
            return (
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <div className="flex -space-x-1">
                        {value.slice(0, 2).map((url, index) => (
                            <img 
                                key={index}
                                src={url} 
                                alt={`Image ${index + 1}`} 
                                className="w-4 h-4 sm:w-6 sm:h-6 object-cover rounded border border-white"
                            />
                        ))}
                    </div>
                    {value.length > 2 && (
                        <span className="text-xs text-gray-500 hidden sm:inline">+{value.length - 2}</span>
                    )}
                    <span className="text-xs text-gray-500">({value.length})</span>
                </div>
            );
        }
        
        if (field === 'price' && typeof value === 'number') {
            return `${value}€`;
        }
        if (field === 'duration' && typeof value === 'number') {
            return `${value} min`;
        }
        if (field === 'capacity' && typeof value === 'number') {
            return `${value} pers`;
        }
        if (typeof value === 'string' && value.length > 30) {
            return (
                <span className="hidden sm:inline">
                    {value.substring(0, 30) + '...'}
                </span>
            );
        }
        if (typeof value === 'string' && value.length > 20) {
            return (
                <span className="sm:hidden">
                    {value.substring(0, 20) + '...'}
                </span>
            );
        }
        return value;
    };

    const getResponsiveColumns = () => {
        // On small screens, show fewer columns
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return columns.slice(0, 3); // Show only the first 3 columns on mobile
        }
        return columns;
    };

    // Check if table is read-only (no edit/delete actions)
    const isReadOnly = !onEdit && !onDelete;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                    <tr>
                        {getResponsiveColumns().map((column) => (
                            <th
                                key={column.field}
                                className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort(column.field)}
                            >
                                <div className="flex items-center space-x-1">
                                    <span className="text-xs sm:text-sm">{column.label}</span>
                                    {sortField === column.field && (
                                        <span className="text-gray-400 text-xs">
                                            {sortDirection === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                        {/* Only show the Actions column if not read-only */}
                        {!isReadOnly && (
                            <th className="px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.map((item, index) => (
                        <tr key={item._id || index} className="hover:bg-gray-50">
                            {getResponsiveColumns().map((column) => (
                                <td key={column.field} className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    {formatValue(item[column.field], column.field)}
                                </td>
                            ))}
                            {/* Only show the Actions column if not read-only */}
                            {!isReadOnly && (
                                <td className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                    <div className="flex space-x-1 sm:space-x-2">
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                                                title="Modifier"
                                            >
                                                <EditImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(item._id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                                                title="Supprimer"
                                            >
                                                <CloseIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {sortedData.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
                    Aucun {type} trouvé
                </div>
            )}
        </div>
    );
};

export default DataTable; 
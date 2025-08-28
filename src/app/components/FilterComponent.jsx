"use client";

import { useState, useEffect } from 'react';

const FilterComponent = ({ data, onFilterChange, filterKey = 'type' }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [availableFilters, setAvailableFilters] = useState([]);

    // Extraire les types uniques des données
    useEffect(() => {
        if (data && data.length > 0) {
            const uniqueTypes = [...new Set(data.map(item => item[filterKey]).filter(Boolean))];
            setAvailableFilters(uniqueTypes);
        }
    }, [data, filterKey]);

    const handleFilterToggle = (filter) => {
        setSelectedFilters(prev => {
            if (prev.includes(filter)) {
                return prev.filter(f => f !== filter);
            } else {
                return [...prev, filter];
            }
        });
    };

    // Appliquer les filtres aux données
    useEffect(() => {
        if (selectedFilters.length === 0) {
            onFilterChange(data);
        } else {
            const filtered = data.filter(item => 
                selectedFilters.includes(item[filterKey])
            );
            onFilterChange(filtered);
        }
    }, [selectedFilters, data, filterKey, onFilterChange]);

    if (!data || data.length === 0) return null;

    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {availableFilters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => handleFilterToggle(filter)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedFilters.includes(filter)
                                ? 'bg-primary border border-gray-300 text-white shadow-md'
                                : 'bg-white text-primary border border-primary hover:border-primary hover:text-primary'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterComponent; 
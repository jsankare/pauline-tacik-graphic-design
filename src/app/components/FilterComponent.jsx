"use client";

import { useState, useEffect } from 'react';

const FilterComponent = ({ data, onFilterChange, filterKey = 'type' }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [availableFilters, setAvailableFilters] = useState([]);

    // Extract unique types from data, handling multiple types per item
    useEffect(() => {
        if (data && data.length > 0) {
            const allTypes = [];
            data.forEach(item => {
                if (item[filterKey]) {
                    // Split by comma and trim whitespace to handle multiple types
                    const types = item[filterKey].split(',').map(type => type.trim()).filter(Boolean);
                    allTypes.push(...types);
                }
            });
            const uniqueTypes = [...new Set(allTypes)];
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

    // Apply filters to data, checking if any of the item's types match selected filters
    useEffect(() => {
        if (selectedFilters.length === 0) {
            onFilterChange(data);
        } else {
            const filtered = data.filter(item => {
                if (!item[filterKey]) return false;
                const itemTypes = item[filterKey].split(',').map(type => type.trim());
                return itemTypes.some(type => selectedFilters.includes(type));
            });
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
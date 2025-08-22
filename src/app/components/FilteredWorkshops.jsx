"use client";

import { useState } from 'react';
import TransitionLink from './TransitionLink';
import WorkshopCard from './WorkshopCard';
import FilterComponent from './FilterComponent';

const FilteredWorkshops = ({ workshops }) => {
    const [filteredWorkshops, setFilteredWorkshops] = useState(workshops || []);

    return (
        <>
            <FilterComponent 
                data={workshops || []} 
                onFilterChange={setFilteredWorkshops}
                filterKey="type"
            />
            
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 p-10">
                {filteredWorkshops.map((workshop, id) => {
                    return (
                        <TransitionLink
                            key={workshop._id?.toString() || id}
                            href={`/workshop/${workshop._id?.toString()}`}
                            label={<WorkshopCard workshop={workshop} />}
                        />
                    );
                })}
            </section>
        </>
    );
};

export default FilteredWorkshops; 
"use client";

import { useState } from 'react';
import TransitionLink from './TransitionLink';
import ProjectCard from './ProjectCard';
import FilterComponent from './FilterComponent';

const FilteredProjects = ({ projects }) => {
    const [filteredProjects, setFilteredProjects] = useState(projects || []);

    return (
        <>
            <FilterComponent 
                data={projects || []} 
                onFilterChange={setFilteredProjects}
                filterKey="type"
            />
            
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, id) => {
                    return (
                        <TransitionLink
                            key={project._id?.toString() || id}
                            href={`/project/${project._id?.toString()}`}
                            label={<ProjectCard project={project} />}
                        />
                    );
                })}
            </section>
        </>
    );
};

export default FilteredProjects; 
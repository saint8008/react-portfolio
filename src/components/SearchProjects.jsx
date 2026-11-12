import ProjectCard from "./ProjectCard.jsx";
import { useState } from 'react';

function SearchProjects({ projects }) {
    const [query, setQuery] = useState("");

    const filtered = projects.filter((p) => {
        const q = query.toLowerCase().trim();

        return (
            (p.title ?? "").toLowerCase().includes(q) ||
            (p.description ?? "").toLowerCase().includes(q)

        );
    });
    
    const visible = filtered.slice(0, 3);

    return (
        <div className="flex justify-center px-4 ">
            <div className="w-full max-w-md p-6 border border-slate-300 rounded-md">
                <div className="mb-8">
                    <input
                        type="text"
                        value={query}
                        onChange = {(e) => setQuery(e.target.value)}
                        placeholder="Search Projects" 
                        className = "border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                    />

                    {visible.length === 0 ? (
                        <p className="text-center">No projects found</p>
                    ) : (
                        <div className="grid gap-6 grid-cols-1 sm:grids-cols-2 lg:grid-cols-3">
                            {visible.map ((project) => (
                                <ProjectCard
                                    key={project.id}
                                    image={project.image}
                                    title={project.title}
                                    description={project.description}
                                />
                            ))}
                        </div>
                    )}

                    {filtered.length > 3 && (
                        <p className="text-center text-sm mt-4">Showing 3 of {filtered.length} results</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchProjects
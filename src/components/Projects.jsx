import { useState } from 'react';


function Projects({ onAdd }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        onAdd([{ id: Date.now(), title: title.trim(), description: description.trim() }]);
        setTitle("");
        setDescription("");

    }

    return (
    <div className="flex justify-center px-4 mb-10">
        <div className="w-full max-w-md p-6 border border-slate-300 rounded-md">
            <h3 className="text-lg font-semibold mb-10">Add Project</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="text-sm font-medium">Project Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <label>Description</label>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                />

                <button 
                    className="self-start border border-slate-200 rounded-md w-24 cursor-pointer hover:bg-slate-300 transition "
                >Add</button>
            </form>
        </div>
    </div>

    )
}

export default Projects
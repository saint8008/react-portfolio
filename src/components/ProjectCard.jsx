function ProjectCard({ image, title, description}) {
    return(
        <div className="border border-slate-100 rounded-md overflow-hidden shadow-sm">   
            <img 
                src={image}
                alt={title}       
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}

export default ProjectCard;
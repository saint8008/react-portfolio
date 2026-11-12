import { useState } from 'react'
import Header from "./components/Header.jsx"
import Projects from "./components/Projects.jsx"
import SearchProjects from "./components/SearchProjects.jsx"

const sampleProjects = [
  {id: 1, title: "Weather App", description: "Shows the forecast for any city", image: "https://picsum.photos/400/300?1"},
  { id: 2, title: "Todo List", description: "Simple task manager with filters", image: "https://picsum.photos/400/300?2" },
  { id: 3, title: "Portfolio Site", description: "Personal website built with React", image: "https://picsum.photos/400/300?3" },
  { id: 4, title: "Chat App", description: "Real-time messaging with websockets", image: "https://picsum.photos/400/300?4" },
]

function App() {
  const [projects, setProjects] = useState([]);

  const addProject = (project) => {
    setProjects((prev) => [...prev, project]);
  }

  return (
    <div>
      <Header />
      <Projects onAdd={addProject}/>
      <SearchProjects projects={projects}/>
    </div>
  )
}

export default App;
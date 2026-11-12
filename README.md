A small portfolio site built with React and Tailwind CSS. Visitors can browse projects, search and filter them, and add or delete projects. Everything is saved in the browser's localStorage.

## Components

| File | Job |
| --- | --- |
| `Projects.jsx` | The main component. Holds all state (projects, search, filter, add form) and the page layout. |
| `Header.jsx` | Studio name and the "Add project" button. |
| `SearchProjects.jsx` | Search box and category filter buttons. |
| `ProjectCard.jsx` | One project card with a Delete button. |

## Setup

1. Create a Vite React app and install Tailwind CSS (v4):

   ```bash
   npm create vite@latest portfolio -- --template react
   cd portfolio
   npm install
   npm install tailwindcss @tailwindcss/vite
   ```

2. In `vite.config.js`, add the Tailwind plugin:

   ```js
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({ plugins: [react(), tailwindcss()] });
   ```

3. Replace the contents of `src/index.css` with:

   ```css
   @import "tailwindcss";
   ```

4. Copy the four components into `src/components/`.


5. In `src/main.jsx`, render `Projects` directly:

   ```jsx
   import { StrictMode } from "react";
   import { createRoot } from "react-dom/client";
   import "./index.css";
   import Projects from "./components/Projects";

   createRoot(document.getElementById("root")).render(
     <StrictMode>
       <Projects />
     </StrictMode>
   );
   ```

6. Run it:

   ```bash
   npm run dev
   ```

## How it works

- **Landing page:** `Projects` renders the hero, then a card grid. The grid is 1 column on phones, 2 on tablets and 3 on desktop.
- **Add a project:** the "Add project" button toggles a form. The browser checks the required fields, then the new project goes to the top of the list.
- **Search:** typing filters by title, client, description and category. The category buttons filter at the same time.
- **Saving:** a `useEffect` writes the list to `localStorage` on every change. The first load falls back to the sample projects.

## Customising

- **Categories:** edit the `CATEGORIES` array in `Projects.jsx`.
- **Sample projects:** edit the `SAMPLE` array in `Projects.jsx`.
- **Studio name:** edit `Header.jsx`.
- **Colours:** change the `indigo` and `slate` classes.

## Limitations

Projects live only in the visitor's own browser, so they aren't shared between people or devices. To share one portfolio across a team, replace `loadProjects` and the save `useEffect` in `Projects.jsx` with calls to a backend or database.
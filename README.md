# Profenorma NotesApp Architecture

Decoupled, modular digital reader inspired by interactive textbook platforms (Susaeta-style layout).
Features vector SVG text rendering so notes remain infinitely zoomable without pixelation.

## Architecture & Constraints
- Modularity: strictly < 120 LOC per file
- Functional Utilities: decoupled storage and format helpers
- Infinite Vector Scaling: rendered using SVG primitives

## Folder Structure
profenorma/
+-- README.md
+-- assets/
¦   +-- css/style.css
¦   +-- js/
¦       +-- app.js
¦       +-- utils.js
+-- content/
¦   +-- section-4a/
¦   +-- section-4b/
¦   +-- section-4c/
¦   +-- section-4d/
¦   +-- section-4e/
¦   +-- section-5b/
+-- index.html

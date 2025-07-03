# 🧠 DAG Editor – Nexstem Frontend Intern Assignment

A visual **Pipeline Editor** built using **React, TypeScript, and React Flow** that allows users to create and manage a **Directed Acyclic Graph (DAG)**. This editor simulates real-time data workflows using connected nodes with validation and layout capabilities.

---

## 🌐 Live Demo

🚀 [Click here to try it live](https://dag-editor-alpha.vercel.app/)

🎥 **Screen Recording**:  https://drive.google.com/file/d/1q54ScRET6Ah1u4WZb2FWtB3sLK3Oce5f/view?usp=sharing 

🧩 Notes on Libraries & Decisions
Library	Purpose
React Flow	Enables graph-based UIs with drag-and-drop node/edge handling.
Dagre	Handles automatic layout generation for DAGs (top-down, left-right).
Vite	Fast and modern build tool for React projects.
TypeScript	Enforces type safety and better developer tooling.

Why React Flow?
React Flow was chosen for its simplicity in setting up interactive flow diagrams and built-in features like edge handles, validation hooks, and customization.

Why Dagre?
Dagre was used to automatically calculate node positions in a way that maintains visual clarity, especially when complex graphs are involved.

✨ Features
🔘 Add Nodes via prompt-based input

🔗 Draw Edges between nodes with direction arrows

❌ Delete Nodes/Edges with Delete key

🔄 Auto Layout nodes in a top-down structure

✅ Real-time DAG Validation:

Minimum of 2 nodes

No self-loops

All nodes must be connected

No cyclic paths (DFS-based check)

Valid edge directions only (source → target)

🧾 JSON Preview Panel for debugging the graph structure

⚙️ Challenges Faced
🧠 DAG Validation Logic
Implementing a custom validation function involved:

DFS traversal to detect cycles

Verifying all nodes are connected to at least one edge

Preventing self-connections and incorrect edge directions

Tracking source/target relations accurately

⚔️ React Flow Connection Rules
Preventing invalid edge creation like source-to-source or self-loops using React Flow’s onConnectStart and onConnectEnd hooks.

Restricting connections using Handle types (source and target) and custom validation logic.

🔁 Auto Layout with Dagre
Translating React Flow’s graph structure to Dagre’s format for layout computation.

Adjusting and updating node positions while keeping React Flow state consistent.

Applying fitView() to center the graph after auto layout.

💥 Vercel Build Failures
TypeScript strict mode (verbatimModuleSyntax) caused unused import errors (React, dagre, useMemo).

Fixed by removing unused imports and replacing some imports with import type.

📚 References
React Flow Documentation

Dagre Layout Algorithm

Cycle Detection in Graph (DFS)

Vercel Docs – Deployment Guide

TypeScript Docs

👨‍💻 Developed By
Sai Jagadeesh Tirupathi
🎓 B.Tech CSE, Saveetha School of Engineering
📍 Khammam, Telangana
🔗 GitHub | LinkedIn

📌 Notes
This project was developed as part of the Frontend Intern Assignment for Nexstem and showcases my ability to handle graph visualization, validation logic, UI/UX, and deployment using modern frontend technologies.





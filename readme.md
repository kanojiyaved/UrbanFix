# UrbanFix - Infrastructure Issue Management System

UrbanFix is a comprehensive frontend application designed to streamline the process of reporting, assigning, and resolving civic infrastructure issues, such as potholes. Built with React and Vite, the platform features a highly dynamic, glassmorphism-inspired design.

It provides three distinct portals:
1. **Citizen Portal (Public)**: For users to report issues by uploading photos and automatically capturing their precise GPS location.
2. **Government Dashboard (Protected)**: For city officials to review reported issues and dispatch tasks to specific contractors.
3. **Contractor Portal (Protected)**: For assigned workers to view their tasks, navigate to the site, and upload resolution proof to close out the task.

---

## 🏛️ System Architecture

The current architecture utilizes a mock database running in the browser's `localStorage` to simulate a full end-to-end flow without requiring a backend server.

```mermaid
graph TD
    Client["Client Browser"]
    
    subgraph Frontend["React Frontend Application"]
        App["App Entry Point"]
        Router["React Router"]
        Auth["AuthContext (State Management)"]
        
        Router --> Pages["Application Views"]
        
        Pages --> Citizen["Citizen Reporting View"]
        Pages --> Gov["Government Dashboard (Protected)"]
        Pages --> Contractor["Contractor Dashboard (Protected)"]
    end
    
    subgraph DataLayer["Data Persistence"]
        MockService["Mock DB Service"]
        Storage["Browser localStorage"]
    end
    
    Client --> App
    App --> Auth
    App --> Router
    
    Citizen --> MockService
    Gov --> MockService
    Contractor --> MockService
    
    MockService --> Storage
```

---

## 🔄 User Workflow

The application supports a complete lifecycle from the moment a pothole is spotted to the moment it is repaired and verified.

```mermaid
sequenceDiagram
    actor C as Citizen
    participant DB as UrbanFix System
    actor G as Government Official
    actor K as Assigned Contractor
    
    C->>DB: "1. Uploads photo & captures GPS location"
    DB-->>C: "Confirms report submission"
    
    DB->>G: "2. New report appears in Gov Dashboard"
    G->>DB: "3. Reviews report & assigns to Contractor"
    
    DB->>K: "4. Assigned task appears in Contractor Portal"
    K->>DB: "5. Fixes issue, uploads 'After' photo & verifies GPS"
    
    DB->>G: "6. Updates task status to 'Resolved'"
```

---

## 📁 Project Structure

The project has been organized into a dedicated `frontend` directory to support future full-stack expansion.

```mermaid
graph TD
    Root["UrbanFix Root"] --> Frontend["frontend/"]
    Root --> Readme["readme.md"]
    
    Frontend --> Src["src/"]
    Frontend --> Config["Configuration (package.json, vite.config.js)"]
    
    Src --> App["App.jsx (Routing & Providers)"]
    Src --> Css["index.css (Design System & Theme)"]
    
    Src --> Components["components/"]
    Components --> Navbar["Navbar.jsx"]
    
    Src --> Context["context/"]
    Context --> Auth["AuthContext.jsx"]
    
    Src --> Pages["pages/"]
    Pages --> Home["Home.jsx"]
    Pages --> Citizen["CitizenReport.jsx"]
    Pages --> Gov["GovDashboard.jsx"]
    Pages --> Contractor["ContractorDashboard.jsx"]
    Pages --> Login["Login.jsx"]
    
    Src --> Services["services/"]
    Services --> DB["mockDb.js"]
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine.

### Installation & Execution

1. Open your terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Default Mock Logins
To test the protected portals, use the Login page. 
- **Government Official**: Select the "Government Official" role.
- **Contractor**: Select the "Contractor" role.
- *(No password required for this demo phase).*

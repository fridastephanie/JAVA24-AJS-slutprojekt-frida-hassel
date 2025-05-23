# 📋 Scrumboard App
This project is primarily created as a learning experience to practice modern JavaScript development with React, manage state and routing, work with Firebase, and use a bundler (Parcel) for building and serving the app.  
As a bonus, it provides an efficient and interactive tool for team collaboration using the Scrum model, with real-time updates and user-specific statistics.

## ✨ Features
- Firebase Authentication (including Google Sign-In)
- Create and manage personal Scrumboards
- Add team members by category: **UX**, **Frontend**, **Backend**
- Create tasks with category
  - Tasks start as `New`
  - Assignable to members with matching category → becomes `In Progress`
  - Can be marked as `Finished`, then deleted permanently
- Task Filtering
  - By category (UX, Frontend, Backend)
  - By specific team member
- Task Sorting
  - `Created (new – old)`, `Created (old – new)`, `Title (A – Z)`, `Title (Z – A)`
- Dashboard Statistics:
  - Number of scrumboards
  - Number of tasks in each status: New, In Progress, Finished
- Ability to delete entire Scrumboards
- Error handling via modal with clear messages

## 📁 Project Structure Overview
This project is structured to clearly separate concerns and enhance maintainability

### Page Naming Convention & Routing
- The **start page** (at `/`) is referred to as `Start` throughout the project. It is the first page unauthenticated users see
- After login, users are redirected to the **home page** (`/home`), called `Home` in the project structure
- Each individual **scrumboard** has its own page, named `Scrumboard` in the project structure, accessible at `/scrumboard/:id`
- The application includes a **NotFound** page that handles all undefined routes. If a user navigates to a non-existent path:
  - **Authenticated users** are provided with an option to return to the `/home` page
  - **Unauthenticated users** are offered a link back to the start page (`/`)

### Folders
- **`assets/`**  
  Contains static assets such as images used in the project
- **`components/`**  
  Reusable React components shared across the app — like `Header`, `Modal`, and `ErrorModal`
- **`context/`**  
  Global state management:
  - `AuthContext` handles Firebase authentication
  - `ErrorContext` manages error state and displays error modals
- **`css/`**  
  Centralized styling in a single CSS file, organized by page sections
- **`database/`**  
  Includes Firebase setup (`firebaseConfig`), references, and service files for API calls related to `user`, `scrumboard`, `task`, and `member`
- **`features/`**  
  Page-specific components grouped into:
  - `start/`
  - `home/`
  - `scrumboard/` (includes nested `task/` and `member/` folders)  
  Each of these has its own `components/` and `hooks/` subfolders
- **`pages/`**  
  Top-level page components: `Start`, `Home`, `Scrumboard`, and `NotFound`
  Also includes a `hooks/` folder with `useDocumentTitle`, which ensures the correct document title is displayed based on the current page
- **`routes/`**  
  Contains `PrivateRoute`, used to protect routes and ensure only authenticated users can access certain pages

### Root Files
- **`App.jsx`**  
  Sets up the overall application structure, including routing and global providers like authentication and error handling
- **`index.jsx`**  
  Renders the React app into the root HTML div and wraps it with global context providers
- **`index.html`**  
  A basic HTML shell with a root `<div>`.  
  Includes a `<script>` that appends `#/` to the URL if it's missing — this helps ensure proper routing with HashRouter on GitHub Pages

## 🚀 Getting Started
### 1. Clone the project
- Run this in your terminal:
`git clone https://github.com/fridastephanie/JAVA24-AJS-slutprojekt-frida-hassel.git`
- Then navigate to the project folder:
`cd JAVA24-AJS-slutprojekt-frida-hassel`

### 2. Install dependencies
Run:
`npm install`

### 3. Start the development server
Run:
`npm run dev`
Parcel will launch the app in your browser automatically

## 🛠 Built With
- React (with hooks)
- Firebase (Realtime DB + Auth)
- React Router DOM
- Parcel as bundler
- Modular code structure (with separated hooks, components, and context)
- Custom error handling with global modal

## 🔧 Versions
- React v19.1.0
- React Router DOM v6.10.0
- Firebase v11.7.3 (Realtime Database + Authentication)
- Parcel bundler v2.14.4
- React Firebase Hooks v5.1.1

## 🔐 Notes
- Requires a Firebase project configuration (firebaseConfig)
- All boards, members, and tasks are stored in Firebase Realtime Database
- Only logged-in users can create and manage content

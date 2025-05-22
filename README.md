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

## 🔧 Technologies
- React v19.1.0
- React Router DOM v6.10.0
- Firebase v11.7.3 (Realtime Database + Authentication)
- Parcel bundler
- React Firebase Hooks v5.1.1

## 🚀 Getting Started
### 1. Clone the project
Run this in your terminal:
`git clone https://github.com/fridastephanie/JAVA24-AJS-slutprojekt-frida-hassel.git`

Then navigate to the project folder:
`cd JAVA24-AJS-slutprojekt-frida-hassel`

### 2. Install dependencies
Run:
`npm install`

### 3. Start the development server
Run:
`npm run dev`
Parcel will launch the app in your browser automatically.

## 🛠 Built With
- React (with hooks)
- Firebase (Realtime DB + Auth)
- React Router DOM
- Parcel as bundler
- Modular code structure (with separated hooks, components, and context)
- Custom error handling with global modal

## 🔐 Notes
- Requires a Firebase project configuration (firebaseConfig)
- All boards, members, and tasks are stored in Firebase Realtime Database
- Only logged-in users can create and manage content

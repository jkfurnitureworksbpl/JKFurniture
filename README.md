# JK Furniture

A modern React furniture showcase with Express.js backend and Supabase integration.

## Description

This project is a comprehensive furniture e-commerce platform featuring a React frontend with dynamic navigation, interactive contact forms, and a robust Express.js backend with Supabase integration. The application provides a seamless user experience for browsing furniture catalogs, with responsive design and smooth animations.

## How to Run

1. **Install dependencies:**
```bash
cd client && npm install
cd ../server && npm install
```

2. **Set up environment variables in `server/.env`:**
```bash
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
PORT=5000
```

3. **Run the application:**
```bash
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend  
cd client && npm start
```

Visit `http://localhost:3000`

## How to Test

```bash
# Backend tests
cd server && npm test

# Frontend tests (if available)
cd client && npm test
```

## Features

- **5 Pages**: Animation, Home, Catalog, About, Contact
- **Dynamic Navigation**: Supabase-powered dropdown menu
- **Interactive Contact**: Form with phone, email, WhatsApp, and map integration
- **Responsive Design**: Works on all devices
- **Smooth Animations**: CSS transitions and loading effects

## Tech Stack

**Frontend:** React 18, React Router, CSS3  
**Backend:** Express.js, Supabase  
**Tools:** Node.js, Nodemon

## Pages

- **Animation** (`/`) - Loading screen with progress bar
- **Home** (`/home`) - Hero section with call-to-action
- **Catalog** (`/catalog`) - Furniture catalog (coming soon)
- **About** (`/about`) - Company story and team
- **Contact** (`/contact`) - Form with phone, email, WhatsApp, map

## API

- `GET /api/hover-tabs` - Navigation data from Supabase
- `GET /health` - Server health check

## License

This project is open source and available under the MIT License.


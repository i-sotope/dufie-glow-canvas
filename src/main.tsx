import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Removed Leaflet CSS import
// import '../node_modules/leaflet/dist/leaflet.css'; // Remove relative path attempt

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

import React from 'react';
import { Menu, Leaf } from 'lucide-react';
import '../styles/components.css';

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="navbar-mobile">
      <div className="navbar-brand">
        <img src="/logo.png" alt="EcoQuest Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
        <span>EcoQuest</span>
      </div>

      <button className="menu-btn" onClick={onToggleSidebar} aria-label="Toggle Sidebar Menu">
        <Menu size={24} />
      </button>
    </header>
  );
}

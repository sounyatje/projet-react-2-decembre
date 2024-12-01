import React from 'react';
import { HomeIcon, UserGroupIcon, FolderIcon, CalendarIcon, DocumentIcon, ChartBarIcon } from '@heroicons/react/outline';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white flex flex-col items-start p-6">
        <div className="text-2xl font-bold mb-6">Mon Dashboard</div>
        <ul className="space-y-4">
          <li className="flex items-center space-x-2 hover:bg-blue-600 px-3 py-2 rounded-lg">
            <HomeIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </li>
          {/* Autres éléments de navigation */}
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-grow p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          <input
            type="text"
            placeholder="Recherche..."
            className="w-1/3 p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="bg-white h-full rounded-lg shadow-lg p-8">
          <p>Bienvenue sur votre tableau de bord.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

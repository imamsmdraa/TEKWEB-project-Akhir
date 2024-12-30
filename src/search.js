import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import './App.css';

function search() {
  const [searchTerm, setSearchTerm] = useState('');

  // Daftar item untuk ditampilkan
  const items = [
    'React',
    'Tailwind CSS',
    'JavaScript',
    'HTML',
    'CSS',
    'Node.js',
    'Express',
    'MongoDB',
  ];

  // Filter item berdasarkan kata kunci pencarian
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search">
      <Navbar onSearch={setSearchTerm} />
      <main className="container mx-auto mt-6 p-4">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {filteredItems.length > 0 ? (
          <ul className="list-disc ml-6">
            {filteredItems.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No results found.</p>
        )}
      </main>
    </div>
  );
}

export default search;

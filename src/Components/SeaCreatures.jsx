import React, { useState } from 'react';
import seaCreaturesData from '../data/seaCreatures.json';

// Komponen utama yang mengelola state dan mengatur logika untuk menampilkan daftar makhluk laut, modal, dan checklist
const SeaCreatures = () => {
  const [creatures, setCreatures] = useState(seaCreaturesData); // State untuk daftar makhluk laut
  const [selectedInfo, setSelectedInfo] = useState(null); // State untuk informasi makhluk laut yang dipilih
  const [editMode, setEditMode] = useState(false); // State untuk mode edit

  // Fungsi untuk menangani klik pada gambar makhluk laut
const handleImageClick = (info) => {
  const modalPosition = { top: info.top, left: info.left };
  setSelectedInfo({ ...info, ...modalPosition });
};


  // Fungsi untuk menyimpan perubahan makhluk laut
  const handleSave = () => {
    setCreatures((prev) =>
      prev.map((creature) =>
        creature.id === selectedInfo.id ? selectedInfo : creature
      )
    );
    resetSelection();
  };

  // Fungsi untuk mengaktifkan mode edit
  const handleEdit = () => setEditMode(true);

  // Fungsi untuk mengubah status checklist makhluk laut
  const handleCheckboxChange = (id) => {
    setCreatures((prev) =>
      prev.map((creature) =>
        creature.id === id ? { ...creature, read: !creature.read } : creature
      )
    );
  };

  // Fungsi untuk menghapus makhluk laut dari daftar
  const handleDelete = (id) => {
    setCreatures((prev) => prev.filter((creature) => creature.id !== id));
    resetSelection();
  };

  // Fungsi untuk menangani perubahan input dalam mode edit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk mereset pilihan yang sedang aktif
  const resetSelection = () => {
    setSelectedInfo(null);
    setEditMode(false);
  };

  return (
    <div className="relative">
      {creatures.map((creature) => (
        <CreatureCard
          key={creature.id}
          creature={creature}
          onClick={() => handleImageClick(creature)}
        />
      ))}

      {selectedInfo && (
        <CreatureModal
          info={selectedInfo}
          editMode={editMode}
          onClose={resetSelection}
          onSave={handleSave}
          onEdit={handleEdit}
          onDelete={() => handleDelete(selectedInfo.id)}
          onChange={handleChange}
        />
      )}

      <Checklist creatures={creatures} onCheckboxChange={handleCheckboxChange} />
    </div>
  );
};

// Komponen untuk menampilkan kartu makhluk laut
const CreatureCard = ({ creature, onClick }) => (
  <div
    className="absolute cursor-pointer"
    style={{ top: creature.top, left: creature.left }}
    onClick={onClick}
  >
    <div className="text-white text-sm mb-2">{creature.title.toUpperCase()}</div>
    <img
      src={require(`../assets/img/${creature.image}`)}
      alt={creature.title}
      style={{width: creature.width}}
/>
  </div>
);

// Komponen modal untuk menampilkan atau mengedit detail makhluk laut
const CreatureModal = ({
  info,
  editMode,
  onClose,
  onSave,
  onEdit,
  onDelete,
  onChange,
}) => (
  <div
    className="absolute bg-black bg-opacity-40 text-white p-4 rounded-md max-w-lg"
    style={{
      top: info.top,
      left: info.left,
      transform: 'translate(-10%, -50%)', 
      position: 'absolute',
    }}
  >
    <button
      onClick={onClose}
      className="absolute top-0 right-0 text-xl font-bold text-white p-2"
      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
    >
      ×
    </button>
    {editMode ? (
      // Mode edit: menampilkan input untuk judul dan deskripsi
      <>
        <input
          type="text"
          name="title"
          value={info.title}
          onChange={onChange}
          className="w-full mb-2 p-2 rounded-md text-black"
        />
        <textarea
          name="description"
          value={info.description}
          onChange={onChange}
          className="w-full mb-2 p-2 rounded-md text-black"
        />
        <button
          onClick={onSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Save
        </button>
      </>
    ) : (
      // Mode tampilan: menampilkan judul dan deskripsi
      <>
        <h3 className="text-xl font-bold mb-2">{info.title}</h3>
        <p className="mb-4">{info.description}</p>
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </>
    )}
  </div>
);


// Komponen untuk menampilkan checklist makhluk laut
const Checklist = ({ creatures, onCheckboxChange }) => (
  <div className="border-2 border-blue-600 p-4 fixed bottom-0 left-0 bg-transparent text-white rounded-t-lg shadow-md max-w-md w-full backdrop-blur">
    <h3 className="font-bold text-lg mb-2">Checklist Informasi</h3>
    <ul className="overflow-y-auto max-h-40 space-y-2">
      {creatures.map((creature) => (
        <li
          key={creature.id}
          className="flex items-center text-sm"
          style={{
            fontSize: '16px',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0, 128, 255, 0.5)',
          }}
        >
          <input
            type="checkbox"
            checked={creature.read}
            onChange={() => onCheckboxChange(creature.id)}
            className="mr-2"
          />
          {creature.title}
        </li>
      ))}
    </ul>
  </div>
);

export default SeaCreatures;

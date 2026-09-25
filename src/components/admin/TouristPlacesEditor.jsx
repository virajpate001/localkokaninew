// src/components/admin/TouristPlacesEditor.jsx
"use client";

import { FiPlus, FiTrash2, FiMapPin } from "react-icons/fi";
import { CATEGORY_OPTIONS } from "@/lib/touristPlaceCategories";
import ImageUploader from "./ImageUploader";

export default function TouristPlacesEditor({ value = [], onChange }) {
  const addPlace = () => {
    onChange([...value, { name: "", category: CATEGORY_OPTIONS[0], description: "", image: null }]);
  };

  const updatePlace = (index, field, fieldValue) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: fieldValue };
    onChange(updated);
  };    
  const removePlace = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const movePlace = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= value.length) return;
    const updated = [...value];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-1.5">
            <FiMapPin className="text-secondary" /> Tourist Places
          </label>
          <p className="text-gray-400 text-xs mt-0.5">Shown on the destination page, grouped and filterable by category</p>
        </div>
        <button
          type="button"
          onClick={addPlace}
          className="flex items-center gap-1.5 text-secondary text-sm font-medium hover:underline shrink-0"
        >
          <FiPlus /> Add Place
        </button>
      </div>

      {value.length === 0 ? (
        <p className="text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl p-5 text-center">
          No tourist places added yet
        </p>
      ) : (
        <div className="space-y-3">
          {value.map((place, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase">Place {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => movePlace(index, -1)} disabled={index === 0} className="text-gray-400 hover:text-primary disabled:opacity-30 text-xs px-1.5">↑</button>
                  <button type="button" onClick={() => movePlace(index, 1)} disabled={index === value.length - 1} className="text-gray-400 hover:text-primary disabled:opacity-30 text-xs px-1.5">↓</button>
                  <button type="button" onClick={() => removePlace(index)} className="text-gray-400 hover:text-red-500 ml-1"><FiTrash2 className="text-sm" /></button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-3">
                <input
                  type="text"
                  value={place.name}
                  onChange={(e) => updatePlace(index, "name", e.target.value)}
                  placeholder="e.g. Diveagar Beach"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary text-sm outline-none"
                />
                <select
                  value={place.category}
                  onChange={(e) => updatePlace(index, "category", e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary text-sm outline-none bg-white"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <textarea
                value={place.description}
                onChange={(e) => updatePlace(index, "description", e.target.value)}
                placeholder="Short description (optional)"
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary text-sm outline-none resize-none"
              />

              <ImageUploader
                value={place.image}
                onChange={(img) => updatePlace(index, "image", img)}
                folder="tourist-places"
                label="Photo (optional)"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
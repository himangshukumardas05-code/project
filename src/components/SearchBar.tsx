import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

export default function SearchBar({ value, onChange, onCategoryChange, selectedCategory }: SearchBarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for places or tech topics..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors shadow-sm"
        />
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
              : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => onCategoryChange('places')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            selectedCategory === 'places'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
              : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
          }`}
        >
          Places
        </button>
        <button
          onClick={() => onCategoryChange('tech')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            selectedCategory === 'tech'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
              : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'
          }`}
        >
          Tech
        </button>
      </div>
    </div>
  );
}

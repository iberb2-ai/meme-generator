'use client';

export default function MediaTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => setActiveTab('image')}
        className={`flex-1 py-3 px-4 rounded-lg font-bold transition ${
          activeTab === 'image'
            ? 'bg-purple-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        🖼️ Image Meme
      </button>
      <button
        onClick={() => setActiveTab('video')}
        className={`flex-1 py-3 px-4 rounded-lg font-bold transition ${
          activeTab === 'video'
            ? 'bg-purple-500 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        🎬 Video Meme
      </button>
    </div>
  );
}

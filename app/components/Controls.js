'use client';

export default function Controls({
  topText,
  setTopText,
  bottomText,
  setBottomText,
  onImageUpload,
  onVideoUpload,
  templates,
  selectedTemplate,
  setSelectedTemplate,
  setUploadedImage,
  activeTab,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Your Meme</h2>
      </div>

      {/* Text Inputs */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Top Text</label>
        <input
          type="text"
          value={topText}
          onChange={(e) => setTopText(e.target.value.toUpperCase())}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          placeholder="Enter top text"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Bottom Text</label>
        <input
          type="text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value.toUpperCase())}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          placeholder="Enter bottom text"
        />
      </div>

      {/* Image Meme Controls */}
      {activeTab === 'image' && (
        <>
          {/* Templates */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Templates</label>
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setUploadedImage(null);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition ${
                    selectedTemplate.id === template.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {template.name}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Custom Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 cursor-pointer"
            />
          </div>
        </>
      )}

      {/* Video Meme Controls */}
      {activeTab === 'video' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={onVideoUpload}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">Supported: MP4, WebM, MOV (Max 100MB)</p>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-gray-700">
          💡 <strong>Tip:</strong> {activeTab === 'image' ? 'Upload your own image or choose from templates!' : 'Upload a video and add text overlays!'}
        </p>
      </div>
    </div>
  );
}

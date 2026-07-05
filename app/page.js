'use client';

import { useRef, useState } from 'react';
import MemeCanvas from './components/MemeCanvas';
import Controls from './components/Controls';

const MEME_TEMPLATES = [
  { id: 1, name: 'Drake', url: 'https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg' },
  { id: 2, name: 'Loss', url: 'https://imgflip.com/s/meme/Distracted-Boyfriend.jpg' },
  { id: 3, name: 'Woman Yelling at Cat', url: 'https://imgflip.com/s/meme/Woman-Yelling-at-Cat.jpg' },
  { id: 4, name: 'This is Fine', url: 'https://imgflip.com/s/meme/This-Is-Fine.jpg' },
];

export default function Home() {
  const canvasRef = useRef(null);
  const [topText, setTopText] = useState('Top Text');
  const [bottomText, setBottomText] = useState('Bottom Text');
  const [selectedTemplate, setSelectedTemplate] = useState(MEME_TEMPLATES[0]);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadMeme = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL();
      link.download = 'meme.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-2">😂 Meme Generator</h1>
        <p className="text-center text-white text-lg mb-8">Create hilarious memes in seconds!</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <MemeCanvas
              ref={canvasRef}
              imageUrl={uploadedImage || selectedTemplate.url}
              topText={topText}
              bottomText={bottomText}
            />
            <button
              onClick={downloadMeme}
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              📥 Download Meme
            </button>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Controls
              topText={topText}
              setTopText={setTopText}
              bottomText={bottomText}
              setBottomText={setBottomText}
              onImageUpload={handleImageUpload}
              templates={MEME_TEMPLATES}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              setUploadedImage={setUploadedImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

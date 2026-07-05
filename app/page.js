'use client';

import { useRef, useState } from 'react';
import MemeCanvas from './components/MemeCanvas';
import VideoMemeCanvas from './components/VideoMemeCanvas';
import Controls from './components/Controls';
import MediaTabs from './components/MediaTabs';
import VideoProcessor from './components/VideoProcessor';

const MEME_TEMPLATES = [
  { id: 1, name: 'Drake', url: 'https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg' },
  { id: 2, name: 'Loss', url: 'https://imgflip.com/s/meme/Distracted-Boyfriend.jpg' },
  { id: 3, name: 'Woman Yelling at Cat', url: 'https://imgflip.com/s/meme/Woman-Yelling-at-Cat.jpg' },
  { id: 4, name: 'This is Fine', url: 'https://imgflip.com/s/meme/This-Is-Fine.jpg' },
];

export default function Home() {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('image');
  const [topText, setTopText] = useState('Top Text');
  const [bottomText, setBottomText] = useState('Bottom Text');
  const [selectedTemplate, setSelectedTemplate] = useState(MEME_TEMPLATES[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState(null);

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

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedVideo(event.target.result);
        setProcessedVideoUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImageMeme = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.href = canvasRef.current.toDataURL();
      link.download = 'meme.png';
      link.click();
    }
  };

  const downloadVideoMeme = () => {
    if (processedVideoUrl) {
      const link = document.createElement('a');
      link.href = processedVideoUrl;
      link.download = 'meme-video.mp4';
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-2">😂 Meme Generator</h1>
        <p className="text-center text-white text-lg mb-8">Create hilarious image & video memes!</p>

        <MediaTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas/Preview */}
          <div className="lg:col-span-2">
            {activeTab === 'image' ? (
              <>
                <MemeCanvas
                  ref={canvasRef}
                  imageUrl={uploadedImage || selectedTemplate.url}
                  topText={topText}
                  bottomText={bottomText}
                />
                <button
                  onClick={downloadImageMeme}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  📥 Download Image Meme
                </button>
              </>
            ) : (
              <>
                {uploadedVideo ? (
                  <>
                    <VideoMemeCanvas
                      videoUrl={uploadedVideo}
                      topText={topText}
                      bottomText={bottomText}
                    />
                    <VideoProcessor
                      videoUrl={uploadedVideo}
                      topText={topText}
                      bottomText={bottomText}
                      onDownload={setProcessedVideoUrl}
                    />
                    {processedVideoUrl && (
                      <button
                        onClick={downloadVideoMeme}
                        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
                      >
                        📥 Download Video Meme
                      </button>
                    )}
                  </>
                ) : (
                  <div className="bg-gray-300 rounded-lg shadow-lg p-8 text-center">
                    <p className="text-gray-700 text-lg">📹 Upload a video to get started</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Controls
              topText={topText}
              setTopText={setTopText}
              bottomText={bottomText}
              setBottomText={setBottomText}
              onImageUpload={handleImageUpload}
              onVideoUpload={handleVideoUpload}
              templates={MEME_TEMPLATES}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              setUploadedImage={setUploadedImage}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

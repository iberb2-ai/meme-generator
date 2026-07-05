'use client';

import { useEffect, useRef, useState } from 'react';

const VideoMemeCanvas = ({ videoUrl, topText, bottomText, onProcessing }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  const drawFrame = (video, canvas, topText, bottomText) => {
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw text
    const fontSize = Math.floor(canvas.width / 15);
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';

    // Top text
    ctx.strokeText(topText, canvas.width / 2, fontSize + 20);
    ctx.fillText(topText, canvas.width / 2, fontSize + 20);

    // Bottom text
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      drawFrame(video, canvas, topText, bottomText);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener('play', captureFrame);
      video.addEventListener('timeupdate', captureFrame);

      return () => {
        video.removeEventListener('play', captureFrame);
        video.removeEventListener('timeupdate', captureFrame);
      };
    }
  }, [topText, bottomText]);

  return (
    <div className="space-y-4">
      <div className="bg-black rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          controls
          className="w-full"
          style={{ display: 'none' }}
        />
        <canvas
          ref={canvasRef}
          className="w-full"
        />
      </div>
      <p className="text-sm text-gray-600 text-center">
        💡 Video preview with text overlay
      </p>
    </div>
  );
};

export default VideoMemeCanvas;

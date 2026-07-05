'use client';

import { useRef, useState } from 'react';

const VideoProcessor = ({ videoUrl, topText, bottomText, onDownload }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const processVideo = async () => {
    if (!videoUrl) {
      setError('Please upload a video first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // Import FFmpeg
      const { FFmpeg, toBlobURL } = await import('ffmpeg.wasm');
      const ffmpeg = new FFmpeg();

      const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      // Fetch video
      setProgress(10);
      const response = await fetch(videoUrl);
      const arrayBuffer = await response.arrayBuffer();
      ffmpeg.writeFile('input.mp4', new Uint8Array(arrayBuffer));

      setProgress(30);

      // Create filter for text overlay
      const fontSize = 60;
      const filterComplex = `drawtext=text='${topText.toUpperCase()}':fontsize=${fontSize}:fontcolor=white:x=(w-text_w)/2:y=20:borderw=3:bordercolor=black,drawtext=text='${bottomText.toUpperCase()}':fontsize=${fontSize}:fontcolor=white:x=(w-text_w)/2:y=h-${fontSize + 20}:borderw=3:bordercolor=black`;

      // Execute FFmpeg command
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-vf', filterComplex,
        '-c:a', 'aac',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-crf', '28',
        'output.mp4'
      ]);

      setProgress(80);

      // Get output
      const data = ffmpeg.readFile('output.mp4');
      const blob = new Blob([data.buffer], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);

      setProgress(100);
      onDownload(url);

    } catch (err) {
      console.error('Video processing error:', err);
      setError(`Error processing video: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={processVideo}
        disabled={isProcessing}
        className={`w-full font-bold py-3 px-6 rounded-lg transition text-white ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isProcessing ? `⏳ Processing ${progress}%` : '🎬 Process Video'}
      </button>

      {isProcessing && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-700">❌ {error}</p>
        </div>
      )}
    </div>
  );
};

export default VideoProcessor;

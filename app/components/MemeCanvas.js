'use client';

import { useEffect, useRef, forwardRef } from 'react';

const MemeCanvas = forwardRef(({ imageUrl, topText, bottomText }, ref) => {
  const internalRef = useRef(null);

  useEffect(() => {
    if (internalRef.current && imageUrl) {
      const canvas = internalRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        canvas.width = 600;
        canvas.height = 600;
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        // Draw text
        const fontSize = 40;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';

        // Top text
        ctx.strokeText(topText, canvas.width / 2, 50);
        ctx.fillText(topText, canvas.width / 2, 50);

        // Bottom text
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
      };

      img.src = imageUrl;
    }
  }, [imageUrl, topText, bottomText]);

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-lg">
      <canvas
        ref={(el) => {
          internalRef.current = el;
          if (ref) ref.current = el;
        }}
        className="w-full"
      />
    </div>
  );
});

MemeCanvas.displayName = 'MemeCanvas';

export default MemeCanvas;

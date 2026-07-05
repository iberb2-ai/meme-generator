# 😂 Meme Generator

A fun, easy-to-use meme generator built with Next.js, React, and Tailwind CSS. Create both **image and video memes** with custom text overlays!

## Features

✨ **Image Memes:**
- 📸 Pre-made meme templates
- 🖼️ Upload your own images
- ✏️ Add custom top and bottom text
- 📥 Download as PNG

🎬 **Video Memes:**
- 🎥 Upload MP4/WebM videos
- ✏️ Add text overlays to videos
- 👀 Real-time preview
- 📥 Download as MP4
- ⚡ Browser-based processing (no server needed)

🌟 **General Features:**
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🎨 Beautiful gradient UI
- 🔧 No backend required

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iberb2-ai/meme-generator.git
cd meme-generator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

## Usage

### Creating Image Memes

1. Go to **Image Meme** tab
2. Choose a template or upload your own image
3. Add text in the top and bottom fields
4. Preview your meme in real-time
5. Click **Download Image Meme**

### Creating Video Memes

1. Go to **Video Meme** tab
2. Upload your video (MP4, WebM, or MOV)
3. Add text overlays
4. Click **Process Video** to render with FFmpeg
5. Watch the progress bar
6. Click **Download Video Meme** when done

## Project Structure

```
meme-generator/
├── app/
│   ├── components/
│   │   ├── MemeCanvas.js          # Canvas drawing for images
│   │   ├── VideoMemeCanvas.js     # Video preview with overlay
│   │   ├── VideoProcessor.js      # FFmpeg video processing
│   │   ├── Controls.js            # Control panel
│   │   └── MediaTabs.js           # Tab switcher
│   ├── globals.css                # Global styles
│   ├── layout.js                  # Root layout
│   └── page.js                    # Main page
├── public/                        # Static files
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind configuration
└── README.md                      # This file
```

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Canvas API** - Image manipulation
- **FFmpeg.wasm** - Browser-based video processing

## Video Processing Details

The video meme generator uses **FFmpeg.wasm**, which runs entirely in the browser:

- ✅ No server uploads needed
- ✅ Your videos stay on your device
- ✅ Processing happens locally
- ✅ Free and open-source

**Note:** First load may take time as FFmpeg is downloaded (~30MB)

## Future Enhancements

- [ ] More meme templates
- [ ] Font selection
- [ ] Text color customization
- [ ] Sticker library
- [ ] Meme sharing to social media
- [ ] Save meme history
- [ ] Dark mode
- [ ] Video filters
- [ ] Audio extraction

## Troubleshooting

**Video processing is slow:**
- FFmpeg.wasm processes on your CPU - larger videos take longer
- Try shorter videos or lower resolution

**"Module not found" error:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**CORS issues:**
- Make sure videos are uploaded locally, not from external URLs

## Contributing

Feel free to fork this project and submit pull requests with improvements!

## License

MIT License - feel free to use this project for personal or commercial use.

## Support

Having issues? Open an issue on GitHub or reach out!

---

**Made with ❤️ by iberb2-ai**

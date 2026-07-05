import './globals.css';

export const metadata = {
  title: 'Meme Generator',
  description: 'Create funny memes with ease!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen">
        {children}
      </body>
    </html>
  );
}

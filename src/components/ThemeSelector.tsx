import { useEffect } from 'react';

const themes = [
  { name: 'yellow', color: 'bg-yellow-300' },
  { name: 'blue', color: 'bg-blue-400' },
  { name: 'green', color: 'bg-green-400' },
  { name: 'purple', color: 'bg-purple-400' },
  { name: 'pink', color: 'bg-pink-400' },
  { name: 'orange', color: 'bg-orange-400' }
];

export default function ThemeSelector() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'yellow';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full">
      {themes.map((theme) => (
        <button
          key={theme.name}
          onClick={() => setTheme(theme.name)}
          className={`theme-selector ${theme.color} ${
            document.documentElement.getAttribute('data-theme') === theme.name ? 'active' : ''
          }`}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </div>
  );
}
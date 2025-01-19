import { useState, useEffect } from 'react';
import App from './App';

const Theme = () => {
  const [theme, setTheme] = useState<string>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <button onClick={toggleTheme} style={{ position: 'absolute', top: '20px', right: '20px' }}>
        Toggle {theme==='light' ? 'Dark' : 'Light'} Mode
      </button>
      <App theme={theme}/>
    </>
  );
};

export default Theme;

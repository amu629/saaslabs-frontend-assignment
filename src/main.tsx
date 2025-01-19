import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your global styles (including dark mode styles)
import Theme from './Theme'; // Import the Root component

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme />
  </StrictMode>
);

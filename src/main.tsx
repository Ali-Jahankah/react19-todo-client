import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className="body_container">
        <Header />
        <main className="main">
          <App />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
);

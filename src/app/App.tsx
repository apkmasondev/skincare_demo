import React from 'react';
import { SkincareExperience } from '../components/SkincareExperience';
import '../styles/globals.css';
import '../styles/experience.css';

export const App: React.FC = () => {
  return (
    <main className="apkmason-app">
      <SkincareExperience />
    </main>
  );
};

export default App;

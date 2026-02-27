/**
 * @fileoverview Main application component.
 * Entry point for the interactive 3D globe CV.
 */

import { GlobeCanvas } from './components';
import './App.css';

/**
 * Root application component.
 * 
 * The app consists of:
 * - A full-screen 3D globe visualization
 * - Interactive journey markers
 * - Navigation controls
 * - Milestone detail cards
 * 
 * Customize your journey by editing `src/data/journey.ts`
 */
function App() {
  return (
    <main className="app">
      <GlobeCanvas />
    </main>
  );
}

export default App;

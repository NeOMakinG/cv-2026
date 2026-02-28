import { BlockchainTimeline } from './components/BlockchainTimeline';
import { CvPage } from './components/CvPage';
import './App.css';

function App() {
  if (window.location.pathname === '/cv') {
    return <CvPage />;
  }

  return <BlockchainTimeline />;
}

export default App;

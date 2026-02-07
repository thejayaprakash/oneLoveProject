import React, { useState } from 'react';
import Hero from './components/Hero';
import PhotoBook from './components/PhotoBook';
import Proposal from './components/Proposal';
import LoveLetter from './components/LoveLetter';
import CupidBot from './components/CupidBot';
import LoveQuiz from './components/LoveQuiz';
import MusicPlayer from './components/MusicPlayer';
import HeartAnimation from './components/HeartAnimation';
import ValentineQuestion from './components/ValentineQuestion';
import StartScreen from './components/StartScreen';

function App() {
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div className="app-container">
      {!hasStarted && <StartScreen onStart={handleStart} />}
      <HeartAnimation />
      <ValentineQuestion />
      {/* <Hero />
      <LoveLetter />
      <PhotoBook />
      <LoveQuiz />
      <CupidBot />
      <Proposal /> */}
      <MusicPlayer hasStarted={hasStarted} />
    </div>
  );
}

export default App;


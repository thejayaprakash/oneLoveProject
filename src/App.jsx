import React from 'react';
import Hero from './components/Hero';
import PhotoBook from './components/PhotoBook';
import Proposal from './components/Proposal';
import LoveLetter from './components/LoveLetter';
import CupidBot from './components/CupidBot';
import LoveQuiz from './components/LoveQuiz';
import MusicPlayer from './components/MusicPlayer';
import HeartAnimation from './components/HeartAnimation';
import ValentineQuestion from './components/ValentineQuestion';

function App() {
  return (
    <div className="app-container">
      <HeartAnimation />
      <ValentineQuestion />
      {/* <Hero />
      <LoveLetter />
      <PhotoBook />
      <LoveQuiz />
      <CupidBot />
      <Proposal /> */}
      <MusicPlayer />
    </div>
  );
}

export default App;

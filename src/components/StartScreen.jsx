import React from 'react';
import './StartScreen.css';

const StartScreen = ({ onStart }) => {
    return (
        <div className="start-screen">
            <div className="start-content">
                <h1 className="start-title">💕 A Special Message 💕</h1>
                <p className="start-subtitle">Click to begin your journey</p>
                <button className="start-button" onClick={onStart}>
                    Start Experience ✨
                </button>
            </div>
        </div>
    );
};

export default StartScreen;

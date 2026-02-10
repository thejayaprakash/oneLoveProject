import React, { useState, useRef, useMemo } from 'react';
import './valentine-question.css';
import MemoriesPage from './MemoriesPage';

const ValentineQuestion = () => {
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [noButtonText, setNoButtonText] = useState('No');
    const [warningText, setWarningText] = useState('Choose wisely... 💕');
    const [showCelebration, setShowCelebration] = useState(false);
    const [showMemories, setShowMemories] = useState(false);
    const [noHoverCount, setNoHoverCount] = useState(0);
    const noButtonRef = useRef(null);

    // Funny messages that appear as user tries to click "No"
    const funnyMessages = useMemo(() => [
        "Choose wisely... 💕",
        "Are you sure? 🤔",
        "Think again! 💭",
        "Really? 😢",
        "Please no... 🥺",
        "Don't do this to me! 💔",
        "You're breaking my heart! 😭",
        "Last chance! ⚠️",
        "I'll keep asking! 😤",
        "You can't escape love! 💘"
    ], []);

    // Funny button texts
    const noButtonTexts = useMemo(() => [
        "No",
        "Nope",
        "Never",
        "Not happening",
        "No way!",
        "Absolutely not",
        "Try again",
        "Still no",
        "Nice try",
        "Nah"
    ], []);

    // Track cursor position and move button in a circle around Yes button
    const handleMouseMove = React.useCallback((e) => {
        const button = noButtonRef.current;
        if (!button || showCelebration) return;

        const buttonRect = button.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate distance between cursor and button center
        const distance = Math.sqrt(
            Math.pow(mouseX - buttonCenterX, 2) +
            Math.pow(mouseY - buttonCenterY, 2)
        );

        // Define proximity threshold (in pixels)
        const proximityThreshold = 100;

        if (distance < proximityThreshold) {
            // Find the Yes button to use as the center of the circle
            const yesButton = document.querySelector('.yes-button');
            if (!yesButton) return;

            const yesRect = yesButton.getBoundingClientRect();
            const yesCenterX = yesRect.left + yesRect.width / 2;
            const yesCenterY = yesRect.top + yesRect.height / 2;

            // Radius of the circle around Yes button
            const circleRadius = 150;

            // Calculate angle based on hover count to move to different positions
            const newCount = noHoverCount + 1;
            const angleStep = (Math.PI * 2) / 8; // Divide circle into 8 positions
            const angle = angleStep * newCount;

            // Calculate new position on the circle
            const newX = yesCenterX + Math.cos(angle) * circleRadius - buttonRect.width / 2;
            const newY = yesCenterY + Math.sin(angle) * circleRadius - buttonRect.height / 2;

            // Keep button within safe bounds
            const padding = 50;
            const minX = padding;
            const maxX = window.innerWidth - buttonRect.width - padding;
            const minY = padding;
            const maxY = window.innerHeight - buttonRect.height - padding;

            const boundedX = Math.max(minX, Math.min(maxX, newX));
            const boundedY = Math.max(minY, Math.min(maxY, newY));

            setNoButtonPosition({ x: boundedX, y: boundedY });

            // Update messages
            setNoHoverCount(newCount);
            setWarningText(funnyMessages[Math.min(newCount, funnyMessages.length - 1)]);
            setNoButtonText(noButtonTexts[Math.min(newCount, noButtonTexts.length - 1)]);
        } else if (distance < proximityThreshold * 2) {
            // Cursor is getting close - change text as warning
            if (noHoverCount === 0) {
                setWarningText("Don't even think about it! 😏");
            }
        }
    }, [showCelebration, noHoverCount, funnyMessages, noButtonTexts]);

    // Add mouse move listener
    React.useEffect(() => {
        if (!showCelebration) {
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [showCelebration, handleMouseMove]);


    const handleYesClick = () => {
        setShowCelebration(true);
        // Create heart explosion effect
        createHeartExplosion();
    };

    const createHeartExplosion = () => {
        const container = document.querySelector('.valentine-question-container');
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'explosion-heart';
            heart.innerHTML = '💕';
            heart.style.left = `${50 + (Math.random() - 0.5) * 20}%`;
            heart.style.top = `${50 + (Math.random() - 0.5) * 20}%`;
            heart.style.setProperty('--tx', `${(Math.random() - 0.5) * 400}px`);
            heart.style.setProperty('--ty', `${(Math.random() - 0.5) * 400}px`);
            heart.style.animationDelay = `${Math.random() * 0.3}s`;
            container.appendChild(heart);

            setTimeout(() => heart.remove(), 2000);
        }
    };

    // Show memories page after celebration
    if (showMemories) {
        return <MemoriesPage onComplete={() => {
            console.log('Memories viewed!');
        }} />;
    }

    if (showCelebration) {
        return (
            <div className="valentine-question-container celebration">
                <div className="celebration-card">
                    <h1 className="celebration-title">💕 YAY!!! 💕</h1>
                    <p className="celebration-subtitle">Best decision ever! 👏</p>

                    {/* Romantic GIF - Cute Cats */}
                    <div className="celebration-gif">
                        <img
                            src="https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
                            alt="Love celebration"
                            className="love-gif"
                        />
                    </div>

                    <p className="celebration-message">Sathish will be happy too! 😊✨</p>
                    <p className="celebration-final">We're going to have an amazing Valentine's Day together! 💖</p>

                    <button className="next-button" onClick={() => setShowMemories(true)}>
                        See Our Memories 💝
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="valentine-question-container">
            <div className="question-card">
                <h1 className="question-title">
                    Subathra,Will you be my Valentine? 💕💖
                </h1>
                <p className="question-subtitle">{warningText}</p>
                <p className="birthday-message">A little early… but my heart couldn't wait. <span className="pink-highlight">Happy Birthday</span> 🎂💖</p>

                <div className="buttons-container">
                    <button
                        className="yes-button"
                        onClick={handleYesClick}
                    >
                        YES! 💝
                    </button>

                    <button
                        ref={noButtonRef}
                        className="no-button"
                        style={{
                            position: noHoverCount > 0 ? 'fixed' : 'relative',
                            left: noHoverCount > 0 ? `${noButtonPosition.x}px` : 'auto',
                            top: noHoverCount > 0 ? `${noButtonPosition.y}px` : 'auto',
                            transition: 'all 0.3s ease-out',
                        }}
                    >
                        {noButtonText} 😔
                    </button>
                </div>

                <p className="hint-text">
                    {noHoverCount > 3 && "Hint: The 'No' button is... shy 😏"}
                </p>
            </div>

            {/* Floating hearts decoration */}
            <div className="decoration-hearts">
                {[...Array(8)].map((_, i) => (
                    <span key={i} className="decoration-heart" style={{ animationDelay: `${i * 0.5}s` }}>
                        💖
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ValentineQuestion;

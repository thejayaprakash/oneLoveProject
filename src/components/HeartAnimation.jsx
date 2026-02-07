import React, { useMemo } from 'react';
import './heart-animation.css';

const HeartAnimation = () => {
    // Generate floating hearts with random properties
    const floatingHearts = useMemo(() => {
        const hearts = [];
        const numHearts = 20; // Reduced to not overwhelm the central animation

        // Seeded random function for deterministic randomness
        let seed = 12345;
        const seededRandom = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };

        for (let i = 0; i < numHearts; i++) {
            hearts.push({
                id: i,
                left: seededRandom() * 100,
                scale: 0.4 + seededRandom() * 0.8,
                duration: 10 + seededRandom() * 8,
                delay: seededRandom() * 6,
                drift: -30 + seededRandom() * 60,
                opacity: 0.2 + seededRandom() * 0.4,
                rotation: -20 + seededRandom() * 40
            });
        }

        return hearts;
    }, []);

    // Generate particles for central heart formation
    const particles = useMemo(() => {
        const particleArray = [];
        const numParticles = 150;

        let seed = 54321;
        const seededRandom = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };

        // Heart path points using parametric equations
        const heartPoints = [];

        // Generate heart shape points
        for (let t = 0; t < Math.PI * 2; t += 0.05) {
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            heartPoints.push({ x: x * 8, y: y * 8 });
        }

        // Create particles
        for (let i = 0; i < numParticles; i++) {
            const point = heartPoints[i % heartPoints.length];
            const angle = seededRandom() * Math.PI * 2;
            const distance = 100 + seededRandom() * 200;

            particleArray.push({
                id: `particle-${i}`,
                finalX: point.x,
                finalY: point.y,
                startX: point.x + Math.cos(angle) * distance,
                startY: point.y + Math.sin(angle) * distance,
                delay: seededRandom() * 3,
                duration: 2.5 + seededRandom() * 1.5,
                size: 3 + seededRandom() * 3
            });
        }

        return particleArray;
    }, []);

    return (
        <div className="heart-animation-background">
            {/* Continuously floating hearts in background */}
            {floatingHearts.map((heart) => (
                <div
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        '--left': `${heart.left}%`,
                        '--scale': heart.scale,
                        '--duration': `${heart.duration}s`,
                        '--delay': `${heart.delay}s`,
                        '--drift': `${heart.drift}px`,
                        '--opacity': heart.opacity,
                        '--rotation': `${heart.rotation}deg`
                    }}
                >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16,28.261c0,0-14-7.926-14-17.046c0-9.356,13-9.356,14-0.717c1-8.638,14-8.638,14,0.717C30,20.335,16,28.261,16,28.261z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            ))}

            {/* Central particle collection heart */}
            <div className="central-heart-container">
                <div className="particles-wrapper">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="collecting-particle"
                            style={{
                                '--start-x': `${particle.startX}px`,
                                '--start-y': `${particle.startY}px`,
                                '--final-x': `${particle.finalX}px`,
                                '--final-y': `${particle.finalY}px`,
                                '--delay': `${particle.delay}s`,
                                '--duration': `${particle.duration}s`,
                                '--size': `${particle.size}px`
                            }}
                        />
                    ))}
                </div>

                {/* Glow effect when particles form heart */}
                <div className="central-heart-glow"></div>
            </div>

            {/* Top-Left particle collection heart */}
            <div className="corner-heart-container top-left">
                <div className="particles-wrapper">
                    {particles.map((particle) => (
                        <div
                            key={`left-${particle.id}`}
                            className="collecting-particle corner-particle"
                            style={{
                                '--start-x': `${particle.startX}px`,
                                '--start-y': `${particle.startY}px`,
                                '--final-x': `${particle.finalX}px`,
                                '--final-y': `${particle.finalY}px`,
                                '--delay': `${particle.delay + 1}s`,
                                '--duration': `${particle.duration}s`,
                                '--size': `${particle.size * 0.7}px`
                            }}
                        />
                    ))}
                </div>
                <div className="corner-heart-glow"></div>
            </div>

            {/* Top-Right particle collection heart */}
            <div className="corner-heart-container top-right">
                <div className="particles-wrapper">
                    {particles.map((particle) => (
                        <div
                            key={`right-${particle.id}`}
                            className="collecting-particle corner-particle"
                            style={{
                                '--start-x': `${particle.startX}px`,
                                '--start-y': `${particle.startY}px`,
                                '--final-x': `${particle.finalX}px`,
                                '--final-y': `${particle.finalY}px`,
                                '--delay': `${particle.delay + 2}s`,
                                '--duration': `${particle.duration}s`,
                                '--size': `${particle.size * 0.7}px`
                            }}
                        />
                    ))}
                </div>
                <div className="corner-heart-glow"></div>
            </div>
        </div>
    );
};

export default HeartAnimation;

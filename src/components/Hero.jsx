import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Send, Heart } from 'lucide-react';

const Hero = () => {
    // Lazy init for glassy hearts
    const [hearts] = useState(() =>
        [...Array(15)].map((_, i) => ({
            id: i,
            x: Math.random() * 100, // Percent
            y: Math.random() * 100, // Percent  
            scale: Math.random() * 0.8 + 0.4,
            rotate: Math.random() * 360,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }))
    );

    const paperPlaneVariants = {
        hidden: {
            pathLength: 0,
            opacity: 0,
            x: -100,
            y: 100,
            scale: 0.5,
            rotate: 45
        },
        visible: {
            pathLength: 1,
            opacity: 1,
            x: [null, 0, 300, -200, 0], // Flight path
            y: [null, 0, -200, -300, -50],
            scale: [0.5, 1, 1.2, 0.8, 1],
            rotate: [45, 20, -10, 10, 5],
            transition: {
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1]
            }
        },
        hover: {
            y: [0, -20, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="hero-section">
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff9a9e" />
                        <stop offset="100%" stopColor="#fecfef" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Glassy Hearts Background */}
            <div className="hero-bg-elements">
                {hearts.map((heart) => (
                    <Motion.div
                        key={heart.id}
                        className="glass-heart"
                        style={{
                            left: `${heart.x}%`,
                            top: `${heart.y}%`
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            y: [0, -50, 0],
                            rotate: heart.rotate + 10
                        }}
                        transition={{
                            duration: heart.duration,
                            repeat: Infinity,
                            delay: heart.delay,
                            ease: "easeInOut"
                        }}
                    >
                        <Heart
                            size={50 * heart.scale}
                            fill="url(#heart-gradient)"
                            stroke="rgba(255,255,255,0.3)"
                        />
                    </Motion.div>
                ))}
            </div>

            <div className="hero-content">
                <Motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="big-text">LET'S</h1>
                    <h1 className="big-text">FALL</h1>

                    <Motion.div
                        className="script-overlay"
                        initial={{ scale: 0, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: -10 }}
                        transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
                    >
                        in Love
                    </Motion.div>
                </Motion.div>

                {/* Paper Airplane Animation */}
                <Motion.div
                    className="paper-plane-container"
                    style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 15 }}
                    variants={paperPlaneVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                >
                    <Send size={120} color="#ff8fab" strokeWidth={1} fill="rgba(255, 143, 171, 0.2)" />
                </Motion.div>

                <Motion.p
                    className="message-text"
                    style={{ marginTop: '3rem', position: 'relative', zIndex: 20 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    Fly with me on a journey forever.
                </Motion.p>

                <Motion.button
                    className="btn-magical"
                    style={{ marginTop: '2rem', position: 'relative', zIndex: 20 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('letter').scrollIntoView({ behavior: 'smooth' })}
                >
                    Open My Letter
                </Motion.button>
            </div>
        </section>
    );
};

export default Hero;

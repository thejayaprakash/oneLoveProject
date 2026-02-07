import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';

const LoveLetter = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section id="letter" className="love-letter-section">
            <h2 className="section-title script-font">A Note For You</h2>

            <div className="letter-container">
                <Motion.div
                    className="glass-card letter-card"
                    onClick={() => setIsOpen(!isOpen)}
                    animate={{
                        height: isOpen ? 'auto' : '300px',
                        rotateX: isOpen ? 0 : 10
                    }}
                    transition={{ type: "spring", stiffness: 60 }}
                    whileHover={{ scale: isOpen ? 1 : 1.02 }}
                >
                    {!isOpen && (
                        <Motion.div
                            className="letter-overlay"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Mail size={80} className="text-pink-300 mb-4" color="#ff8fab" style={{ marginBottom: '1rem' }} />
                            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>Tap to Open</p>
                        </Motion.div>
                    )}

                    <Motion.div
                        className="letter-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOpen ? 1 : 0 }}
                    >
                        <p style={{ fontFamily: 'var(--font-script)', fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>My Dearest,</p>
                        <p>
                            From the moment our paths crossed, my world turned into a melody of colors I'd never seen before.
                            You are the smile I wear, the dream I chase, and the home my heart has always longed for.
                        </p>
                        <p>
                            This isn't just a question I'm asking today; it's a promise I want to make for a lifetime.
                            To laugh with you, cry with you, and grow with you.
                        </p>
                        <p style={{ textAlign: 'right', fontSize: '1.2rem', marginTop: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>- Forever Yours</p>
                    </Motion.div>
                </Motion.div>
            </div>
        </section>
    );
};

export default LoveLetter;

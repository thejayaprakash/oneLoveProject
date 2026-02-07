import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';

const Proposal = () => {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

    const moveNoButton = () => {
        setNoCount(noCount + 1);
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        setNoBtnPos({ x, y });
    };

    const getNoButtonText = () => {
        const phrases = [
            "No",
            "Are you sure?",
            "Really sure?",
            "Think again!",
            "Last chance!",
            "Surely not?",
            "You might regret this!",
            "Give it another thought!",
            "Are you absolutely certain?",
            "This could be a mistake!",
            "Have a heart!",
            "Don't be so cold!",
            "Change of heart?",
            "Wouldn't you reconsider?",
            "Is that your final answer?",
            "You're breaking my heart ;(",
        ];
        return phrases[Math.min(noCount, phrases.length - 1)];
    };

    return (
        <div className="proposal-section" id="proposal">
            {yesPressed ? (
                <Motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="success-message"
                >
                    <h1 className="main-title" style={{ fontSize: '4rem' }}>YiPPeee!!! 🎉❤️❤️❤️</h1>
                    <p className="message-text">I love you so much!</p>
                    <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Bears kissing" style={{ maxWidth: '100%', borderRadius: '20px' }} />
                </Motion.div>
            ) : (
                <>
                    <h2 className="section-title script-font" style={{ marginBottom: '2rem' }}>Will you be my Valentine?</h2>
                    <div className="buttons-container" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', position: 'relative', minHeight: '200px' }}>
                        <Motion.button
                            className="btn-magical"
                            style={{ fontSize: `${noCount * 2 + 1.2}rem`, padding: '20px 40px', backgroundColor: 'var(--color-primary)', zIndex: 10 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setYesPressed(true)}
                        >
                            Yes
                        </Motion.button>

                        <Motion.button
                            className="btn-magical"
                            style={{
                                background: '#fff',
                                color: 'var(--color-bg)',
                                fontSize: '1rem',
                                position: 'absolute',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                            }}
                            animate={noBtnPos}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onMouseEnter={moveNoButton}
                            onClick={moveNoButton}
                        >
                            {getNoButtonText()}
                        </Motion.button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Proposal;

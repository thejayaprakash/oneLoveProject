import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { HelpCircle, Check, X } from 'lucide-react';

const questions = [
    {
        question: "Where was our first date?",
        options: ["The Coffee Shop", "The Movies", "The Park", "Wait, we dated?"],
        answer: 0
    },
    {
        question: "What is my favorite food?",
        options: ["Pizza", "Sushi", "Tacos", "You!"],
        answer: 1
    },
    {
        question: "When did I know I loved you?",
        options: ["Immediately", "After 3 months", "When you laughed at my joke", "It's a secret"],
        answer: 2
    }
];

const LoveQuiz = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
    const [isFinished, setIsFinished] = useState(false);

    const handleAnswer = (index) => {
        if (index === questions[currentQ].answer) {
            setScore(score + 1);
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentQ < questions.length - 1) {
                setCurrentQ(currentQ + 1);
            } else {
                setIsFinished(true);
            }
        }, 1000);
    };

    return (
        <section className="quiz-section">
            <h2 className="section-title script-font">How well do you know us?</h2>

            <Motion.div className="glass-card quiz-card">
                {isFinished ? (
                    <Motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Quiz Complete!</h3>
                        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You scored {score} / {questions.length}</p>
                        {score === questions.length ?
                            <p style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>Perfect Score! You really are my soulmate! ❤️</p> :
                            <p style={{ color: '#ccc', fontSize: '1.2rem' }}>Close enough! I still love you! 😉</p>
                        }
                    </Motion.div>
                ) : (
                    <>
                        {feedback && (
                            <Motion.div
                                className="letter-overlay" style={{ borderRadius: '24px' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {feedback === 'correct' ?
                                    <Check size={80} color="#4ade80" /> :
                                    <X size={80} color="#f87171" />
                                }
                            </Motion.div>
                        )}

                        <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>{questions[currentQ].question}</h3>
                        <div className="quiz-options">
                            {questions[currentQ].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => !feedback && handleAnswer(i)}
                                    className="option-btn"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        <div className="progress-container">
                            {questions.map((_, i) => (
                                <div key={i} className={`progress-dot ${i === currentQ ? 'active' : 'inactive'}`} />
                            ))}
                        </div>
                    </>
                )}
            </Motion.div>
        </section>
    );
};

export default LoveQuiz;

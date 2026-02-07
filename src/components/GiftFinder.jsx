import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Gift, RotateCcw } from 'lucide-react';

const GiftFinder = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);

    const questions = [
        {
            text: "Who are you shopping for?",
            options: ["My Partner", "My Bestie (Galentine)", "Myself (Self-Love)"]
        },
        {
            text: "What's their vibe?",
            options: ["Adventurous & Wild", "Cozy & Chill", "Fancy & Fine Dining"]
        },
        {
            text: "What's the budget?",
            options: ["Affordable cute", "Mid-range treat", "Splurge city"]
        }
    ];

    const handleOption = (option) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep('result');
        }
    };

    const getRecommendation = () => {
        if (answers[0]?.includes("Self")) return "The 'Treat Yourself' Spa Kit";
        if (answers[1]?.includes("Adventurous")) return "The Weekend Getaway Box";
        if (answers[1]?.includes("Cozy")) return "The Netflix & Cuddle Bundle";
        return "The Classic Romance Set";
    };

    const reset = () => {
        setStep(0);
        setAnswers([]);
    };

    return (
        <section className="py-20 px-4 max-w-2xl mx-auto text-center">
            <h2 className="section-title script-font text-5xl mb-8 text-primary">Cupid's Gift Finder</h2>

            <Motion.div
                className="glass-card p-8 min-h-[400px] flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {step === 'result' ? (
                    <div className="text-center">
                        <Gift size={60} className="mx-auto mb-4 text-primary" />
                        <h3 className="text-3xl font-heading mb-4">We Recommend:</h3>
                        <p className="text-4xl font-bold text-secondary mb-8">{getRecommendation()}</p>
                        <p className="mb-8 text-gray-600">Based on your choices, this is the perfect match!</p>
                        <button onClick={reset} className="flex items-center gap-2 mx-auto text-gray-500 hover:text-primary transition-colors">
                            <RotateCcw size={18} /> Start Over
                        </button>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="mb-8 flex justify-between text-sm text-gray-400 uppercase tracking-widest">
                            <span>Step {step + 1} of 3</span>
                            <span>Gift Profiler</span>
                        </div>

                        <h3 className="text-2xl font-heading mb-8">{questions[step].text}</h3>

                        <div className="grid gap-4">
                            {questions[step].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleOption(opt)}
                                    className="p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-lg font-medium bg-white text-gray-700 shadow-sm"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </Motion.div>
        </section>
    );
};

export default GiftFinder;

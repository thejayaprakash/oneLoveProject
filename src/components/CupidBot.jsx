import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';

const suggestions = [
    "Plan a perfect date night 🍷",
    "Write me a short poem 🌹",
    "Tell me why you love me ❤️",
    "Give me a compliment ✨"
];

const responses = {
    "Plan a perfect date night 🍷": "How about a cozy blanket fort, takeout from our favorite spot, and watching the stars? Or maybe a sunset picnic by the lake with some wine and cheese! 🧀🍇",
    "Write me a short poem 🌹": "Roses are red, violets are blue, the sun shines bright, but not as bright as you. ☀️",
    "Tell me why you love me ❤️": "I love the way you laugh, the kindness in your eyes, and how you make even the ordinary days feel magical. You are my safe place. 🏡",
    "Give me a compliment ✨": "You have a smile that could light up the darkest room and a heart of pure gold. You are simply a masterpiece. 🎨"
};

const CupidBot = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm Cupid Bot 💘. Need a little magic? Ask me anything!", isBot: true }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = (text) => {
        setMessages(prev => [...prev, { id: Date.now(), text, isBot: false }]);
        setIsTyping(true);

        setTimeout(() => {
            const reply = responses[text] || "My love for you is too great for words! (I'm just a demo bot 😉)";
            setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, isBot: true }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <section className="cupid-section">
            <h2 className="section-title script-font text-center">Ask Cupid</h2>

            <div className="glass-card chat-window">
                <div className="messages-area">
                    <AnimatePresence>
                        {messages.map(msg => (
                            <Motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`message-row ${msg.isBot ? 'bot' : 'user'}`}
                            >
                                <div className={`message-bubble ${msg.isBot ? 'bot' : 'user'}`}>
                                    {msg.text}
                                </div>
                            </Motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <Motion.div className="message-row bot">
                            <div className="message-bubble bot" style={{ width: 50, display: 'flex', gap: 5, justifyContent: 'center' }}>
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ width: 6, height: 6, backgroundColor: '#fff', borderRadius: '50%', display: 'inline-block' }} />
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" style={{ width: 6, height: 6, backgroundColor: '#fff', borderRadius: '50%', display: 'inline-block' }} />
                                <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" style={{ width: 6, height: 6, backgroundColor: '#fff', borderRadius: '50%', display: 'inline-block' }} />
                            </div>
                        </Motion.div>
                    )}
                </div>

                <div className="suggestions-area">
                    <p style={{ fontSize: '0.9rem', color: '#ccc', marginBottom: '0.5rem' }}>Try asking:</p>
                    <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '0.5rem', gap: '0.5rem' }}>
                        {suggestions.map((suggestion, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(suggestion)}
                                className="suggestion-btn"
                            >
                                <Sparkles size={14} /> {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CupidBot;

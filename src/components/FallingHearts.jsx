import React, { useEffect, useState } from 'react';

const FallingHearts = ({ count = 30 }) => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const newHearts = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 20 + 10, // 10px to 30px
            duration: Math.random() * 5 + 5, // 5s to 10s
            delay: Math.random() * 5,
            color: Math.random() > 0.5 ? 'var(--color-primary)' : 'var(--color-secondary)'
        }));
        setHearts(newHearts);
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="falling-heart"
                    style={{
                        left: `${heart.left}%`,
                        width: `${heart.size}px`,
                        height: `${heart.size}px`,
                        backgroundColor: heart.color,
                        animationDuration: `${heart.duration}s`,
                        animationDelay: `${heart.delay}s`,
                        // Creating the heart shape via transform/clip-path or just use the CSS simplified version
                        // For the pure CSS ::before/::after method in index.css, we just need a square div that is rotated
                        transform: 'rotate(-45deg)',
                        position: 'absolute',
                    }}
                />
            ))}
        </div>
    );
};

export default FallingHearts;

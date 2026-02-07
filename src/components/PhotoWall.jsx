import React from 'react';
import { motion as Motion } from 'framer-motion';

const photos = [
    "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1583934555026-6f85ed31bc2e?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1516589178581-a7870abd21d4?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1520052203542-d3095f0525bf?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=500&auto=format&fit=crop&q=60"
];

const PhotoWall = () => {
    return (
        <section className="photo-wall-section" id="memories">
            <h2 className="section-title script-font">Our Beautiful Memories</h2>
            <div className="masonry-grid">
                {photos.map((src, index) => (
                    <Motion.div
                        key={index}
                        className="photo-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <img src={src} alt={`Memory ${index + 1}`} />
                    </Motion.div>
                ))}
            </div>
        </section>
    );
};

export default PhotoWall;

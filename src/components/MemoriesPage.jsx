import React from 'react';
import './MemoriesPage.css';

const MemoriesPage = () => {
    return (
        <div className="memories-container">
            <div className="memories-content">
                <h1 className="memories-title">Our Beautiful Memories 💕</h1>

                <div className="memories-grid">
                    {/* First Memory - Footprints */}
                    <div className="memory-card">
                        <div className="memory-image-container">
                            <img
                                src="/media__1770450493760.jpg"
                                alt="Footprints in sand"
                                className="memory-image"
                            />
                        </div>
                        <p className="memory-caption">Walking together, always 💫</p>
                    </div>

                    {/* Second Memory - Names */}
                    <div className="memory-card">
                        <div className="memory-image-container">
                            <img
                                src="/media__1770450493602.jpg"
                                alt="Names in sand"
                                className="memory-image"
                            />
                        </div>
                        <p className="memory-caption">Written once, felt forever 💖</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemoriesPage;

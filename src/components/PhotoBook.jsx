import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import './realistic-book.css';

const photos = [
    {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=60",
        caption: "Our First Date",
        loveCode: "14.02.2023 • The Coffee Shop"
    },
    {
        url: "https://images.unsplash.com/photo-1516589178581-6e7f0a2c0e0e?w=500&auto=format&fit=crop&q=60",
        caption: "Beach Sunset",
        loveCode: "40.7128°N, 74.0060°W"
    },
    {
        url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&auto=format&fit=crop&q=60",
        caption: "Adventures Together",
        loveCode: "\"You are my greatest adventure\""
    },
    {
        url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=500&auto=format&fit=crop&q=60",
        caption: "Just Us",
        loveCode: "143 637 • Forever & Always"
    },
];

const PhotoBook = () => {
    const [isLocked, setIsLocked] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [scanning, setScanning] = useState(false);

    const handleQRScan = () => {
        setScanning(true);
        setTimeout(() => {
            setIsLocked(false);
            setScanning(false);
        }, 1500);
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(photos.length / 2)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const totalPages = Math.ceil(photos.length / 2);

    return (
        <section className="photo-book-section">
            <h2 className="section-title script-font">Our Story</h2>

            {isLocked ? (
                <div className="book-container">
                    <motion.div
                        className="book-cover-locked"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <div className="cover-content">
                            <Lock size={40} className="mb-4" style={{ color: 'white' }} />
                            <h3 className="script-font text-4xl mb-4" style={{ color: 'white' }}>Our Love Story</h3>
                            <p className="text-sm uppercase tracking-widest mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>Locked with Love</p>

                            <motion.div
                                className="qr-code"
                                onClick={handleQRScan}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                animate={scanning ? { rotate: 360 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <QRCodeSVG
                                    value={window.location.href}
                                    size={120}
                                    bgColor="white"
                                    fgColor={scanning ? "#FF69B4" : "#4A0E4E"}
                                    level="H"
                                />
                            </motion.div>

                            <p className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.9)' }}>
                                {scanning ? 'Unlocking...' : 'Scan or Click to Unlock'}
                            </p>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <div className="book-wrapper">
                    <div className="realistic-book">
                        {/* Left Page */}
                        <div className="book-page left-page">
                            {currentPage === 0 ? (
                                <div className="page-inner cover-page">
                                    <h3 className="script-font text-4xl" style={{ color: 'white' }}>Our Love Story</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '1rem' }}>Volume 1</p>
                                </div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`left-${currentPage}`}
                                        className="page-inner"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {currentPage > 0 && photos[(currentPage - 1) * 2] && (
                                            <>
                                                <div className="photo-frame-book">
                                                    <img src={photos[(currentPage - 1) * 2].url} alt="Memory" />
                                                </div>
                                                <p className="caption-book script-font">{photos[(currentPage - 1) * 2].caption}</p>
                                                <div className="love-code-book">{photos[(currentPage - 1) * 2].loveCode}</div>
                                            </>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            <div className="page-number-book">{currentPage > 0 ? (currentPage - 1) * 2 + 1 : ''}</div>
                        </div>

                        {/* Center Spine */}
                        <div className="book-spine"></div>

                        {/* Right Page */}
                        <div className="book-page right-page" onClick={nextPage}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`right-${currentPage}`}
                                    className="page-inner"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentPage === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                                            <p style={{ fontSize: '1.2rem', color: '#FF69B4', fontStyle: 'italic' }}>
                                                Click to turn the page →
                                            </p>
                                        </div>
                                    ) : currentPage < totalPages && photos[(currentPage - 1) * 2 + 1] ? (
                                        <>
                                            <div className="photo-frame-book">
                                                <img src={photos[(currentPage - 1) * 2 + 1].url} alt="Memory" />
                                            </div>
                                            <p className="caption-book script-font">{photos[(currentPage - 1) * 2 + 1].caption}</p>
                                            <div className="love-code-book">{photos[(currentPage - 1) * 2 + 1].loveCode}</div>
                                        </>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                                            <h3 className="script-font text-3xl" style={{ color: '#FF69B4' }}>To be continued...</h3>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setCurrentPage(0); }}
                                                className="restart-btn"
                                            >
                                                Read Again
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                            <div className="page-number-book">{currentPage > 0 && currentPage < totalPages ? (currentPage - 1) * 2 + 2 : ''}</div>
                        </div>

                        {/* Flipping Page Animation */}
                        <AnimatePresence>
                            {currentPage > 0 && (
                                <motion.div
                                    className="flipping-page"
                                    initial={{ rotateY: 0 }}
                                    animate={{ rotateY: -180 }}
                                    exit={{ rotateY: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    style={{ transformOrigin: 'left center' }}
                                >
                                    <div className="flip-page-front"></div>
                                    <div className="flip-page-back"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="book-controls">
                        <button onClick={prevPage} disabled={currentPage === 0} className="nav-btn">
                            <ChevronLeft /> Previous
                        </button>
                        <span className="page-indicator">Page {currentPage} of {totalPages}</span>
                        <button onClick={nextPage} disabled={currentPage >= totalPages} className="nav-btn">
                            Next <ChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PhotoBook;

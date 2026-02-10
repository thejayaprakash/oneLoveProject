import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';
import perfectMusic from '../assets/perfect.mp3';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Attempt to auto-play when component mounts (will likely be blocked by browser but worth a try)
        // We set volume to 0.4 to be less intrusive
        if (audioRef.current) {
            audioRef.current.volume = 1.0;
            console.log("Audio ref attached, volume set to 1.0");
        }
    }, []);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // This promise handling is crucial for debugging playback issues
                await audioRef.current.play();
            }
        } catch (error) {
            console.error("Playback failed:", error);
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10000 }}>
            {/* Using the HTML5 audio tag is more reliable in React than new Audio() */}
            <audio
                ref={audioRef}
                src={perfectMusic}
                loop
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={(e) => console.error("Audio error:", e)}
            />

            <motion.button
                onClick={togglePlay}
                style={{
                    backgroundColor: '#ec4899', // tailwind pink-500
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    color: 'white'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
            >
                {isPlaying ? <Pause size={24} /> : <Music size={24} />}
            </motion.button>
        </div>
    );
};

export default MusicPlayer;

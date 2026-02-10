import React, { useState, useRef, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';
import perfectMusic from '../assets/perfect.mp3';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Attempt to auto-play when component mounts (will likely be blocked by browser but worth a try)
        // We set volume to 0.4 to be less intrusive
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
        }
    }, []);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // This promise handling is crucial for debugging playback issues
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Playback failed:", error);
            // If autoplay fails or other errors, ensure state reflects paused
            setIsPlaying(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
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

            <Motion.button
                onClick={(e) => {
                    console.log("Music button clicked!");
                    togglePlay();
                }}
                className="w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg border-2 border-white/20 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatType: "loop" }}
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
            >
                {isPlaying ? <Pause size={24} /> : <Music size={24} />}
            </Motion.button>
        </div>
    );
};

export default MusicPlayer;

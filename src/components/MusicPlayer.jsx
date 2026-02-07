import React, { useState, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(err => {
                        console.error('Play error:', err);
                        setIsPlaying(false);
                    });
            }
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} loop preload="auto">
                <source src={`${import.meta.env.BASE_URL}perfect.mp3`} type="audio/mpeg" />
                <source src="/perfect.mp3" type="audio/mpeg" />
            </audio>

            <Motion.button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg border-2 border-white/20"
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

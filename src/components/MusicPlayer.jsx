import React, { useState, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { Music, Pause } from 'lucide-react';

const MusicPlayer = ({ hasStarted }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Auto-play when user starts the experience
    React.useEffect(() => {
        if (hasStarted && audioRef.current) {
            const attemptAutoPlay = async () => {
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Auto-play prevented by browser. User interaction required.");
                    setIsPlaying(false);
                }
            };

            attemptAutoPlay();
        }
    }, [hasStarted]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio ref={audioRef} loop>
                {/* Lo-fi / Romantic instrumental placeholder */}
                <source src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3" type="audio/mpeg" />
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

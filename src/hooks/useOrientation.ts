import { useEffect, useState } from 'react';

export const useOrientation = () => {
    const [isLandscape, setIsLandscape] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.innerWidth > window.innerHeight;
    });

    useEffect(() => {
        const handleOrientationChange = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        window.addEventListener('resize', handleOrientationChange);
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    return isLandscape;
};

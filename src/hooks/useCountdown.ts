import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (initialTime: number = 0) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const [isCounting, setIsCounting] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    const start = useCallback((duration: number) => {
        setTimeLeft(duration);
        setIsCounting(true);
    }, []);
    const stclearTimer = useCallback(() => {
        clearInterval(timer)
    }, []);
    useEffect(() => {
        if (!isCounting) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    setIsCounting(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        setTimer(timer)
        return () => clearInterval(timer);
    }, [isCounting]);

    return { timeLeft, isCounting, start,stclearTimer };
};
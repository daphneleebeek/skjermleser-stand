import { useState, useCallback, useRef } from 'react';

const useStopWatch = () => {
    const [count, setCount] = useState(1);

    const intervalRef = useRef(null);

    const stopCounting = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    const startCounting = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setCount(prevState => prevState + 1);
        }, 1000);
    }, []);

    return { count, startCounting, stopCounting };
};

export default useStopWatch;
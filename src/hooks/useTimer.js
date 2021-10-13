import { useState, useCallback, useRef, useEffect } from 'react';

const useTimer = (initialValue, intervalMs, onFinished) => {
    const [count, setCount] = useState(initialValue);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (count > 0) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        onFinished();

        return () => clearInterval(intervalRef.current);
    }, [count, onFinished]);

    const startTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setCount(prevState => prevState - 1);
        }, intervalMs);
    }, [intervalMs]);

    return { count, startTimer };
};

export default useTimer;
import { useState, useRef } from 'react';

const useStopWatch = () => {
    const [count, setCount] = useState(0)
    const countRef = useRef(null)


    const stopCounting = () => {
        clearInterval(countRef.current)
        setCount(0)
    }

    const startCounting = () => {
        countRef.current = setInterval(() => {
            setCount((timer) => timer + 10)
        }, 10)
    }

    return { count, startCounting, stopCounting };
};

export default useStopWatch;
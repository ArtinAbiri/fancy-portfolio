import {useState, useEffect} from "react";

function getSize() {
    const isClient = typeof window === "object";

    return {
        width: isClient ? window.innerWidth : 0, height: isClient ? window.innerHeight : 0,
    };
}

//Hook
const useWindowSize = () => {
    const isClient = typeof window === "object";

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return undefined;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isClient]);

    return windowSize;
}
export default useWindowSize;
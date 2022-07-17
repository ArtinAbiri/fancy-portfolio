import {useEffect, useRef} from "react";
import "locomotive-scroll/src/locomotive-scroll.scss";
import LocomotiveScroll, {Scroll} from 'locomotive-scroll';

type UseLocomotiveScrollHook = [React.RefObject<Scroll>];

const useLocomotiveScroll = (ref: React.RefObject<Element>): UseLocomotiveScrollHook => {
    const locomotiveScrollRef = useRef<Scroll | null>(null);

    useEffect(() => {
        if (ref.current) {
            locomotiveScrollRef.current = new LocomotiveScroll({
                el: ref.current, smooth: true, direction: 'horizontal',
            });
        }

        return () => {
            locomotiveScrollRef.current?.destroy();
        };
    }, [ref]);
    return [locomotiveScrollRef];
};
export default useLocomotiveScroll;
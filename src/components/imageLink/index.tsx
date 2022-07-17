import React, {useContext, useEffect, useRef, useState} from "react";
import {navigate} from "gatsby";
import {DataType} from "../../containers/Home";

import './style.scss';
import {CursorContext} from "../CustomCursor/CursorManager";
import {motion} from "framer-motion";
import {defaultTransition} from "../../utils/transition";
import useWindowSize from "../../hooks/useWindowSize";
import {SharedLayoutDataContext} from "../../containers/Layout/manager";

type Props = {
    element: DataType;
    index: number;
};

const ImageLink = ({element, index}: Props) => {
    const {slug, cover, color, title} = element;
    const {setProjectTitle} = useContext(CursorContext);

    const {setCurrent, current, setValue}=useContext(SharedLayoutDataContext)
    const windowSizes = useWindowSize();
    const [coordinates, setCoordinates] = useState({
        x: 0,
        y: 0
    });

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const xPos = ()=> {
            if (!ref.current) return 0;
            const rect = ref.current.getBoundingClientRect();
            return windowSizes.width / 2 - rect.left - rect.width / 2;

        }
        const yPos = ()=> {
            if (!ref.current) return 0;
            const rect = ref.current.getBoundingClientRect();
            return windowSizes.height / 2 - rect.top - rect.height / 2;
        }
        setCoordinates({
            x: xPos(),
            y: yPos(),
        });
    }, []);

    const handleOnClick = () => {
        if (!ref.current) return;
        setCurrent(slug);

        const rect= ref.current.getBoundingClientRect();
        setValue({
            x: windowSizes.width / 2 - rect.width / 2,
            y: windowSizes.height / 2 - rect.height / 2,
            width: rect.width,
            height: rect.height,
        })
        navigate(`/${slug}`);
    };

    const transitionDelay = index / 10;
    return (
        <motion.div
            ref={ref}
            className='content__slide-item'
            onClick={handleOnClick}
            exit={{
                x: coordinates.x,
                y: coordinates.y,
                zIndex: current===slug ? 100 : 0,
                transition: {...defaultTransition,delay: transitionDelay}
            }}
            onMouseEnter={() => setProjectTitle(title)}
            onMouseLeave={() => setProjectTitle("")}
        >
            <motion.div className='image-link-component'

                        initial={{
                            backgroundColor: color
            }}

                        exit= {{
                            opacity: current===slug ? 1 : 0,
                            transition: {...defaultTransition,delay: 3}
            }}
            >
                <motion.img src={cover}
                            initial={{
                                filter: 'grayscale(1)',
                            }}
                            whileHover={{
                                filter: 'grayscale(0)',
                                scale: 1.1,
                                transition: {
                                    ...defaultTransition,
                                    ease: 'easeInOut',
                                    duration: 0.5,
                                },
                            }}
                            exit= {{
                                opacity: current===slug ? 1 : 0,
                                transition: defaultTransition,
                            }}
                />
            </motion.div>
        </motion.div>
    );
};
export default ImageLink;

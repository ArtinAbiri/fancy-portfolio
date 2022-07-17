import React, {useEffect, useRef, useState} from "react";

import ModelInfo from "./ModelInfo";
import ModelCover from "./ModelCover";

import {motion} from "framer-motion";
import './style.scss';
import {DataType} from "../../containers/Home";
import ModelPicture from "./ModelPicture";
import {defaultEase} from "../../utils/transition";
import useLocomotiveScroll from "../../hooks/useLocomotiveScroll";

type Props = {
    pageContext: DataType
}

export default function Model({pageContext}: Props) {
    const {cover, detailImages, title} = pageContext;
    const ref = useRef<HTMLDivElement | null>(null);
    const [locomotiveScroll] = useLocomotiveScroll(ref)
    const [locomotiveStart, setLocomotive] = useState(false)

    useEffect(() => {
        if (locomotiveStart) {
            locomotiveScroll.current?.update();
        }

    }, [locomotiveStart])

    return (<div data-scroll-container ref={ref}>
            <motion.div className='model-container'
                        animate={{
                            padding: "2vw", transition: {ease: defaultEase, delay: 3, duration: 1}
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        onAnimationComplete={() => setLocomotive(true)}
            >
                <ModelCover src={cover}/>
                <ModelInfo title={title}/>
                <div className='model-pictures'>
                    {detailImages.map((src) => (<ModelPicture src={src} key={src}/>))}

                </div>
            </motion.div>
        </div>);
}
import React from "react";
import {Variants} from "framer-motion";
import {defaultEase} from "../../utils/transition"
import {motion} from "framer-motion";

type Props = {
    src: string;
}

const transition = {
    duration: 1, ease: defaultEase
}
const variants: Variants = {
    initial: {
        opacity: 0, transition, position: 'absolute'
    }, animate: {
        opacity: 1, position: 'initial', transition: {...transition, duration: 1, delay: 3.5}
    }, exit: {
        opacity: 0, transition,

    }
}
export default function ModelPicture({src}: Props) {
    return (

        <motion.img className='model-picture' src={src} variants={variants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        />)
}
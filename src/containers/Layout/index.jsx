import React from "react";
import {AnimatePresence} from 'framer-motion';
import CursorManager from "../../components/CustomCursor/CursorManager";
import CustomCursor from "../../components/CustomCursor";
import SharedLayoutData from "./manager";
import '../../styles/animation.css';

export default function Layout({children}) {
    return (<CursorManager>
            <SharedLayoutData>

                <CustomCursor />
                <AnimatePresence exitBeforeEnter>
                    {children}
                </AnimatePresence>
            </SharedLayoutData>
        </CursorManager>);
}
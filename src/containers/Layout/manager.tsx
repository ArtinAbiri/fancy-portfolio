import React, {createContext, useState} from "react";

type State = {
    width: number; height: number; x: number; y: number;
};

const initialState: State = {
    width: 0, height: 0, x: 0, y: 0,
};
export type SharedLayoutDataType = {
    setCurrent: (value: string) => void; current: string; contextValue: State; setValue: (value: State) => void;
};
export const SharedLayoutDataContext = createContext<SharedLayoutDataType>({
    current: "", setCurrent: () => {
    }, contextValue: initialState, setValue: () => {
    },
});
type Props = {
    children: JSX.Element;
};

export default function SharedLayoutData({children}: Props) {
    const [current, setCurrent] = useState("");
    const [contextValue, setState] = useState(initialState);

    return (<SharedLayoutDataContext.Provider
            value={{
                current, setCurrent, contextValue: contextValue, setValue: setState,
            }}
        >
            {children}
        </SharedLayoutDataContext.Provider>);
}

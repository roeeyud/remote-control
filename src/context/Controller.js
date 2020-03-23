import React, { createContext, useState } from 'react';

export const Context = createContext();
export function Provider({ children }) {
    const [values, setValues] = useState({});

    function onControllerChange(name, value) {
        const newState = {
            ...values,
            [name]: value,
        };
        console.log('New State: ', newState);
        setValues(newState);
    }

    return <Context.Provider value={{ onControllerChange, values }}>
        {children}
    </Context.Provider>;
}
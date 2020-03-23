import React, { createContext, useState } from 'react';

export const Context = createContext();
export function Provider({ children }) {
    const [values, setValues] = useState({});

    function sendNewState(newState) {
        var request = new XMLHttpRequest();
            
        request.open('POST', '/values', newState);
        request.send();
    }

    function onControllerChange(name, value) {
        const newState = {
            ...values,
            [name]: value,
        };
        sendNewState(newState);
        setValues(newState);
    }

    return <Context.Provider value={{ onControllerChange, values }}>
        {children}
    </Context.Provider>;
}
import React, { useEffect, useRef } from 'react';

export default function Video({ stream, muted, className }) {
    const ref = useRef(null);
    useEffect(() => {
        if (!stream) return;
        ref.current.srcObject = stream;
    }, [stream]);
    return <video ref={ref} autoPlay muted={muted} className={className}></video>;
}
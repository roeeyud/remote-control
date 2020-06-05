import React, { useRef, useEffect } from 'react';
import points from './points';

const multiplier = 10;
const size = 30 * multiplier;

const locationUpdate = {
    location: 3,
    x: -0.4, 
    y: 3,
    angle: 0.5,
};

function convertPoint({ x, y}) {
    return {
        x: x * multiplier, 
        y: ((-1 * y) + 30) * multiplier,
    };
}
export default function Map() {
    const canvasElement = useRef(null);
    useEffect(() => {
        if (!canvasElement) {
            return;
        }
        const pathCtx = canvasElement.current.getContext('2d');
        const pointCtx = canvasElement.current.getContext('2d');
        function drawPathPoint(point) {
            const { x, y } = convertPoint(point);
            const rectSize = 6 * multiplier;
            pathCtx.fillStyle = 'red';
            pathCtx.fillRect(x - (rectSize/2), y - (rectSize/2), rectSize, rectSize);
        }
        function drawLocation() {
            pointCtx.fillStyle = 'blue';
            const location = points[locationUpdate.location];
            const rectSize = 2 * multiplier;
            const { x, y } = convertPoint({ 
                x: location.x + locationUpdate.x,
                y: location.y + locationUpdate.y,
            });
            pointCtx.arc(x - (rectSize/2), y - (rectSize/2), rectSize, rectSize, 2 * Math.PI * rectSize);
            pointCtx.fill();
        }
        points.forEach(drawPathPoint);
        drawLocation();
    }, [canvasElement]);

    return <div style={{ position: 'absolute', left: `calc(50% - ${size / 2}px)`, top: `calc(50% - ${size / 2}px)` }}>
        <canvas style={{ height: size, width: size }} height={size} width={size} ref={canvasElement}></canvas>
    </div>;
}
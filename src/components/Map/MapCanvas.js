import React, { useState, useEffect } from "react";
import { Graphics } from "pixi.js";
import { Stage, PixiComponent } from "@inlet/react-pixi";

function calcAngle(number) {
  // number is number between 1 0
  if (number > 0.5) {
    return number * 10 + 5;
  }

  return number * 10 - 5;
}

const Map = PixiComponent("Map", {
  create: (props) => new Graphics(),
  applyProps: (instance, _, props) => {
    const { points } = props;
    instance.clear();
    instance.lineStyle(50, 0xe0e0e0);
    instance.moveTo(points[0].x, points[0].y);
    points.forEach(({ x, y }) => {
      instance.lineTo(x, y);
    });
    instance.endFill();
  },
});

const Robot = PixiComponent("Robot", {
  create: (props) => new Graphics(),
  applyProps: (instance, _, props) => {
    const { robot, points } = props;
    instance.clear();
    const size = 30;
    instance.lineStyle(size, 0x19bf89);
    const robotX = points[robot.point].x + size;
    const robotY = points[robot.point].y + calcAngle(robot.angle);
    instance.moveTo(points[robot.point].x, points[robot.point].y);
    instance.lineTo(robotX, robotY);
    instance.endFill();
  },
});

export default function MapCanvas({ open, onClose }) {
  const points = [
    { x: 10, y: 250 },
    { x: 70, y: 250 },
    { x: 130, y: 250 },
    { x: 190, y: 250 },
    { x: 250, y: 250 },
    { x: 250, y: 70 },
    { x: 250, y: 130 },
    { x: 250, y: 190 },
    { x: 250, y: 250 },
  ];

  const [robotData, setRobotData] = useState({ point: 2, angle: 0.5 });

  useEffect(() => {
    setTimeout(() => {
      setRobotData({ point: 1, angle: 0.2 });
    }, 2000);

    setTimeout(() => {
      setRobotData({ point: 3, angle: 0.8 });
    }, 4000);
  }, []);

  return (
    <Stage width={300} height={300} options={{ transparent: true }}>
      <Map points={points} />
      <Robot robot={robotData} points={points} />
    </Stage>
  );
}

import React, { useState, useEffect } from "react";
import { Graphics, useTick } from "pixi.js";
import { Stage, PixiComponent } from "@inlet/react-pixi";

const mapSize = 200;
const classSize = 30;
const robotSize = 25;
const middlePoint = 5;
const middleSpace = 13;
const endPoint = mapSize - classSize;

function getPoints() {
  return [
    { x: 0, y: endPoint },
    { x: 50, y: endPoint },
    { x: 80, y: endPoint },
    { x: 110, y: endPoint },
    { x: 140, y: endPoint },
    { x: endPoint, y: endPoint },
    { x: endPoint, y: 140 },
    { x: endPoint, y: 110 },
    { x: endPoint, y: 80 },
    { x: endPoint, y: 50 },
    { x: endPoint, y: 0 },
  ];
}

function getRobotPosition(x, y, point) {
  if (point > middlePoint) {
    return { x, y: y + robotSize };
  }

  return { x: x + robotSize, y };
}

function getPointPosition(x, y, point) {
  if (point === middlePoint) {
    return { x: endPoint - middleSpace, y };
  }

  return { x, y };
}

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
    instance.lineStyle(classSize, 0xe0e0e0);
    instance.moveTo(points[0].x, points[0].y);
    points.forEach(({ x, y }) => {
      instance.lineTo(x, y);
    });
    instance.endFill();
  },
});

const Robot = PixiComponent("Robot", {
  create: () => new Graphics(),
  applyProps: (instance, _, props) => {
    const { robot, points } = props;
    const { point } = robot;

    const { x: pointX, y: pointY } = getPointPosition(
      points[point].x,
      points[point].y,
      point
    );
    const { x: robotX, y: robotY } = getRobotPosition(pointX, pointY, point);

    instance.clear();
    instance.lineStyle(robotSize, 0x19bf89);
    instance.moveTo(pointX, pointY);
    instance.lineTo(robotX, robotY);
    instance.endFill();
  },
});

export default function MapCanvas() {
  const points = getPoints();
  const [robotData, setRobotData] = useState({
    point: 3,
    angle: 0.5,
  });

  useEffect(() => {
    setTimeout(() => {
      setRobotData({ point: 4, angle: 0.2 });
    }, 2000);

    setTimeout(() => {
      setRobotData({ point: 5, angle: 0.8 });
    }, 4000);

    setTimeout(() => {
      setRobotData({ point: 6, angle: 0.3 });
    }, 6000);

    setTimeout(() => {
      setRobotData({ point: 7, angle: 0.8 });
    }, 8000);
  }, []);

  return (
    <Stage
      width={mapSize}
      height={mapSize}
      options={{
        transparent: true,
        resolution: window.devicePixelRatio,
        autoDensity: true,
      }}
    >
      <Map points={points} />
      <Robot robot={robotData} points={points} />
    </Stage>
  );
}

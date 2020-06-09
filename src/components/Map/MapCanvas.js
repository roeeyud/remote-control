import React, { useState, useEffect } from "react";
import { Graphics, useTick } from "pixi.js";
import { Stage, PixiComponent } from "@inlet/react-pixi";

const mapSize = 200;
const classSize = 30;
const robotSize = 25;
const robotLineSize = 5;
const robotLineDistance = 10;
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

function getRobotMovePosition(x, y, point) {
  if (point > middlePoint) {
    return { x, y: y + robotSize };
  }

  return { x: x + robotSize, y };
}

function getRobotPointPosition(x, y, point) {
  if (point === middlePoint) {
    return { x: endPoint - middleSpace, y };
  }

  return { x, y };
}

function calcAngle(number) {
  // number is number between 1 0
  if (number > 0.5) {
    return number * 10;
  }

  return number * -10;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getRobotLinePointPosition({ x, y, point }) {
  if (point > middlePoint) {
    return { x, y };
  }

  return { x: x + robotSize, y };
}

function getRobotLineMovePosition({ x, y, angle, point }) {
  if (point === middlePoint) {
    return { x, y };
  }

  if (point > middlePoint) {
    return { x: x - calcAngle(angle), y: y - robotLineDistance * 2 };
  }

  return { x: x + robotSize + robotLineDistance / 2, y: y + calcAngle(angle) };
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

    const { x: pointX, y: pointY } = getRobotPointPosition(
      points[point].x,
      points[point].y,
      point
    );
    const { x: robotX, y: robotY } = getRobotMovePosition(
      pointX,
      pointY,
      point
    );

    instance.clear();
    instance.lineStyle(robotSize, 0x19bf89);
    instance.moveTo(pointX, pointY);
    instance.lineTo(robotX, robotY);
    instance.endFill();
  },
});

const RobotLine = PixiComponent("RobotLine", {
  create: () => new Graphics(),
  applyProps: (instance, _, props) => {
    const { robot, points } = props;
    const { point, angle } = robot;

    const { x: pointX, y: pointY } = getRobotLinePointPosition({
      x: points[point].x,
      y: points[point].y,
      point,
    });
    const { x: robotLineX, y: robotLineY } = getRobotLineMovePosition({
      x: pointX,
      y: pointY,
      angle,
      point,
    });

    instance.clear();
    instance.lineStyle(robotLineSize, 0xff0000);
    instance.moveTo(pointX, pointY);
    instance.lineTo(robotLineX, robotLineY);
    instance.endFill();
  },
});

export default function MapCanvas() {
  const points = getPoints();
  const [robotData, setRobotData] = useState({
    point: 0,
    angle: 0.5,
  });

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
      <RobotLine robot={robotData} points={points} />
    </Stage>
  );
}

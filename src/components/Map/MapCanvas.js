import React, { useState, useEffect } from "react";
import { Graphics, useTick } from "pixi.js";
import Typography from "@material-ui/core/Typography";
import { Stage, PixiComponent } from "@inlet/react-pixi";

const classSize = 50;
const robotSize = 40;
const robotLineSize = 3;
const lineLength = 20;
const startX = classSize / 2;
const startY = 0;

function getPoints() {
  return [
    '01',
    '02',
    '03',
    '04',
    '05',
  ].map((name, index) =>
    ({ x: startX, y: startY + (classSize * index), name }));
}

function getRobotMovePosition(x, y) {
  return { x: x + robotSize, y };
}

const Map = PixiComponent("Map", {
  create: () => new Graphics(),
  applyProps: (instance, _, props) => {
    const { points } = props;
    instance.clear();
    instance.lineStyle(classSize, 0xe0e0e0);
    instance.moveTo(points[0].x, points[0].y);
    points.forEach(({ x, y }, index) => {
      instance.lineTo(x, y + (classSize));
    });
    instance.endFill();
  },
});

function getRobotCenter(pointIndex, points) {
  const offset = (robotSize / 2);
  const diff = (classSize - robotSize) / 2;
  const pointX = points[pointIndex].x - offset;
  const pointY = points[pointIndex].y + offset + diff;
  
  return { x: pointX + (robotSize / 2),  y: pointY }
}

const Robot = PixiComponent("Robot", {
  create: () => new Graphics(),
  applyProps: (instance, _, props) => {
    const { robot, points } = props;
    const { point } = robot;

    const offset = (robotSize / 2);
    const diff = (classSize - robotSize) / 2;
    const pointX = points[point].x - offset;
    const pointY = points[point].y + offset + diff;
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

function canvas_arrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; // length of head in pixels
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.lineStyle(3, 0x4287f5);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy + 1);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 5), toy - headlen * Math.sin(angle - Math.PI / 5));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 5), toy - headlen * Math.sin(angle + Math.PI / 5));
}

const RobotLine = PixiComponent("RobotLine", {
  create: () => new Graphics(),
  applyProps: (instance, _, props) => {
    const { robot, points } = props;
    const { point, angle } = robot;
    const fixedAngle =  ((angle % 1 * 2) > 1) ? 0.5 : 0;
    const { x: lineStartX, y: lineStartY } = getRobotCenter(point, points);
    const targetX = lineStartX + (lineLength * Math.sin(Math.PI * 2 * fixedAngle));
    const targetY = lineStartY + (lineLength * Math.cos(Math.PI * 2 * fixedAngle));
    instance.clear();
    instance.lineStyle(3, 0x4287f5);
    canvas_arrow(instance, lineStartX, lineStartY, targetX, targetY);
    instance.endFill();
  },
});

export default function MapCanvas() {
  const points = getPoints();
  const [robotData, setRobotData] = useState({ point: 0, angle: .3});
  useEffect(() => {
    function fetchLocation() {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          setRobotData(JSON.parse(this.response));
        }
      };
      xhttp.open("GET", `http://${window.location.hostname}:5500/location`, true);
      xhttp.send();
    }
    const interval = setInterval(() => fetchLocation, 3000);
    fetchLocation();
    return () => clearInterval(interval);
  }, [setRobotData]);

  if (!robotData) {
    return null;
  }
  return (<div style={{ display: 'flex' }}>
    <div style={{ marginRight: 20 }}>
      {getPoints().map(({ name }, index) => (
        <div style={{ height: classSize, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" style={{
            color: robotData.point === index ? '#19bf89' : 'white',
            fontWeight: robotData.point === index ? 'bold' : 'initial',
          }}>
            {name}
          </Typography>
        </div>

      ))}
    </div>
    <Stage
      width={classSize}
      height={classSize * getPoints().length}
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
  </div>);
}

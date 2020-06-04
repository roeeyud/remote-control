import React, { useRef, useEffect } from "react";
import PIXI from "pixi";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function MapDialog({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const renderer = PIXI.autoDetectRenderer(300, 300, {
      view: ref.current,
      backgroundColor: 0x000000,
      antialias: true,
    });

    ref.current.appendChild(renderer.view);

    const stage = new PIXI.Container();

    const points = [
      { x: 100, y: 340 },
      { x: 160, y: 340 },
      { x: 220, y: 340 },
      { x: 280, y: 340 },
      { x: 340, y: 340 },
      { x: 340, y: 160 },
      { x: 340, y: 220 },
      { x: 340, y: 280 },
      { x: 340, y: 340 },
    ];

    const robot = { point: 2, angle: 0.5 };

    function drawLine(points) {
      const graphics = new PIXI.Graphics();
      graphics.lineStyle(60, 0x33ff00);
      graphics.moveTo(points[0].x, points[0].y);
      points.forEach(({ x, y }) => {
        graphics.lineTo(x, y);
      });

      stage.addChild(graphics);
    }

    function calcAngle(number) {
      // number between 1 0
      if (number > 0.5) {
        return (number * 100 * 360) / 100;
      }

      return (number * 100 * 180) / 100;
    }

    function calcY(number) {
      // number between 1 0
      if (number > 0.5) {
        return number * 10 + 5;
      }

      return number * 10 - 5;
    }

    function updateRobot(robot) {
      console.log(calcAngle(robot.angle));
      const graphics = new PIXI.Graphics();
      const size = 40;
      graphics.lineStyle(size, 0xff0000);
      const robotX = points[robot.point].x + size;
      const robotY = points[robot.point].y + calcY(robot.angle);
      graphics.moveTo(points[robot.point].x, points[robot.point].y);
      graphics.lineTo(robotX, robotY);
      // graphics.arc(robotX, robotY, 40, 0, 90);
      // graphics.rotation = 0.1;
      // graphics.drawRoundedRect(-50, -50, 100, 100, 15);
      stage.addChild(graphics);
    }

    function animate() {
      renderer.render(stage);
      requestAnimationFrame(animate);
    }

    drawLine(points);
    updateRobot(robot);
    animate();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Map</DialogTitle>
      <DialogContent>
        <DialogContentText>Some text...</DialogContentText>
        <canvas ref={ref}></canvas>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

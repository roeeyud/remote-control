import React from 'react';

import { Provider as ControllerProvider } from '../context/Controller';
import GamepadController from '../components/GamepadController';
import TouchpadController from '../components/TouchpadController';
import WebSocketConnection from '../components/WebSocketConnection';

export default function Home() {
  return (
    <ControllerProvider>
      <WebSocketConnection />
      <GamepadController />
      <TouchpadController />
    </ControllerProvider>
  );
}

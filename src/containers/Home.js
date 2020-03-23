import React from 'react';

import { Provider as ControllerProvider } from '../context/Controller';
import GamepadController from '../components/GamepadController';
import TouchpadController from '../components/TouchpadController';

export default function Home() {
  return (
    <ControllerProvider>
        <GamepadController />
        <TouchpadController />
    </ControllerProvider>
  );
}

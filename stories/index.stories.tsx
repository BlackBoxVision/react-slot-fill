import { storiesOf } from '@storybook/react';
import React from 'react';
import { Fill, Provider, Slot } from '../src';

storiesOf('Slot-Fill', module).add('Slot-Fill Demo', () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Provider>
      <Slot name="red-box" />
      <Fill name="red-box">
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'red',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Red Box
        </div>
      </Fill>
      <Fill name="green-box">
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'green',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Green Box
        </div>
      </Fill>
      <Slot name="green-box" />
    </Provider>
  </div>
));

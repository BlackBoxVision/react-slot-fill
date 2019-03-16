import { Fill, Provider, Slot } from '@blackbox-vision/react-slot-fill';
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Provider>
          <Slot slotId="red-box" />
          <Fill slotId="red-box">
            <div className="container with-dimensions red">Red Box</div>
          </Fill>
          <Fill slotId="green-box">
            <div className="container with-dimensions green">Green Box</div>
          </Fill>
          <Slot slotId="green-box" />
        </Provider>
      </div>
    );
  }
}

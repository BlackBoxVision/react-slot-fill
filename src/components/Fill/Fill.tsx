import React from 'react';
import { SlotFillContext } from '../../context';

export interface FillProps {
  name: string;
}

class Fill extends React.Component<FillProps> {
  static contextType = SlotFillContext;

  static displayName = 'Fill';

  constructor(props, context) {
    super(props, context);

    if (!context || !context.hasOwnProperty('setFillForSlot')) {
      console.warn(
        `Fill: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`
      );
      return;
    } else {
      if (!props.name) {
        console.warn(`Fill: id is null or undefined.`);
        return;
      }

      if (Array.isArray(props.children) && props.children.length === 0) {
        console.warn(`Fill: children array is empty.`);
        return;
      }

      context.setFillForSlot(props.name, () => props.children);
    }
  }

  render() {
    return false;
  }
}

export default Fill;

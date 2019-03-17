import React from 'react';
import { SlotFillContextProps, withContext } from '../../context';

export interface FillProps {
  name: string;
  ctx: SlotFillContextProps;
}

class Fill extends React.Component<FillProps> {
  static displayName = 'Fill';

  constructor(props) {
    super(props);

    if (!props.ctx || !props.ctx.hasOwnProperty('setFillForSlot')) {
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

      props.ctx.setFillForSlot(props.name, () => props.children);
    }
  }

  render() {
    return false;
  }
}

export default withContext(Fill);

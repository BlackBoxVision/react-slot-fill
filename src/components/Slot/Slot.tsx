import React from 'react';
import { SlotFillContextProps, withContext } from '../../context';

export interface SlotProps {
  name: string;
  ctx: SlotFillContextProps;
}

class Slot extends React.Component<SlotProps> {
  static displayName = 'Slot';

  slotIndex = null;

  constructor(props) {
    super(props);

    props.ctx.subscribe(props.name, slotIndex => {
      console.warn(
        `Slot: Calling suscribe for slotIndex ${slotIndex}, where name is ${
          props.name
        }`
      );

      this.slotIndex = slotIndex;
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    const { name } = this.props;

    if (!this.props.ctx) {
      console.warn(
        `Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`
      );
      return;
    }

    if (this.slotIndex) {
      this.props.ctx.unsubscribe(name, this.slotIndex);
    }
  }

  render() {
    if (!this.props.ctx || !this.props.ctx.hasOwnProperty('getFillForSlot')) {
      console.warn(
        `Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`
      );
      return false;
    }

    if (!this.props.name) {
      console.warn(`Slot: You forget to pass id to <Slot>`);
      return false;
    }

    const renderCallback = this.props.ctx.getFillForSlot(this.props.name);

    return renderCallback();
  }
}

export default withContext(Slot);

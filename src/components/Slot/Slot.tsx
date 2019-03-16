import React from 'react';
import { SlotFillContext } from '../../context';

export interface SlotProps {
  slotId: string;
}

class Slot extends React.Component<SlotProps> {
  static contextType = SlotFillContext;

  static displayName = 'Slot';

  slotIndex = null;

  constructor(props, context) {
    super(props, context);

    context.subscribe(props.slotId, slotIndex => {
      console.warn(
        `Slot: Calling suscribe for slotIndex ${slotIndex}, where slotId is ${
          props.slotId
        }`
      );

      this.slotIndex = slotIndex;
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    const { slotId } = this.props;

    if (!this.context) {
      console.warn(
        `Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`
      );
      return;
    }

    if (this.slotIndex) {
      this.context.unsubscribe(slotId, this.slotIndex);
    }
  }

  render() {
    if (!this.context || !this.context.hasOwnProperty('getFillForSlot')) {
      console.warn(
        `Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`
      );
      return false;
    }

    if (!this.props.slotId) {
      console.warn(`Slot: You forget to pass id to <Slot>`);
      return false;
    }

    const renderCallback = this.context.getFillForSlot(this.props.slotId);

    return renderCallback();
  }
}

export default Slot;

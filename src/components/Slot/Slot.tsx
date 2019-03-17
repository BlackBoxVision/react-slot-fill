import React from 'react';
import { SlotFillContext } from '../../context';

export interface SlotProps {
  name: string;
}

class Slot extends React.Component<SlotProps> {
  static contextType = SlotFillContext;

  static displayName = 'Slot';

  slotIndex = null;

  constructor(props, context) {
    super(props, context);

    context.subscribe(props.name, slotIndex => {
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

    if (!this.context) {
      console.warn(
        `Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`
      );
      return;
    }

    if (this.slotIndex) {
      this.context.unsubscribe(name, this.slotIndex);
    }
  }

  render() {
    if (!this.context || !this.context.hasOwnProperty('getFillForSlot')) {
      console.warn(
        `Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`
      );
      return false;
    }

    if (!this.props.name) {
      console.warn(`Slot: You forget to pass id to <Slot>`);
      return false;
    }

    const renderCallback = this.context.getFillForSlot(this.props.name);

    return renderCallback();
  }
}

export default Slot;

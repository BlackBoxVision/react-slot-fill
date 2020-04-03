import React, { useEffect, useState, useContext } from 'react';

import { SlotFillContext } from '../Provider';

export interface SlotProps {
  children?: React.ReactChildren | null;
  name: string;
}

export const Slot: React.FunctionComponent<SlotProps> = ({
  name,
  children,
  ...rest
}) => {
  const [slotIndex, setSlotIndex] = useState<number | null>(null);
  const { debug, subscribe, unsubscribe, getFillForSlot } = useContext(
    SlotFillContext
  );

  useEffect(() => {
    subscribe(name, (slotIdx: number) => {
      debug &&
        console.warn(
          `Slot: Calling suscribe for slotIndex ${slotIdx}, where name is ${name}`
        );

      setSlotIndex(slotIdx);
    });

    return function willUnmount() {
      slotIndex && unsubscribe(name, slotIndex);
    };
  }, [slotIndex, name]);

  if (!name) {
    debug && console.warn(`Slot: You forget to pass id to <Slot>`);
    return null;
  }

  const renderCallback = getFillForSlot(name);
  const child = renderCallback();

  return child ? React.cloneElement(child, rest) : null;
};

Slot.displayName = 'Slot';

export default Slot;

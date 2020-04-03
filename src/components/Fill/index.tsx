import React, { useContext } from 'react';

import { SlotFillContext } from '../Provider';

export interface FillProps {
  name: string;
  children: any;
}

export const Fill: React.FunctionComponent<FillProps> = ({
  name,
  children,
}) => {
  const { debug, setFillForSlot } = useContext(SlotFillContext);

  if (!name) {
    debug && console.warn(`[Fill]: id is null or undefined.`);
    return null;
  }

  if (Array.isArray(children) && children.length === 0) {
    debug && console.warn(`[Fill]: children array is empty.`);
    return null;
  }

  setFillForSlot(name, () => children);

  return null;
};

Fill.displayName = 'Fill';

export default Fill;

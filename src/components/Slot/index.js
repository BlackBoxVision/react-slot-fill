import React from "react";
import PropTypes from "prop-types";

import { SlotAndFillContext } from '../../context';
import { InnerSlot } from './components/InnerSlot';

export const Slot = (props) => (
    <SlotAndFillContext.Consumer>
        {(context) => <InnerSlot slotId={props.id} context={context}/>}
    </SlotAndFillContext.Consumer>
);

Slot.displayName = "Slot";

Slot.propTypes = {
    id: PropTypes.string.isRequired
};
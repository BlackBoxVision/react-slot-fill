import React from "react";
import PropTypes from "prop-types";

import { SlotAndFillContext } from '../../context';
import { InnerSlot } from './components/InnerSlot';

export class Slot extends React.Component {
    static displayName = "Slot";

    static propTypes = {
        id: PropTypes.string.isRequired
    };

    render() {
        const { id } = this.props;

        return (
            <SlotAndFillContext.Consumer>
                {context => <InnerSlot slotId={id} context={context}/>}
            </SlotAndFillContext.Consumer>
        );
    }
}
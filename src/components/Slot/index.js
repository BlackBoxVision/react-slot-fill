import React from "react";
import PropTypes from "prop-types";

import { SlotAndFillContext } from '../../context';
import InnerSlot from './components/InnerSlot';

export default class Slot extends React.Component {
    static displayName = "Slot";

    static propTypes = {
        id: PropTypes.string.isRequired
    };

    render() {
        const { id } = this.props;

        return (
            <SlotAndFillContext.Consumer>
                {ctx => <InnerSlot id={id} ctx={ctx}/>}
            </SlotAndFillContext.Consumer>
        );
    }
}
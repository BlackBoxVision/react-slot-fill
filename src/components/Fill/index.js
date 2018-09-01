import React from "react";
import PropTypes from "prop-types";

import { SlotAndFillContext } from '../../context';

export default class Fill extends React.Component {
    static displayName = "Fill";

    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.any.isRequired
    };

    render() {
        return (
            <SlotAndFillContext.Consumer>
                {this.setFillForSlot}
            </SlotAndFillContext.Consumer>
        );
    }

    setFillForSlot = (context) => {
        const { id, children } = this.props;

        if (!context.hasOwnProperty("setFillForSlot")) {
            console.warn(`Fill: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
        } else {
            if (!id) {
                console.warn(`Fill: id is null or undefined.`);
                return false;
            }

            if (Array.isArray(children) && children.length === 0) {
                console.warn(`Fill: children array is empty.`);
                return false;
            }

            context.setFillForSlot(this.props.id, () => this.props.children);
        }

        return false;
    };
}
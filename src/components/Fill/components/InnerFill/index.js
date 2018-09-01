import React from "react";
import PropTypes from "prop-types";

export class InnerFill extends React.Component {
    static displayName = "InnerFill";

    static propTypes = {
        slotId: PropTypes.string.isRequired,
        context: PropTypes.shape({
            notify: PropTypes.func,
            subscribe: PropTypes.func.isRequired,
            unsubscribe: PropTypes.func.isRequired,
            setFillForSlot: PropTypes.func.isRequired,
            getFillForSlot: PropTypes.func.isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);

        if (!props.context || !props.context.hasOwnProperty("setFillForSlot")) {
            console.warn(`Fill: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
            return false;
        } else {
            if (!props.slotId) {
                console.warn(`Fill: id is null or undefined.`);
                return false;
            }

            if (Array.isArray(props.children) && props.children.length === 0) {
                console.warn(`Fill: children array is empty.`);
                return false;
            }

            props.context.setFillForSlot(props.slotId, () => props.children);
        }
    }

    render() {
        return null;
    }
}
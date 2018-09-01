import React from "react";
import PropTypes from "prop-types";

export default class InnerSlot extends React.Component {
    static displayName = "InnerSlot";

    static propTypes = {
        context: PropTypes.shape({
            subscribe: PropTypes.func.isRequired,
            setFillForSlot: PropTypes.func.isRequired,
            getFillForSlot: PropTypes.func.isRequired
        }).isRequired
    };

    componentDidMount() {
        const { id, context } = this.props;

        if (!context) {
            console.warn(`Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
            return;
        }

        context.subscribe(id, () => this.forceUpdate());
    }

    render() {
        const { id, context } = this.props;

        if (!context.hasOwnProperty("getFillForSlot")) {
            console.warn(`Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
            return false;
        }

        if (!id) {
            console.warn(`Slot: You forget to pass id to <Slot>`);
            return false;
        }

        const renderCallback = context.getFillForSlot(id);

        if (!renderCallback) {
            console.warn(`Slot: There's no Fill for the following slot id: ${id}`);
        }

        return renderCallback();
    }
}
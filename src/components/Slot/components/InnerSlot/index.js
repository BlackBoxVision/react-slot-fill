import React from "react";
import PropTypes from "prop-types";

export class InnerSlot extends React.Component {
    static displayName = "InnerSlot";

    static propTypes = {
        slotId: PropTypes.string.isRequired,
        context: PropTypes.shape({
            _notify: PropTypes.func,
            subscribe: PropTypes.func.isRequired,
            unsubscribe: PropTypes.func.isRequired,
            setFillForSlot: PropTypes.func.isRequired,
            getFillForSlot: PropTypes.func.isRequired
        }).isRequired
    };

    componentDidMount() {
        const { slotId, context } = this.props;

        if (!context) {
            console.warn(`Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
            return;
        }

        context.subscribe(slotId, () => this.forceUpdate());
    }

    componentWillUnmount() {
        const { slotId, context } = this.props;
        
        if (!context) {
            console.warn(`Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
            return;
        }

        context.unsubscribe(slotId);
    }

    render() {
        const { slotId, context } = this.props;

        if (!context.hasOwnProperty("getFillForSlot")) {
            console.warn(`Slot: context is null or undefined. You need to wrap your App with <SlotAndFillProvider>.`);
            return false;
        }

        if (!slotId) {
            console.warn(`Slot: You forget to pass id to <Slot>`);
            return false;
        }

        const renderCallback = context.getFillForSlot(id);

        if (!renderCallback) {
            console.warn(`Slot: There's no Fill for the following slot id: ${slotId}`);
        }

        return renderCallback();
    }
}
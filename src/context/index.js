import React from 'react';

export class SlotAndFillManager {
    slotsAndFills = new Map();
    subscriptions = [];

    setFillForSlot = (id, renderCallback = () => false) => {
        const fillForSlot = this.getFillForSlot(id);

        if (fillForSlot) {
            console.warn(`SlotAndFillManager: You've already registered a Fill for the following id: ${id}`);
            return;
        }

        this.slotsAndFills.set(id, renderCallback);
    };

    getFillForSlot = (id, renderCallback = () => false) => {
        const fillById = this.slotsAndFills.get(id);

        if (!fillById) {
            console.warn(`SlotAndFillManager: There's no Fill registered for the following id: ${id}`);
            return renderCallback;
        }

        return fillById;
    };

    subscribe = (id, callback) => {
        
    }
}

export const SlotAndFillContext = React.createContext(null);
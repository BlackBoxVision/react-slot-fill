import React from "react"; 

import SF from 'react-slot-and-fill';

export default class App extends React.Component {
    render() {
        return (
            <SF.Provider>
                <SF.Slot id="mySlot" />
                <SF.Fill id="mySlot">
                    <div style={{ width: 300, height: 300, backgroundColor: "red", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                        Hello World
                    </div>
                </SF.Fill>
            </SF.Provider>
        );
    }
}

import React from "react"; 

import SF from 'react-slot-and-fill';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <SF.Provider>
                    <SF.Slot id="red-box" />
                    <SF.Fill id="red-box">
                        <div className="container with-dimensions red">
                            Red Box
                        </div>
                    </SF.Fill>
                    <SF.Fill id="green-box">
                        <div className="container with-dimensions green">
                            Green Box
                        </div>
                    </SF.Fill>
                    <SF.Slot id="green-box" />
                </SF.Provider>
            </div>
        );
    }
}

import React from "react";
import "./Test.scss";


export class Test extends React.Component {
    render() {
        return (
            <div className={"test"} onClick={this.onClick}>
                <div>hello</div>
                <div>11</div>
            </div>
        )
    }

    private onClick() {
        console.log("232");
    }

}
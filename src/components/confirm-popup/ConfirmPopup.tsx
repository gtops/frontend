import {IConfirmPopupProps} from "./IConfirmPopupProps";
import React from "react";
import {autobind} from "core-decorators";

@autobind
export class ConfirmPopup extends React.Component<IConfirmPopupProps> {
   render(): React.ReactNode {
       return (
           this.props.isVisible
               ? <div className={"popup-wrapper"}>
                   <div className={"popup -type-confirm"}>
                       {this.props.popupText}
                       <div className={"popup__close-icon"} onClick={this.props.onCancel}/>
                       <div>
                           <div className={"button"} onClick={this.props.onSubmit}>Да</div>
                           <div className={"button"} onClick={this.props.onCancel}>Нет</div>
                       </div>
                   </div>
               </div>
               : <div style={{position:"absolute"}}/>
       )
   }
}
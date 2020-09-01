export interface IConfirmPopupProps {
    isVisible: boolean;
    popupText: string;

    onSubmit: () => void;
    onCancel: () => void;
}
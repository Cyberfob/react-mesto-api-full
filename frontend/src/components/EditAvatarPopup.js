import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
        avatarRef.current.value = "";
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonName={props.buttonName}
            onSubmit={handleSubmit}
        >
            <fieldset className="modal__fieldset">
                <label className="modal__lable">
                    <input
                        ref={avatarRef}
                        required
                        className="modal__input modal__input_type_link"
                        id="linkInputAvatar"
                        name="link"
                        placeholder="Ссылка на фото"
                        type="url"
                        defaultValue=""
                        autoComplete="off"
                    />
                    <span
                        className="modal__input-error"
                        id="linkInputAvatarError"
                    />
                </label>
            </fieldset>
        </PopupWithForm>
    );
}

import React from "react"
import { UserDataContext } from "../contexts/CurrentUserContext"
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {
    const userData = React.useContext(UserDataContext)

    const [nameValue, setNameValue] = React.useState('');
    const [aboutValue, setAboutValue] = React.useState('');

    function handleChangeName(e) {
        setNameValue(e.target.value)
    }

    function handleChangeAbout(e) {
        setAboutValue(e.target.value)
    }

    React.useEffect(() => {
        setNameValue(userData.name)
        setAboutValue(userData.about)
    }, [userData, props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: nameValue,
            about: aboutValue,
        }
        );
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen}
            onClose={props.onClose} onSubmit={handleSubmit} buttonName={props.buttonName} >

            <fieldset className="modal__fieldset">
                <label className="modal__lable">
                    <input autoComplete="off" required className="modal__input modal__input_type_name" id="nameInput"
                        name="name" minLength="2" maxLength="40" placeholder="Введите ваше имя" type="text" value={nameValue || ''}
                        onChange={handleChangeName} />
                    <span className="modal__input-error" id="nameInputError"></span>
                </label>
                <label className="modal__lable">
                    <input required className="modal__input modal__input_type_about" id="aboutInput" minLength="2"
                        name="about" maxLength="200" placeholder="Введите информацию о себе" autoComplete="off"
                        type="text" value={aboutValue || ''} onChange={handleChangeAbout} />
                    <span className="modal__input-error" id="aboutInputError"></span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}
import React, { useState } from "react";

const Login = (props) => {
    const [authState, setAuthState] = useState({ password: '', email: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setAuthState((prevent) => ({
            ...prevent, [name]: value

        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, email } = authState

        if (props.onLogin) {
            props.onLogin(password, email)
        }
    }

    return (
        <form className="form-auth" onSubmit={handleSubmit} >
            <fieldset className="modal__fieldset">
                <h2 className="modal__title modal__title_auth">Вход</h2>
                <label className="modal__lable ">
                    <input onChange={handleChange} autoComplete="off" required className="modal__input modal__input_type_name modal__input_type_auth" id="nameInput"
                        name="email" minLength="2" maxLength="40" placeholder="Email" type="email" value={authState.email || ''}  //{nameValue}
                    />
                    <span className="modal__input-error" id="nameInputError"></span>
                </label>
                <label className="modal__lable">
                    <input onChange={handleChange} required className="modal__input modal__input_type_about modal__input_type_auth" id="aboutInput" minLength="2"
                        name="password" maxLength="200" placeholder="Пароль" autoComplete="off"
                        type="password" value={authState.password || ''} />
                    <span className="modal__input-error" id="aboutInputError"></span>
                </label>
                <button className="modal__submit modal__submit_auth" type="submit" value="Сохранить" >Войти</button>
            </fieldset>
            {props.children}
        </form>

    )
}
export default Login
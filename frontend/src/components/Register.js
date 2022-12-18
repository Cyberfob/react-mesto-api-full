import React, { useState } from "react";


const Register = (props) => {
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

        if (props.onRegister) {
            props.onRegister(password, email)
        }
    }

    return (
        <form className="form-auth" onSubmit={handleSubmit}>
            {props.children}
            <fieldset className="modal__fieldset">
                <h2 className="modal__title modal__title_auth">Регистрация</h2>
                <label className="modal__lable ">
                    <input onChange={handleChange} autoComplete="off" required className="modal__input modal__input_type_name modal__input_type_auth" id="nameInput"
                        name="email" minLength="2" maxLength="40" placeholder="Email" type="email" value={authState.email || ''} />
                    <span className="modal__input-error" id="nameInputError"></span>
                </label>
                <label className="modal__lable">
                    <input onChange={handleChange} required className="modal__input modal__input_type_about modal__input_type_auth" id="aboutInput" minLength="2"
                        name="password" maxLength="200" placeholder="Пароль" autoComplete="off"
                        type="password" value={authState.password || ''} />
                    <span className="modal__input-error" id="aboutInputError"></span>
                </label>
                <button className="modal__submit modal__submit_auth" type="submit" value="Сохранить" >Зарегистрироваться</button>
                <p style={{ fontWeight: 400, fontSize: 14 }}>Уже зарегистрированы? <a href="/siginin" style={{ color: 'white', textDecoration: "none" }} >Войти</a></p>
            </fieldset>
        </form>

    )
}

export default Register
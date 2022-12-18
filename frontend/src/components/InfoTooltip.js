import React from "react";
import fail from "../images/fail.svg"
import success from "../images/success.svg"

const InfoTooltip = (props) => {


    return (
        <>
            <section onSubmit={props.onSubmit} className={`popup popup_type_auth ${props.isOpen && 'popup_active'}`}>
                <div className="popup__overlay" onClick={props.onClose}></div>
                <button className="popup__close-btn popup__close-btn_type_confirmation" type="button"
                    aria-label="confirmation" onClick={props.onClose}></button>
                <div className="modal" style={props.style}>
                    {!props.auth && <h2 className="modal__title">{props.title}</h2>}
                    <div className="modal__form " name={props.name}>
                        {props.authState === "fail" && <>
                            <img alt="Fail" src={fail} style={{ width: 120, height: 120, position: 'centre', margin: "auto", marginTop: 60, marginBottom: 32 }}></img>
                            <h2 style={{ fontWeight: 900, fontSize: 24, textAlign: "center", margin: 32, marginTop: 0, marginBottom: 60 }}>Что-то пошло не так! Попробуйте ещё раз.</h2>
                        </>}
                        {props.authState === "success" && <>
                            <img alt="Success" src={success} style={{ width: 120, height: 120, position: 'centre', margin: "auto", marginTop: 60, marginBottom: 32 }}></img>
                            <h2 style={{ fontWeight: 900, fontSize: 24, textAlign: "center", margin: 32, marginTop: 0, marginBottom: 60 }}>Вы успешно зарегистрировались!</h2>
                        </>}
                    </div>
                </div>
            </section>
        </>






    )
}

export default InfoTooltip

// {props.authState === "fail" &&
// <PopupWithForm auth={props.auth} name="auth" isOpen={props.isOpen} onClose={props.onClose} style={{ padding: 0 }} >
//     <img alt="Fail" src={fail} style={{ width: 120, height: 120, position: 'centre', margin: "auto", marginTop: 60, marginBottom: 32 }}></img>
//     <h2 style={{ fontWeight: 900, fontSize: 24, textAlign: "center", margin: 32, marginTop: 0, marginBottom: 60 }}>Что-то пошло не так! Попробуйте ещё раз.</h2>
// </PopupWithForm>}
// {props.authState === "success" &&
// <PopupWithForm auth={props.auth} name="auth" isOpen={props.isOpen} onClose={props.onClose} style={{ padding: 0 }} >
//     <img alt="Success" src={success} style={{ width: 120, height: 120, position: 'centre', margin: "auto", marginTop: 60, marginBottom: 32 }}></img>
//     <h2 style={{ fontWeight: 900, fontSize: 24, textAlign: "center", margin: 32, marginTop: 0, marginBottom: 60 }}>Вы успешно зарегистрировались!</h2>
// </PopupWithForm>}
export default function PopupWithForm(props) {
    return (
        <section onSubmit={props.onSubmit} className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <button className="popup__close-btn popup__close-btn_type_confirmation" type="button"
                aria-label="confirmation" onClick={props.onClose}></button>
            <div className="modal" style={props.style}>
                {!props.auth && <h2 className="modal__title">{props.title}</h2>}
                <form className="modal__form " name={props.name}>
                    {props.children}
                    {!props.auth && <button className="modal__submit" type="submit" value="Сохранить" >{props.buttonName}</button>}
                </form>
            </div>
        </section>
    )
}
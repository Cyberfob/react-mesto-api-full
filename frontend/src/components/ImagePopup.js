export default function ImagePopup (props) {
    return(
        <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`}>
            <div className="popup__overlay" onClick={props.onClose}></div>
            <button className="popup__close-btn popup__close-btn_margin-left   popup__close-btn_type_pictures" type="button"
                    aria-label="Close" onClick={props.onClose}></button>
            <div className="frame">
                <img className="frame__img" src={props.card.link} alt={props.card.name} />
                <h2 className="frame__title">{props.card.name}</h2>
            </div>
    </section>
    )
}
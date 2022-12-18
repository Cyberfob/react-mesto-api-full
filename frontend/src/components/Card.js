import React from "react"
import { UserDataContext } from "../contexts/CurrentUserContext"

export default function Card(props) {
    const userData = React.useContext(UserDataContext)

    const isOwner = props.card.owner._id === userData._id
    const cardTrashcanButtonClassName = (`card__trashcan-btn ${!isOwner && 'card__trashcan-btn_hidden'}`)
    const isLiked = props.card.likes.some(user => user._id === userData._id)
    const cardLikeButtonState = `card__like ${isLiked && 'card__like_active'}`

    function handleLikeClick(card) {
        props.onCardLike(card)
    }

    function handleDeleteCard(card) {
        props.onCardDelete(card)
    }

    return (
        <div className="card">
            <button className={cardTrashcanButtonClassName} onClick={handleDeleteCard} type="button"></button>
            <img className="card__img" src={props.card.link} alt={props.card.name} onClick={() => { props.onCardClick(props.card) }} />
            <div className="card__footer">
                <h3 className="card__title">{props.card.name}</h3>
                <div className="card__like-container">
                    <button className={cardLikeButtonState} type="button" onClick={handleLikeClick}></button>
                    <div className="card__like-counter">{props.card.likes.length}</div>
                </div>
            </div>
        </div>
    )
}
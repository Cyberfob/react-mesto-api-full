import React from "react"
import { UserDataContext } from "../contexts/CurrentUserContext"

export default function Card(props) {
    const userData = React.useContext(UserDataContext)

    const isOwner = props.card.owner === userData._id
    const cardTrashcanButtonClassName = (`card__trashcan-btn ${!isOwner && 'card__trashcan-btn_hidden'}`)
    let isLiked = false //= props.card.likes.some(user => user === userData._id) Метод some не работает, при записи card.likes.some(i=> i === user) - в i попадает объект целиком
        for (let index = 0; index < props.card.likes.length; index++) {
            if (props.card.likes[index] === userData._id) {
                isLiked = true;
                break;
            }
        }
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
                    <button className={cardLikeButtonState} type="button" onClick={() => {(handleLikeClick(props.card))}}></button>
                    <div className="card__like-counter">{props.card.likes.length}</div>
                </div>
            </div>
        </div>
    )
}
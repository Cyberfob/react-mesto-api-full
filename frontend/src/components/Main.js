import React from "react"
import { UserDataContext } from "../contexts/CurrentUserContext"
//import api from "../utils/Api"
import Card from './Card'

export default function Main (props) {
    
    const userData = React.useContext(UserDataContext)

    return (
        <main className="content">
        
        <section className="profile">
            <div className="profile__container">
                <div className="profile__foto-overlay" onClick={props.onEditAvatar}></div>
                <img className="profile__foto" src={userData.avatar}   alt={userData.name}/>
                <div className="profile__data">
                    <div className="profile__info">
                        <h1 className="profile__name">{userData.name}</h1>
                        <button className="profile__btn" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__about">{userData.about}</p>
                </div>
            </div>
            <button className="profile__add-btn" aria-label="addButton" type="button" onClick={props.onAddPlace}></button>
        </section>
        
        <section className="cards">
        {props.cards.map(item=> {
            return (
                <Card key={item._id} onCardClick = {props.onCardClick} card={item} 
                        onCardDelete = {()=>{props.onCardDelete(item)}} onCardLike={()=>props.onCardLike(item)} />
                )
        })}
        </section>
    </main>
    )
}


import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React, { useState } from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { UserDataContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

//Компонент App
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});

    const [currentUser, setCurrentUser] = useState({});
    const [authState, setAuthState] = useState("");

    const [cards, setCards] = React.useState([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    

    React.useEffect(() => {
        checkToken();
        api
            .getInitCards()
            .then(response => {
                console.log(response.data);
                setCards(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function checkToken() {
        const jwt = localStorage.getItem('jwt')
        if (!jwt) return;
        auth.checkToken(jwt).then((data) => {
          setIsLoggedIn(true);
          setUserData({
            email: data.email
          });
          setCurrentUser({
            name: data.name,
            about: data.about,
            avatar: data.avatar,
            _id: data._id
          })
          navigate('/');
        }).catch((err) => {
          console.log(err)
        });
      }

      const handleLogin = async (password, email) => {
        const data = await auth.login(password, email);
          if (!data.token)
              throw new Error('jwt error');
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          api.getInitCards()
              .then((res) => {
                  setCards(res.data);
              }).catch((err) => {
                  console.log(err);
              });
              api.getUserInfo()
              .then(res => {
                  console.log(res)
                  console.log(res.data)
                  setCurrentUser(res.data);
          })
          .catch(err => {
              console.log(`Ошибка при запросе данных пользователя:\n ${err}`);
          });
          navigate("/");
      };

    function handleDeleteCard(card) {
        api.removeCard(card._id)
            .then(() => {
                setCards(() => cards.filter(c => c._id !== card._id));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
       //const isLiked = card.likes.some((i) => i === currentUser._id); Метод some не работает, при записи card.likes.some(i=> i === user) - в i попадает объект целиком
        let isLiked = false
            for (let index = 0; index < card.likes.length; ++index) {
                if (card.likes[index] === currentUser._id) {
                    isLiked = true;
                    break;
                }   
            }
        api.setLike(card._id, isLiked)
        .then(newCard => {
            setCards(state => state.map(c => (c._id === card._id ? newCard.data : c))
            );
        })
        .catch(err => {
            console.log(err);
        });    
    }

    

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsStatusPopupOpen(false);
        setAuthState("");
        setSelectedCard({});
    }

    function handleUpdateUser({ name, about }) {
        api.setUserInfo({ name, about })
            .then(res => {
                currentUser.name = res.data.name;
                currentUser.about = res.data.about;
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(link) {
        api.setProfileAvatar(link)
            .then(res => {
                currentUser.avatar = res.data.avatar;
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleAddPlace({ name, link }) {
        api.addCard({ name, link })
            .then(newCards => {
                setCards([newCards.data, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleRegister = (password, email) => {
        auth.register(password, email)
            .then(res => {
                //console.log(res);
                if (res) {
                    setAuthState("success");
                    setIsStatusPopupOpen(true);
                    //navigate('/siginin')
                    //console.log(authState);
                    //console.log(isStatusPopupOpen);
                }
                else {
                    setIsStatusPopupOpen(true);
                    setAuthState("fail");
                }
            })
            .catch(res => {
                if (res.message) console.log(authState);
                setIsStatusPopupOpen(true);
                setAuthState("fail");
            });
    };

    React.useEffect(() => {
        if (localStorage.getItem("jwt")) {
           auth.checkToken(localStorage.getItem("jwt"))
                .then(res => {
                    if (res) {
                        //console.log(res)
                        setIsLoggedIn(true);
                        setUserData({ email: res.data.email });
                        //console.log(userData)
                        navigate("/");
                    }
                    else {
                        navigate("/siginup");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

   

   /* const handleLogin = (password, email) => {
        auth.login(password, email)
            .then(res => {
                if (res.token) {
                    console.log(res.token)
                    localStorage.setItem("jwt", res.token);
                    setIsLoggedIn(true);
                    setUserData({ email: email, password: password });
                    
                    //console.log(userData);
                    navigate("/");
                }
            })
            .catch(res => {
                if (res.message) console.log(authState);
                setIsStatusPopupOpen(true);
                setAuthState("fail");
            });
            auth.checkToken(localStorage.getItem("jwt"));
            api.getUserInfo()
                        .then(response => {
                            console.log(response)
                            console.log(response.data)
                            setCurrentUser(...response.data);
                    })
                    .catch(err => {
                        console.log(`Ошибка при запросе данных пользователя:\n ${err}`);
                    });
    };*/

    React.useEffect(() => {
        api.getUserInfo()
            .then(response => {
                setCurrentUser(response.data);
            })
            .catch(err => {
                console.log(`Ошибка при запросе данных пользователя:\n ${err}`);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setUserData({});
    };

    React.useEffect(() => {

        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    return (
        <UserDataContext.Provider value={currentUser}>
            <div className="app">
                <div className="page">
                    <Header
                        isLoggedIn={isLoggedIn}
                        userData={userData.email}
                        handleLogout={handleLogout}
                    />
                    <Routes>
                        {/* Sigin-up Регистрация */}
                        <Route
                            path="/siginup"
                            exact
                            element={
                                <Register onRegister={handleRegister}>
                                    <InfoTooltip
                                        authState={authState}
                                        auth={true}
                                        onClose={closeAllPopups}
                                        isOpen={isStatusPopupOpen}
                                    />
                                </Register>
                            }
                        />

                        {/* Sigin-in Авторизация */}
                        <Route
                            path="/siginin"
                            exact
                            element={
                                <Login onLogin={handleLogin}>
                                    <InfoTooltip
                                        authState={authState}
                                        auth={true}
                                        onClose={closeAllPopups}
                                        isOpen={isStatusPopupOpen}
                                    />
                                </Login>
                            }
                        />

                        {/* Main frame */}
                        <Route
                            path="/"
                            exact
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    {/* Попап Профиля */}
                                    <EditProfilePopup
                                        onUpdateUser={handleUpdateUser}
                                        isOpen={isEditProfilePopupOpen}
                                        onClose={closeAllPopups}
                                        buttonName="Сохранить"
                                    />

                                    {/* Попап Аватара */}
                                    <EditAvatarPopup
                                        onUpdateAvatar={handleUpdateAvatar}
                                        isOpen={isEditAvatarPopupOpen}
                                        onClose={closeAllPopups}
                                        buttonName="Сохранить"
                                    />

                                    {/* Попап Новое место */}
                                    <AddPlacePopup
                                        onAddPlace={handleAddPlace}
                                        isOpen={isAddPlacePopupOpen}
                                        onClose={closeAllPopups}
                                        buttonName="Создать"
                                    />

                                    {/* Попап просмотра изображения */}
                                    <ImagePopup
                                        name="pictures"
                                        card={selectedCard}
                                        isOpen={isImagePopupOpen}
                                        onClose={closeAllPopups}
                                    />

                                    <Main
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        onCardClick={handleCardClick}
                                        cards={cards}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleDeleteCard}
                                    />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </div>
            </div>
        </UserDataContext.Provider>
    );
}

export default App;

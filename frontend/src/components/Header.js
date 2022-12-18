import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header(props) {
    const location = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <div className="header__conteiner">
                <p>
                    {props.userData}
                </p>
                {props.isLoggedIn
                    ? <Link
                        className="header__link"
                        onClick={props.handleLogout}
                        to="/siginup"
                    >
                        Выйти
                    </Link>
                    : location.pathname === "/siginin"
                        ? <Link className="header__link" to="/siginup">
                            Регистрация
                        </Link>
                        : location.pathname === "/siginup" &&
                        <Link className="header__link" to="/siginin">
                            Войти
                        </Link>}
            </div>
        </header>
    );
}

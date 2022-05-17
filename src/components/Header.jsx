import React, {useState} from 'react';
import '@styles/Header.scss';
import Menu from '@components/Menu';
import menu from '@Iconos/icon_menu.svg';
import logo from '@Logos/logo_yard_sale.svg';
import shoppingCart from "@Iconos/icon_shopping_cart.svg";

const Header = () => {
    const [toggle, setToggle] = useState (false);

    const handleToggle = () => {
        setToggle(!toggle);
    }
    return (
    <nav>
      <img src={menu} alt="menu" className="menu"/>
        <div className="navbar-left">
            <img src={logo} alt="logo" className="nav-logo"/>
                <ul>
                    <li>
                        <a href="/">Categorias</a>
                    </li>
                    <li>
                        <a href="/">Todos</a>
                    </li>
                    <li>
                        <a href="/">Ropa</a>
                    </li>
                    <li>
                        <a href="/">Electronica</a>
                    </li>
                    <li>
                        <a href="/">Muebles</a>
                    </li>
                    <li>
                        <a href="/">Juguetes</a>
                    </li>
                    <li>
                        <a href="/">Otros</a>
                    </li>
                </ul>
        </div>
        <div className="navbar-right">
            <ul>
                <li className="navbar-email" onClick={handleToggle}> info@consultasejemplo.com </li>
                <li className="navbar-shopping-cart">
                    <img src={shoppingCart} alt="shopping cart"/>
                        <div>2</div>
                </li>
            </ul>
        </div>
        {toggle && <Menu/>}
      </nav>
    );
}

export default Header;
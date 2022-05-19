import React, { useState, useContext } from 'react';
import '@styles/Header.scss';
import Menu from '@components/Menu';
import MyOrder from '@containers/MyOrder';
import menu from '@Iconos/icon_menu.svg';
import logo from '@Logos/logo_yard_sale.svg';
import AppContext from '@context/AppContext';
import shoppingCart from "@Iconos/icon_shopping_cart.svg";

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const [toggleOrders, setToggleOrders] = useState(false);
    const { state } = useContext(AppContext);

    const handleToggle = () => {
        setToggle(!toggle);
    }
    return (
        <nav>
            <img src={menu} alt="menu" className="menu" />
            <div className="navbar-left">
                <img src={logo} alt="logo" className="nav-logo" />
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
                    <li className="navbar-shopping-cart" onClick={() => setToggleOrders(!toggleOrders)}>
                        <img src={shoppingCart} alt="shopping cart" />
                        {state.cart.length > 0 ? <div>{state.cart.length}</div> : null}
                    </li>
                </ul>
            </div>
            {toggle && <Menu />}
            {toggleOrders && <MyOrder />}
        </nav>
    );
}

export default Header;
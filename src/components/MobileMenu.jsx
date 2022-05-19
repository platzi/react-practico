import React from 'react';
import '@styles/MobileMenu.scss';

const MobileMenu = () => {
    return (
        <div class="mobile-menu">
            <ul>
                <li>
                    <p>Categorias</p>
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

                <ul>
                <li>
                    <a href="/account">Mi Cuenta</a>
                </li>
                </ul>

                <ul>
                <li>
                    <a href="/account" class="email">info@consultasejemplo.com</a>
                </li>
                <li>
                    <a href="/signup" class="sign-out">Sign out</a>
                </li>
            </ul>
        </div>
    );
}

export default MobileMenu;
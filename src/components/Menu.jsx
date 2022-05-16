import React from 'react';
import '@styles/Menu.scss';

const Menu = () => {
	return (
		<div className="Menu">
			<ul>
				<li>
					<a href="/" className="title">Mis Ordenes</a>
				</li>
				<li>
					<a href="/">Mi Cuenta</a>
				</li>
				<li>
					<a href="/">Inscribirse</a>
				</li>
			</ul>
		</div>
	);
}

export default Menu;

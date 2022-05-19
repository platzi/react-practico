import React from 'react';
import '@styles/Menu.scss';

const Menu = () => {
	return (
		<div className="Menu">
			<ul>
				<li>
					<a href="/account">Mi Cuenta</a>
				</li>
				<li>
					<a href="/signup">Acceder</a>
				</li>
			</ul>
		</div>
	);
}

export default Menu;
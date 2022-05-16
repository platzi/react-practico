import React from 'react';
import '@styles/Order.scss';

const Order = () => {
	return (
		<div className="Order">
			<p>
				<span>02.05.22</span>
				<span>Articulos</span>
			</p>
			<p>$5.000</p>
			<img src="./icons/flechita.svg" alt="arrow" />
		</div>
	);
}

export default Order;

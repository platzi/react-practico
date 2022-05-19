import React from 'react';
import '@styles/Order.scss';
import flechita from '@Iconos/flechita.svg';

const Order = () => {
	return (
		<div className="Order">
			<p>
				<span>02.05.22</span>
				<span>7 articulos</span>
			</p>
			<p>$5.000</p>
			<img src={flechita} alt="arrow"/>
		</div>
	);
}

export default Order;
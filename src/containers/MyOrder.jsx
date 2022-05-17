import React from 'react';
import OrderItem from '../components/OrderItem';
import '@styles/MyOrder.scss';
import arrow from '@icons/flechita.svg';


const MyOrder = () => {
	return (
		<aside className="MyOrder">
			<div className="title-container">
			<img src={arrow} alt="arrow" />
				<p className="title">Mi Orden</p>
			</div>
			<div className="my-order-content">
				<OrderItem />
				<div className="order">
					<p>
						<span>Total</span>
					</p>
					<p>$5.000</p>
				</div>
				<button className="primary-button">
					Verificar
				</button>
			</div>
		</aside>
	);
}

export default MyOrder;

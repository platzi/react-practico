import React, { useContext } from 'react';
import OrderItem from '@components/OrderItem';
import AppContext from '@context/AppContext';
import '@styles/Orders.scss';
import arrow from '@Iconos/flechita.svg';

const Orders = ({ setToggle }) => {
	const { state } = useContext(AppContext);

	return (
		<div className="Orders">
			<div className="Orders-container">
				<div className="title-container" onClick={() => setToggle(false)}>
					<img src={arrow} alt="arrow" />
					<h1 className="title">Mis Ordenes</h1>
				</div>
				<div className="Orders-content">
					{state.cart.map((product) => (
						<OrderItem
							product={product}
							key={`orderItem-${product.id}`}
						/>
					))}
				</div>
				<div className="order">
					<p>
						<span>Total</span>
					</p>
					<p>${state.total}</p>
				</div>
				<a href="/checkout"><button className="primary-button"> Verificar </button></a>
			</div>
		</div>
	);
}

export default Orders;
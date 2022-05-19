import React, { useContext, useState } from 'react';
import AppContext from '@context/AppContext';
import OrderItem from '@components/OrderItem';
import '@styles/MyOrder.scss';
import Checkout from '@pages/Checkout';
import arrow from '@Iconos/flechita.svg';

const MyOrder = ({ toggleOrders, setToggleOrders }) => {
	const [toggle, setToggle] = useState(false);
	const { state } = useContext(AppContext);

	return (
		<aside className="MyOrder">
			<div
				className="title-container"
				onClick={() => setToggleOrders(!toggleOrders)}
			>
				<img src={arrow} alt="arrow" />
				<p className="title">Mi Orden</p>
			</div>
			<div className="my-order-content">
				{state.cart.map((product) => (
					<OrderItem product={product} key={`orderItem-${product.id}`} />
				))}
				<div className="order">
					<p>
						<span>Total</span>
					</p>
					<p>${state.total}</p>
				</div>
				<button className="primary-button" onClick={() => setToggle(true)}> Verificar </button>
			</div>
			{toggle && <Checkout setToggle={setToggle} />}
		</aside>
	);
}

export default MyOrder;
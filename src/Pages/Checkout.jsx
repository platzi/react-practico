import React from 'react';
import OrderItem from '../components/OrderItem';
import Menu from '../components/Menu';
import '@styles/Checkout.scss';

const Checkout = () => {
	return (
		<div className="Checkout">
			<div className="Checkout-container">
				<h1 className="title">Mi Orden</h1>
				<div className="Checkout-content">
					<div className="order">
						<p>
							<span>02.05.22</span>
							<span>Articulos</span>
						</p>
						<p>$5.000</p>
					</div>
				</div>
				<OrderItem />
			</div>
		</div>
	);
}

export default Checkout;

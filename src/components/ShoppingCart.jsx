import React from 'react';
import '@styles/ShoppingCartItem.scss';

const ShoppingCartItem = () => {
	return (
		<div className="ShoppingCartItem">
			<figure>
				<img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bike" />
			</figure>
			<p>Bici</p>
			<p>$5.000</p>
		</div>
	);
}

export default ShoppingCartItem;
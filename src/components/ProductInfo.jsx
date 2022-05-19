import React from 'react';
import '@styles/ProductInfo.scss';
import addToCart from '@Iconos/bt_add_to_cart.svg';

const ProductInfo = () => {
	return (
		<>
			<img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="bike" />
			<div className="ProductInfo">
				<p>$5.000</p>
				<p>Bicicleta</p>
				<p>Bicicleta de carreras, 24 velocidades, frenos a disco, muy buena para entrenar.</p>
				<button className="primary-button add-to-cart-button">
					<img src={addToCart} alt="add to cart" />
					Agregar
				</button>
			</div>
		</>
	);
}

export default ProductInfo;

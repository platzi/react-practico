import React from 'react';
import '@styles/ProductInfo.scss';
import addToCart from '@Iconos/bt_add_to_cart.svg';

const ProductInfo = ({ product, setToggleProduct, handleClick }) => {
	const addToCartAndClose = () => {
		handleClick(product);
		setToggleProduct(false);
	}

	return (
		<>
			<img src={product.images[0]} alt={product.name} className="product" />
			<div className="ProductInfo">
				<p>${product.price}</p>
				<p>{product.name}</p>
				<p>{product.description}</p>
				<button className="primary-button add-to-cart-button" onClick={addToCartAndClose} >
					<img src={addToCart} alt="add to cart" /> Agregar </button>
			</div>
		</>
	);
}

export default ProductInfo;
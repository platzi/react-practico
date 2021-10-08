import React, { useContext } from 'react';
import '@styles/ProductItem.scss';
import AppContext from '../context/AppContext';
import addToCartImage from '@icons/bt_add_to_cart.svg';
import addedToCartImage from '@icons/bt_added_to_cart.svg';

const ProductItem = ({ product }) => {
	const { state, addToCart } = useContext(AppContext);

	const handleClick = item => {
		console.log('in cart: ', state.cart.includes(item));
		addToCart(item)
	}

	return (
		<div className="ProductItem">
			<img src={product.images[0]} alt={product.title} />
			<div className="product-info">
				<div>
					<p>${product.price}</p>
					<p>{product.title}</p>
				</div>
				<figure className="more-clickable-area" onClick={() => handleClick(product)} >
					{  state.cart.includes(product) ? <img className="disabled add-to-cart-btn" src={addedToCartImage} alt="added to cart" />  : <img className="add-to-cart-btn pointer" src={addToCartImage} alt="add to cart" /> }
					
				</figure>
			</div>
		</div>
	);
}

export default ProductItem;

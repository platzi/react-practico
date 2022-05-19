import React, { useContext, useState } from 'react';
import '@styles/ProductItem.scss';
import AppContext from '@context/AppContext';
import ProductDetail from '@containers/ProductDetail';

import addToCartImage from '@Iconos/bt_add_to_cart.svg';
import addedToCartImage from '@Iconos/bt_added_to_cart.svg'

const ProductItem = ({ product }) => {
	const [ toggleProduct, setToggleProduct ] = useState(false);
	const { state, addToCart } = useContext(AppContext);

	const handleClick = (item) => {
		if(state.cart.includes(item)) {
			return;
		} else {
			addToCart(item);
		}
	}

	const verifyAdded = (item) => {
		if(state.cart.includes(item)) {
			return addedToCartImage;
		} else {
			return addToCartImage;
		}
	}

	return (
		<div className="ProductItem">
			<img
				src={product.images[0]}
				loading="lazy" alt={product.title} className="productImage"
				onClick={() => setToggleProduct(!toggleProduct)}
			/>
			<div className="product-info">
				<div>
					<p>${product.price}</p>
					<p>{product.title}</p>
				</div>
				<figure
					onClick={() => handleClick(product)}
				>
					<img src={verifyAdded(product)}/>
				</figure>
			</div>
			{toggleProduct && <ProductDetail
				product={product}
				setToggleProduct={setToggleProduct}
				handleClick={handleClick}
			/>}
		</div>
	);
}

export default ProductItem;
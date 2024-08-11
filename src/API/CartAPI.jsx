import axiosClient from './axiosClient';

const CartAPI = {
	getCarts: () => {
		const url = `/cart`;
		return axiosClient.get(url);
	},

	postAddToCart: (body) => {
		const url = `/cart`;
		return axiosClient.put(url, body);
	},

	deleteToCart: (idProduct) => {
		const url = `/cart/${idProduct}`;
		return axiosClient.delete(url);
	},

	getTotalCart : () => {
		const url = `/cart/total`;
		return axiosClient.get(url);
	},

	patchToCart: (query) => {
		const url = `/cart/${query.idProduct}`;
		return axiosClient.patch(url, {quantity: query.count});
	},
};

export default CartAPI;

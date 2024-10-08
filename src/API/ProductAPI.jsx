import axiosClient from './axiosClient';

const ProductAPI = {
	getAPI: (query) => {
		const url = `/products${query}`;
		return axiosClient.get(url);
	},

	getDetail: (id) => {
		const url = `/products/${id}`;
		return axiosClient.get(url);
	},

	getPagination: (query) => {
		const url = `/products/pagination${query}`;
		return axiosClient.get(url);
	},

};

export default ProductAPI;

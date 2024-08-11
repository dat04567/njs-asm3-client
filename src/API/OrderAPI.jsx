
import axiosClient from './axiosClient';

const OrderAPI = {
	postOrder: (query) => {
		const url = `/orders`;
		return axiosClient.put(url, query);
	},
	getOrder: () => {
		const url = `/orders`;
		return axiosClient.get(url);
	},
	getDetail: (id) => {
		const url = `/orders/${id}`;
		return axiosClient.get(url);
	}
};

export default OrderAPI;

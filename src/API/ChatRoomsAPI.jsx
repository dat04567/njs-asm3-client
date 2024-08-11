import axiosClient from './axiosClient';

const ChatRoomsAPI = {
	getMessageByRoomId: (roomId) => {
		const url = `chat/getMessagesForRoom?roomId=${roomId}`;
		return axiosClient.get(url);
	},

	createNewRoom: () => {
		const url = `/chatrooms/createNewRoom`;
		return axiosClient.post(url);
	},

	addMessage: (body) => {
		const url = `chat/sendMessage`;
		return axiosClient.put(url, body);
	},
};

export default ChatRoomsAPI;

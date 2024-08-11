import io from 'socket.io-client';
import Cookies from 'js-cookie';
//window.location.hostname
function connect(roomId) {
   const socket = io(`${process.env.REACT_APP_API_SERVER}`, {
      query: {
         roomId,
      },
   });
   return socket;
}

function saveRoomId(roomId) {
   Cookies.set('roomId', roomId);
}

function getRoomId() {
   return Cookies.get('roomId') || null;
}

function deleteRoomId() {
   Cookies.remove('roomId');
}

const socketService = {
   connect,
   getRoomId,
   saveRoomId,
   deleteRoomId,
};

export default socketService;

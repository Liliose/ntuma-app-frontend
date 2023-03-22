import {io} from 'socket.io-client';
import {app} from '../../constants/app';

let mSocket: any = undefined;
let mStore: any = undefined;

export const subscribeToSocket = (store: any) => {
  mStore = store;
  if (mSocket !== undefined) {
    return;
  }

  const {user} = mStore.getState();

  mSocket = io(app.SOCKET_URL);
  mSocket.on('connect', () => {
    console.log('connected to socket');
  });
  emitSocket('addUser', {userType: 'client', userId: user.userId});
  mSocket.on('NtumaClientEventName', (data: {type: string; data: any}) => {
    // console.log(data);
  });
  mSocket.on('disconnect', () => {
    console.log('disconnected from socket');
  });
  mSocket.on('connect_error', (err: any) => {
    console.log(`socket connect_error due to ${err.message}`);
    console.log(JSON.stringify(err));
  });
};

export const unSubscribeToSocket = () => {
  mSocket !== undefined && mSocket.disconnect();
  console.log('Socket Disconnected');
};

export const emitSocket = (eventName: string, data: any) => {
  mSocket !== undefined && mSocket.emit(eventName, data);
};

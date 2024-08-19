import {io, Socket} from 'socket.io-client';
import {API_BASE_URL} from '@env';

let socket: Socket | null = null;

export const connectSocket = (requestId: string): void => {
  try {
    socket = io(API_BASE_URL, {
      query: {request_id: requestId},
    });

    socket.on('connect', () => {
      console.log('Conectado ao servidor Socket.IO com requestId:', requestId);
    });
  } catch (error) {
    console.error('Error connecting to Socket.IO:', error);
    throw error;
  }
};

export const listenToEvent = (
  event: string,
  callback: (data: any) => void,
): void => {
  if (!socket) {
    console.error('Socket.IO not connected. Cannot listen to event:', event);
    return;
  }

  socket.on(event, callback);
};

export const emitEvent = (event: string, data: any): void => {
  if (!socket) {
    console.error('Socket.IO not connected. Cannot emit event:', event);
    return;
  }

  socket.emit(event, data);
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  } else {
    console.error('Socket.IO not connected. Cannot disconnect.');
  }
};

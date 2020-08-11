import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SocketContext from './context/SocketContext';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3333');

ReactDOM.render(
  <SocketContext.Provider value={socket}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SocketContext.Provider>,
  document.getElementById('app')
);

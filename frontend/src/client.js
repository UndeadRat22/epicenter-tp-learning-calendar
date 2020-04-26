import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import setupAxios from './axios';

setupAxios();

ReactDOM.render(<App />, document.getElementById('root'));

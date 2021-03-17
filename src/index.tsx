import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import schema from 'miragejs/orm/schema';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de website',
          amount: 4000,
          type: 'deposit',
          category: 'Trabalho',
          createdAt: new Date('2021-03-05 09:12:13'),
        },
        {
          id: 2,
          title: 'Cartão',
          amount: 6000,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date('2021-03-15 08:10:13'),
        },
        {
          id: 3,
          title: 'Aluguel',
          amount: 800,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date('2021-03-17 07:58:13'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
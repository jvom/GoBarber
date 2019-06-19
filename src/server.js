const express = require('express');
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
const nunjucks = require('nunjucks');
const path = require('path');
const flash = require('connect-flash');

class App {
  constructor() {
    this.express = express();

    // verifica se é ambiente de desenvolvimento, produção ou testes.
    this.isDev = process.env.NODE_DEV !== 'production';

    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    // Trabalhar com formulários html
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(flash());
    this.express.use(
      session({
      store: new LokiStore({
        path: path.resolve(__dirname, '..', 'tmp', 'sessions.db')
      }),
      secret: 'MyAppSecret',
      resave: true,
      saveUninitialized: true
    }));
  }

  views() {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
    watch: this.isDev,
    express: this.express,
    autoescape: true
    });
    
    // definindo a pasta public
    this.express.use(express.static(path.resolve(__dirname, 'public')));
    // definindo extensão da view
    this.express.set('view engine', 'njk');
  }

  routes() {
    // eslint-disable-next-line global-require
    this.express.use(require('./routes'));
  }
}

module.exports = new App().express;

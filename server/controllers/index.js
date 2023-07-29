const homeRouter = require('./home');
const usersRouter = require('./users');
const loginRouter = require('./login');
const recordsRouter = require('./records');
const sitesRouter = require('./sites');

const Routers = [
  { endpoint: '/', router: homeRouter },
  { endpoint: '/api/users', router: usersRouter },
  { endpoint: '/api/login', router: loginRouter },
  { endpoint: '/api/records', router: recordsRouter },
  { endpoint: '/api/sites', router: sitesRouter },
];

module.exports = Routers;
const homeRouter = require('./home');
const usersRouter = require('./users');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const recordsRouter = require('./records');
const sitesRouter = require('./sites');
const templatesRouter = require('./templates');
const recordTypesRouter = require('./recordTypes');

const siteRecordsRouter = require('./siteRecords');
const siteTemplatesRouter = require('./siteTemplates');
const templateRecordsRouter = require('./templateRecords');

const Routers = [
  { endpoint: '/', router: homeRouter },
  { endpoint: '/api/users', router: usersRouter },
  { endpoint: '/api/login', router: loginRouter },
  { endpoint: '/api/logout', router: logoutRouter },
  { endpoint: '/api/records', router: recordsRouter },
  { endpoint: '/api/sites', router: sitesRouter },
  { endpoint: '/api/site-records', router: siteRecordsRouter },
  { endpoint: '/api/site-templates', router: siteTemplatesRouter },
  { endpoint: '/api/record-types', router: recordTypesRouter },
  { endpoint: '/api/template-records', router: templateRecordsRouter },
  { endpoint: '/api/templates', router: templatesRouter },
];

module.exports = Routers;
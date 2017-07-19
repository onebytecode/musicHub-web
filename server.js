const express        = require('express')
const app            = express()
const router         = express.Router()
const port           = 8080
const bodyParser     = require('body-parser')
const ENV            = process.env.NODE_ENV || 'dev'
const logger         = require('./logging')
const morgan         = require('morgan')
const routers        = require('./routes')
const cookieParser   = require('cookie-parser')
const configBundle   = {
  secretsPath: __dirname + '/secrets.obc'
}
const config         = require('./config')(configBundle)
const db             = require('./db')(config.db)
const models         = require('./models')(db)
const controllers    = require('./controllers')(models, config.secrets, config.links)

app.root        =  __dirname
app.logger      =  logger
app.models      =  models
app.controllers =  controllers
app.config      =  config
app.db          =  db
/*
     BODY PARSER CONFIG
*/
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(cookieParser())

// app.use('/', router)
app.use('/api', (req, res, next) => {
  require('./routes/authenticator')(req, res, next, config.secrets.secretToken)
})
app.use('/api', routers(express, controllers, config.secrets).api_v1)
app.use('/', routers(express, controllers, config.secrets).commonRouter)
// DB CONNECTION
app.db.connect.then(
  success => {
    console.log(`Connection to db status ${success.status}`);
    // require('./routes')(router, app.controllers)
  }, error => {
    console.log(`Connection to db status ${error.status}`);
  }
)

app.listen(port, () => {
  logger(`Server running on :: ${port}`, '', 'GOOD')
  logger(`Node enviroment is ${ENV}`, '', 'GOOD')
})

module.exports = app

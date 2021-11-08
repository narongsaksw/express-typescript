import express from 'express'
import config from 'config'

import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes'
import deserializeUser from './middleware/deserializeUser'

const port = config.get<string>('port')


const app = express()

app.use(express.json())

app.use(deserializeUser)

app.get('/', (req, res) => {
    return res.send('Hello World')
})

app.listen(port, async () => {
    logger.info(`Listening on http://localhost:${port}`)
    await connect()

    routes(app)
})
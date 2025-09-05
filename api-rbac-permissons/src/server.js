import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from '~/config/corsOptions'
import { APIs_V1 } from '~/routes/v1/'

const START_SERVER = () => {
  // Init Express App
  const app = express()

  // Fix Cache from disk from ExpressJS
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  // Use Cookie
  app.use(cookieParser())

  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Use Route APIs V1
  app.use('/v1', APIs_V1)

  const PORT = process.env.PORT || 8080
  const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
  const AUTHOR = 'ideft'
  app.listen(PORT, HOST, () => {
    console.log(`${process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'LOCAL DEV'}: Hello ${AUTHOR}, Back-end Server is running successfully at Host: ${HOST} and Port: ${PORT}`)
  })
}

(async () => {
  try {
    // Start Back-end Server
    console.log('Starting Server...')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

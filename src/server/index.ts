import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import next from 'next'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { SocketType } from './types'

import { JWT_SECRET } from '@/constants'

dotenv.config()

const dev = process.env.NODE_ENV !== 'production'

const hostname = 'localhost'
const port = parseInt(process.env.PORT || '', 10) || 3000

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

// Middleware for token authentication
const authenticateToken = (socket_: SocketType, next: any) => {
  const token = socket_.handshake.auth.token
  if (token == null) {
    return next(new Error('Authentication error'))
  }

  jsonwebtoken.verify(token, JWT_SECRET, (err: any, data: any) => {
    if (err) {
      return next(new Error('Authentication error'))
    }
    const { iat, exp, ...user } = data
    socket_.user = user
    next()
  })
}

app.prepare().then(() => {
  const httpServer = createServer(handler)

  const io = new Server(httpServer, { pingInterval: 2000, pingTimeout: 5000 })

  io.use(authenticateToken as any)

  io.on('connection', (defaultSocket) => {
    const socket = defaultSocket as SocketType

    console.log('a user is connected', socket.user)
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})

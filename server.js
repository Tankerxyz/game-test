// import { WebSocketServer } from 'ws'
// import { handleConnection, startSendingClientUpdates } from './server/websockets/connectionHandler.js'
import fs from 'fs'
import Router from 'express-promise-router'
import viteConfig from './vite.config.js'
import { createServer } from 'vite'
import express from 'express'
import http from 'http'

const router = Router()
const app = express()

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
   const vite = await createServer({
      configFile: false,
      server: {
         middlewareMode: true,
      },
      ...viteConfig,
   })
   router.use(vite.middlewares)
} else {
   app.use(express.static('dist'))
}

router.get('/', async (req, res) => {
   let html = fs.readFileSync('index.html', 'utf-8')
   if (process.env.NODE_ENV === 'development') {
      html = await vite.transformIndexHtml(req.url, html)
   }
   res.send(html)
})

router.use('*', (req, res) => {
   res.status(404).send({ message: 'Not Found' })
})

app.use(router)

const httpServer = http.createServer(app)
// export const wsServer = new WebSocketServer({ server: httpServer })

// wsServer.on('connection', handleConnection)

// startSendingClientUpdates()


import dgram from 'node:dgram';

const server = dgram.createSocket('udp4');


server.on('error', (err) => {
   console.error(`server error:\n${err.stack}`);
   server.close();
});

server.on('message', (msg, rinfo) => {
   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
   const address = server.address();
   console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);

httpServer.listen(process.env.PORT || 8080, () => {
   console.log(`Listening on port http://localhost:8080...`)
})

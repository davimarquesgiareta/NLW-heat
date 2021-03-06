import express from 'express'
import "dotenv/config"
import http from "http"
import cors from "cors"
import { Server } from "socket.io"

import { router } from './routes'

const app = express()

app.use(cors())

const serverHttp = http.createServer(app)

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    console.log(`usuario conectado no socket ${socket.id}`  )
})

app.use(express.json()) //permitir que o express lide com JSON

app.use(router) // usar as rotas do arquivo ROUTES.TS


// ------- AUTENTICAÇÃO COM GITHUB ----------------
app.get("/github", (request, response) =>{
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

// Função callbck que é configurado no GITHUB
app.get("/sigin/callback" ,(request,response) =>{

    const { code } = request.query

    return response.json(code)

})
//--------------------------------------------------

export { serverHttp, io}
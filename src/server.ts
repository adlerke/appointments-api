import 'reflect-metadata'

import express from 'express'
import cors from 'cors'
import routes from './routes'
import uploadConfig from './config/upload'

import './database'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.diectory))
app.use(routes)

app.get('/', (req, res)=>{
    return res.json({status : '🔥 Api v1 ON'})
})

app.listen(3333 , ()=>{
    console.log("✔ Up and Running")
})

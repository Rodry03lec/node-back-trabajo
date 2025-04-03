// importamos
import express from 'express'
import urlMapas from './routes/mapa.routes.js'

// declaramos app
const app = express()

app.use(express.json())

// CORS
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Headers', 'content-type, Accept, Authorization');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
})

// aqui para la ruta base
app.use('/api/v1', urlMapas)

// aqui vamos a escuchar el puerto iniciar el servidor
app.listen(3000, function() {
    console.log('Servidor iniciado en http://127.0.0.1:3000')
})

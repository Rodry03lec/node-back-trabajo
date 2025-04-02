// importamos
import express from 'express'
import urlMapas from './routes/mapa.routes.js'

// declaramos app
const app = express()

app.use(express.json())

// aqui para la ruta base
app.use('/api/v1', urlMapas)

// aqui vamos a escuchar el puerto iniciar el servidor
app.listen(3000, function() {
    console.log('Servidor iniciado en http://127.0.0.1:3000')
})

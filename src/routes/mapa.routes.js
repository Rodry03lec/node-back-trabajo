// importamos expres
import express from 'express'
import mapaController from './../controllers/mapa.controller.js'

const Router = express.Router()

// http://127.0.0.1:3000/api/v1/auth/login

Router.get('/mapa/prueba', mapaController.funPrueba)

export default Router


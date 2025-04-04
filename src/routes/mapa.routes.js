// importamos expres
import express from 'express'
import mapaController from './../controllers/mapa.controller.js'

const Router = express.Router()

// http://127.0.0.1:3000/api/v1/auth/login

Router.post('/mapa/buscarDepMun', mapaController.funBusquedaDepMum)
Router.post('/mapa/departamentoMunicipioVer', mapaController.funDepartMunicipio)
Router.get('/mapa/pruebaPunto', mapaController.funPruebaPunto)

export default Router


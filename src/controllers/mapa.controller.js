// controllers/mapa.controller.js
import conexion from './../config/conexion.js'; // Importa el módulo completo

export default {
    async funPrueba(req, res) {
        try {
            const datos = await conexion.queryDB('SELECT depto, ST_AsGeoJSON(ST_Union(geom))::json AS geojson  FROM cpv_2024.manzanas GROUP BY depto ');
            console.log(datos);
            return res.status(200).json(datos);
        } catch (error) {
            console.log('Ocurrio un error al optener los datos');
            return res.status(500).json({ error: 'Error al obtener los datos' });            
        }
    }
};

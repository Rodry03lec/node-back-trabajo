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
    },

    async funListaDepartamento(req, res){
        try {
            const datos = await conexion.queryDB(`select dd.id as id, dd.depto as nombre  from public.departamentos_ds_5050 dd`);
            return res.status(200).json(datos);
        } catch (error) {
            console.log("Ocurrio un error al Optener los datos");
            return res.status(500).json({error:"Ocurrio un error al Optener los datos"});
        }
    },

    // pára la parte de los departamentos
    async funDepartamento(req, res){
        let datos_departamento = req.body;
        try {
            let datos= '';
            if(datos_departamento.id != 0){
                datos = await conexion.queryDB(`select dd.depto as nombre, ST_AsGeoJSON(ST_Union(dd.geom))::json AS geojson from public.departamentos_ds_5050 dd where dd.id = $1 group by dd.depto`, [datos_departamento.id]);
                console.log(datos);
            }else{
                datos = await conexion.queryDB(`select dd.depto as nombre, ST_AsGeoJSON(ST_Union(dd.geom))::json AS geojson from public.departamentos_ds_5050 dd group by dd.depto`);
                console.log(datos);
            }
            return res.status(200).json(datos);
        } catch (error) {
            console.log(datos);
            return res.status(500).json({error: "Error al optener los datos"});
        }
    }
};

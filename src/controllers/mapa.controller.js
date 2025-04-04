// controllers/mapa.controller.js
import conexion from './../config/conexion.js'; // Importa el módulo completo

export default {
    //para la busqueda de los departamentos y los municipios
    async funBusquedaDepMum(req, res){
        let data = req.body;
        console.log(data);
        try {
            let datos = await conexion.queryDB(`
                (
                    SELECT 
                        dd.gid as id,
                        dd.depto AS nombre,
                        'departamento' AS tipo
                    FROM 
                        public.departamentos_ds_5050 AS dd
                    WHERE 
                        dd.depto ILIKE '%' || $1 || '%'
                    LIMIT 20
                )
                UNION ALL
                (
                    SELECT 
                        md.gid as id,
                        md.mpio || ' - ' || md.depto AS nombre,
                        'municipio' AS tipo
                    FROM 
                        public.municipios_ds_5050 AS md
                    WHERE 
                        md.mpio ILIKE '%' || $1 || '%'
                    LIMIT 20
                )
            `, [data.nombre]);
            return res.status(200).json(datos);
        } catch (error) {
            console.log("Ocurrio un error al Optener los datos");
            return res.status(500).json({error: "Ocurrio un error al Optener los datos"});
        }
    },

    async funDepartMunicipio(req, res){
        let datosDepMun = req.body;
        console.log(datosDepMun);
        try {
            let datos = "";
            if(datosDepMun.tipo !== 'municipio'){
                datos = await conexion.queryDB(`
                    select dd.gid as id, dd.depto as nombre, ST_AsGeoJSON(ST_Union(dd.geom))::json AS geojson
                    from public.departamentos_ds_5050 dd 
                    where dd.gid = $1 group by dd.gid, dd.depto 
                `, [datosDepMun.id]);
            }else{
                datos = await conexion.queryDB(`
                    select md.gid as id, md.mpio as nombre, ST_AsGeoJSON(ST_Union(md.geom))::json AS geojson  
                    from public.municipios_ds_5050 as md 
                    where md.gid = $1 group by md.mpio, md.gid;
                `, [datosDepMun.id]);
            }
            return res.status(200).json(datos);
        } catch (error) {
            console.log("Ocurrio un error al Optener los datos");
            return res.status(500).json({error: "Error al optener los datos"});
        }
    },

    async funPruebaPunto(req, res){
        try {
            const datos = await conexion.queryDB(`
                select ebp.gid as id, ebp.nomb_equip as nombre, ST_AsGeoJSON(ST_Union(ebp.geom))::json AS geojson 
                from cpv_2024.equipamiento_bn_pn ebp group by ebp.gid, ebp.nomb_equip
            `);
            return res.status(200).json(datos);
        } catch (error) {
            console.log("Ocurrio un error al Optener los datos");
            return res.status(500).json({error:"Ocurrio un error al Optener los datos"});
        }
    }
};

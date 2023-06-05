import config from '../db-config.js';
import sql from 'mssql';

export class hotelServices {
    static getAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.GetAll()');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM tarea');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getById = async (idTarea) => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.GetById(idTarea)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, idTarea)
                .query('SELECT * FROM tarea WHERE idTarea = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static insert = async (tarea) => {
        let returnEntity = null;
        console.log('Estoy en: hotelServices.insert(tarea)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pDesc', tarea.descripcion)
                .query('INSERT INTO tarea (descripcion) VALUES (@pDesc)');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }


    
    static update = async (idTarea, tarea) => {
        let returnEntity = null;
        console.log(tarea);
        console.log('Estoy en: hotelServices.update(tarea)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int,idTarea)
                .input('pDesc', tarea.descripcion)
                .query("UPDATE tarea SET , descripcion=@pDesc WHERE idTarea = @pId");
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static deleteById = async (idTarea) => {
        let rowsAffected = 0;
        console.log('Estoy en: hotelServices.deleteBy(idTarea)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, idTarea)
                .query('DELETE FROM tarea WHERE idTarea = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error)
        }
        return rowsAffected;
    }
}
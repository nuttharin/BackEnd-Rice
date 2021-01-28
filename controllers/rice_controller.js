const { pool } = require('../dbConfig');
const { riceInMachine , riceInMachineEdit } = require('../model/rice_model');
const functionForData = require('../function/functionForData');
const moment = require('moment');
const { funCheckParameterWithOutId } = require('../function/functionForData');


// Data for response api
let resData = {
    status : "",
    statusCode : 200 ,
    data : ""
}
// varible 
let sql = "" ;

//#region  RiceType

////#endregion


//#region  RiceTypeInMachine

getRiceTypeInMachine = (req , res , next ) => {
    let idMachine = req.query.id_machine ;
    if(idMachine == "" || idMachine == null)
    {
        resData.status = "error";
        resData.statusCode = 200 ;
        resData.data = "not have parameter ( id_machine )";    
        res.status(resData.statusCode).json(resData);
    }
    else {
        sql = `SELECT tb_machine.id as id_machine , tb_machine.machine_code,tb_rice_type.name 
                , tb_machine_rice.volume FROM tb_machine_rice
                LEFT JOIN tb_machine on tb_machine.id = tb_machine_rice.id_machine
                LEFT JOIN tb_rice_type on tb_rice_type.id = tb_machine_rice.id_rice_type
                WHERE tb_machine_rice.id_machine = ${idMachine}`;
                
        pool.query(
            sql , (err , result) => {
                if(err)
                {
                    resData.status = "error"; 
                    resData.statusCode = 200 ;
                    resData.data = err ;
                    res.status(resData.statusCode).json(resData)
                }
                else{
                    resData.status = "success";
                    resData.statusCode = 201 ;
                    resData.data = result.rows;
                    // console.log(result.rows[0].id)
                    res.status(201).json(resData);
                }
            }
        )
    }

}

addRiceTypeInMachine = async (req , res , next ) => {
    let dataBody = req.body ;
    let data = new riceInMachine() ;
    data.idMachine = dataBody.idMachine ;
    data.idRiceType = dataBody.idRiceType ;
    data.volume = dataBody.volume ;
    data.dateCreate = moment(new Date()).format('YYYY-MM-DD H:mm:ss');
    let checkParameter = await functionForData.funCheckParameterWithOutId(data) ;
    
    if(checkParameter != "" )
    {
        //console.log(checkParameter)       
        resData.status = "error";
        resData.statusCode = 200 ;
        resData.data = "not have parameter ( "+ checkParameter +" )";    
        res.status(resData.statusCode).json(resData);
    }
    else 
    {
        sql = `INSERT INTO "public"."tb_machine_rice"("id_machine", "id_rice_type", "volume", "date_create") 
                VALUES (${data.idMachine}, ${data.idRiceType}, ${data.volume}, '${data.dateCreate}') RETURNING *`;

        pool.query(
            sql, 
            (err, result) => {
                //console.log(err)
                if (err) {
                    resData.status = "error";
                    resData.data = "query command error tb_machine_rice : " + err;
                    res.status(200).json(resData);
                }
                else
                {      
                    resData.status = "success";
                    resData.statusCode = 201 ;
                    resData.data = "insert complete";
                    res.status(201).json(resData);
                }
            }
        );
    }
}

updateRiceTypeInMachine = async (req , res , next ) => {
    let dataBody = req.body ;
    let data = new riceInMachineEdit() ;
    data.id = dataBody.id ;
    data.volume = dataBody.volume ;
    data.dateModify = moment(new Date()).format('YYYY-MM-DD H:mm:ss');
    let checkParameter = await functionForData.funCheckParameter(data) ;
    
    if(checkParameter != "" )
    {
        //console.log(checkParameter)       
        resData.status = "error";
        resData.statusCode = 200 ;
        resData.data = "not have parameter ( "+ checkParameter +" )";    
        res.status(resData.statusCode).json(resData);
    }
    else
    {
        //console.log(data)
        sql = `UPDATE "public"."tb_machine_rice" SET 
                "volume" = ${data.volume}, "date_modify" = '${data.dateModify}' WHERE "id" = ${data.id}`;
        pool.query(
            sql, 
            (err, result) => {
                //console.log(err)
                if (err) {
                    resData.status = "error";
                    resData.data = "query command update error tb_machine_rice : " + err;
                    res.status( resData.statusCode).json(resData);
                }
                else
                {      
                    resData.status = "success";
                    resData.statusCode = 201 ;
                    resData.data = "update complete";
                    res.status( resData.statusCode).json(resData);
                }
            }
        );
    }

}

deleteRiceTypeInMachine = (req , res , next ) => {

    let id = req.params.id_machine_rice ;
    console.log(id)
    if(id == "" || id == null)
    {
        resData.status = "error";
        resData.statusCode = 200 ;
        resData.data = "not have parameter ( id_machine_rice )";    
        res.status(resData.statusCode).json(resData);
    }
    else {
        sql = `DELETE FROM "public"."tb_machine_rice" WHERE "id" = ${id}`;
        pool.query(
            sql, 
            (err, result) => {
                //console.log(err)
                if (err) {
                    resData.status = "error";
                    resData.data = "query command delete error tb_machine_rice : " + err;
                    res.status( resData.statusCode).json(resData);
                }
                else
                {      
                    resData.status = "success";
                    resData.statusCode = 201 ;
                    resData.data = "delete complete";
                    res.status( resData.statusCode).json(resData);
                }
            }
        );
    }
}

//#endregion






module.exports = {
    getRiceTypeInMachine,
    addRiceTypeInMachine,
    deleteRiceTypeInMachine,
    updateRiceTypeInMachine
}

// INSERT INTO "public"."tb_rice_type"("name", "date_modify") VALUES ('สีนิล01', '2021-01-26 11:28:16') RETURNING *
// UPDATE "public"."tb_rice_type" 
// SET "name" = 'สีนิล00', "date_modify" = '2021-01-26 11:28:16' WHERE "id" = 3 


// DELETE FROM "public"."tb_machine_rice" WHERE "id" = 2




// INSERT INTO "public"."tb_machine_rice"("id_machine", "id_rice_type", "volume", "date_create") 
// VALUES (1, 1, 100, '2021-01-26 11:26:58') RETURNING *


// UPDATE "public"."tb_machine_rice" SET "volume" = 101, "date_modify" = '2021-01-26 11:30:21' WHERE "id" = 1

const { pool } = require('../dbConfig');
const { machine } = require('../model/machine_model');
const functionForData = require('../function/functionForData');
const moment = require('moment');



// Data for response api
let resData = {
    status : "",
    statusCode : 200 ,
    data : ""
}
// varible 
let sql = "" ;




//#region Machine

getMachine = (req , res , next ) => {
  
    
    sql = `SELECT 
            tb_machine.id , machine_code , tb_owner.name ,tb_owner.phone_number, tb_machine.date_create 
            , tb_provinces.name_th , tb_districts.name_th 
            ,tb_subdistricts.name_th , tb_subdistricts.zip_code
            FROM tb_machine
            LEFT JOIN tb_subdistricts ON tb_machine.id_subdistrict = tb_subdistricts.id
            LEFT JOIN tb_districts ON tb_subdistricts.district_id = tb_districts.id
            LEFT JOIN tb_provinces ON tb_districts.province_id = tb_provinces.id
            LEFT JOIN tb_owner ON tb_owner.id = tb_machine.id_owner`;
            
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
                res.status(resData.statusCode).json(resData);
            }
        }
    )
    

}

getMachineById = (req , res , next ) => {
    let id = req.query.id_machine ;
    if(id == "" || id == null)
    {
        resData.status = "error";
        resData.statusCode = 200 ;
        resData.data = "not have parameter ( id_machine )";    
        res.status(resData.statusCode).json(resData);
    }
    else {
        sql = `SELECT 
                tb_machine.id , machine_code , tb_owner.name ,tb_owner.phone_number
                , tb_machine.date_create , tb_provinces.name_th , tb_districts.name_th 
                ,tb_subdistricts.name_th , tb_subdistricts.zip_code
                FROM tb_machine
                LEFT JOIN tb_subdistricts ON tb_machine.id_subdistrict = tb_subdistricts.id
                LEFT JOIN tb_districts ON tb_subdistricts.district_id = tb_districts.id
                LEFT JOIN tb_provinces ON tb_districts.province_id = tb_provinces.id
                LEFT JOIN tb_owner ON tb_owner.id = tb_machine.id_owner
                WHERE tb_machine.id = ${id}`;
                
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
                    resData.data = result.rows[0];
                    res.status(resData.statusCode).json(resData);
                }
            }
        )
    }

}

addMachine = async (req , res , next ) => {
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
        //check id_machine , id_rice_type
        sql = `SELECT * FROM tb_machine_rice
                WHERE id_machine = ${data.idMachine} AND id_rice_type = ${data.idRiceType}`;

        pool.query(
            sql, 
            (err, result) => {
                //console.log(err)
                if (err) {
                    resData.status = "error";
                    resData.statusCode = 200 ;
                    resData.data = "query command error tb_machine_rice : " + err;
                    res.status( resData.statusCode).json(resData);
                }
                else
                { 
                    //console.log(result.rows)
                    if(result.rows.length > 0 && result.rows[0].volume > 0)
                    {
                        resData.status = "error";        
                        resData.statusCode = 200 ;
                        resData.data = "มีข้าวชนิดนี้อยู่ในเครื่่องกรุณานำข้าวออกมาก่อน";
                        res.status( resData.statusCode).json(resData);
                    }
                    else if(result.rows.length > 0 && result.rows[0].volume == 0 )
                    {
                        sql = `UPDATE "public"."tb_machine_rice" 
                                SET "date_create" = '${data.dateCreate}', "volume" = ${data.volume} ,"is_delete" = '0' 
                                WHERE "id" = ${result.rows[0].id}`;

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
                    else
                    {
                        sql = `INSERT INTO "public"."tb_machine_rice"("id_machine", "id_rice_type", "volume", "date_create" , "is_delete") 
                                VALUES (${data.idMachine}, ${data.idRiceType}, ${data.volume}, '${data.dateCreate}' , '0') RETURNING *`;

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
            }
        );
    }
}

updateMachine  = async (req , res , next ) => {
    let dataBody = req.body ;
    console.log(dataBody)
    let data = new machine() ;
    data.id = dataBody.id ;
    data.id_owner = dataBody.id_owner ;
    data.id_subdistrict = dataBody.id_subdistrict;
    data.machine_code = dataBody.machine_code ;
    data.dateModify = moment(new Date()).format('YYYY-MM-DD H:mm:ss');
    let checkParameter = await functionForData.funCheckParameter(data) ;
    
    if(checkParameter != "" )
    {
        resData.status = "error";
        resData.statusCode = 200 ;
        resData.data = "not have parameter ( "+ checkParameter +" )";    
        res.status(resData.statusCode).json(resData);
    }
    else
    {
        //console.log(data)
        sql = `UPDATE "public"."tb_machine" 
                SET "id_owner" = ${data.id_owner}, "id_subdistrict" =  ${data.id_subdistrict}, "machine_code" = ' ${data.machine_code}', 
                "date_modify" = ' ${data.dateModify}' WHERE "id" = ${data.id}`;
        pool.query(
            sql, 
            (err, result) => {
                //console.log(err)
                if (err) {
                    resData.status = "error";
                    resData.data = "query command update error tb_machine : " + err;
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

deleteMachine  = (req , res , next ) => {

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
        sql = `UPDATE "public"."tb_machine_rice" 
                SET "is_delete" = '1' WHERE "id" = ${id}`;
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
    addMachine,
    updateMachine,
    getMachine,
    getMachineById,
    deleteMachine
}



// INSERT INTO "public"."tb_machine"("id_owner", "id_subdistrict", "machine_code", "date_create") 
// VALUES (1, 1, 'NO11111', '2021-01-26 11:23:05') RETURNING *




// INSERT INTO "public"."tb_machine_rice"("id_machine", "id_rice_type", "volume", "date_create") 
// VALUES (1, 1, 100, '2021-01-26 11:26:58') RETURNING *

// UPDATE "public"."tb_machine_rice" SET "volume" = 101, "date_modify" = '2021-01-26 11:30:21' WHERE "id" = 1
const { pool } = require('../dbConfig');


// Data for response api
let resData = {
    status : "",
    statusCode : 200 ,
    data : ""
}
// varible 
let sql = "" ;


getInformationForPhone = (req , res , next ) => {
    let phone = req.query.phone_number ;
    // console.log("getInformationForPhone")
    // console.log(req.query)
    if(phone == "" || phone == null)
    {
        resData.status = "error";
        resData.statusCode = 200 ;
        resData.data = "not have parameter ( phone_number )";    
        res.status(resData.statusCode).json(resData);
    }
    else {
        sql = `SELECT phone_number , balance FROM tb_user
                LEFT JOIN tb_user_financial ON tb_user.id = tb_user_financial.id_user
                WHERE tb_user.phone_number = '${phone}'`;

        pool.query(
            sql , (err , result) => {
                if(err)
                {
                    resData.status = "error"; 
                    resData.statusCode = 200 ;
                    resData.data = err ;
                    res.status(resData.statusCode).json(resData)
                }
                else {
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






module.exports = {
    getInformationForPhone,
}
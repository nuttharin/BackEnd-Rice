exports.funCheckParameterWithOutId = async (data) => {
    let dataKey = "" ;
    await Object.entries(data).forEach(entry => {
        const [key, value] = entry;
        if( (value == '' || value == undefined) && key != 'id' )
        {
          
            dataKey = key ;
           
        }
    });
    return dataKey;
}


exports.funCheckParameter = async (data) => {
    let dataKey = "" ;
    await Object.entries(data).forEach(entry => {
        const [key, value] = entry;
        if( (value == '' || value == undefined) && key != 'id' )
        {
          
            dataKey = key ;
           
        }
    });
    return dataKey;
}

exports.funSetDefaultInt = () =>
{
    return new Promise((resolve , reject)=>{
        resolve(0)
    })
}


// return new Promise((resolve , reject)=>{
//     let strNumber = "000000"
//     let number = Math.random();
//     //console.log(number)
//     let ranStr  = Math.ceil(number * Math.pow(10,range)) ;
//     ranStr = ranStr.toString();
//     ranStr = (ranStr.length < range)?(ranStr + strNumber.substring(0,range-ranStr.length)):ranStr ;
//     resolve(ranStr);        
// })
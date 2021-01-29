class BankDriver {
    constructor() {
      this.id = id ;
      this.driver_id = driver_id ;
      this.bank_id = bank_id ;
      this.name_account = name_account ;
      this.bank_account = bank_account;
      this.modidyDate = modidyDate
    }
}

class machine {
  constructor(id , id_owner , id_subdistrict , machine_code , dateCreate , dateModify)
  {
    console.log(id_subdistrict)
    this.id = id ;
    this.id_owner = id_owner ;
    this.id_subdistrict = id_subdistrict ;
    this.machine_code = machine_code ;
    this.dateCreate = (!dateCreate)?" ":dateCreate ;
    this.dateModify = (!dateModify)?" ":dateModify ;
  }
}




// class  {
//   constructor(id){

//   }
// }

module.exports = {
  machine
}
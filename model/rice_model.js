class BankDriver {
    constructor(id, driver_id, bank_id,bank_account , modidyDate,name_account) {
      this.id = id ;
      this.driver_id = driver_id ;
      this.bank_id = bank_id ;
      this.name_account = name_account ;
      this.bank_account = bank_account;
      this.modidyDate = modidyDate
    }
}


class riceType {
    constructor(){}
}


class riceInMachine {
    constructor(id, idMachine , idRiceType , volume , dateCreate ,dateModify){
        this.id = id ;
        this.idMachine = idMachine ;
        this.idRiceType = idRiceType ;
        this.volume = volume ;
        this.dateCreate = (!dateCreate)?" ":dateCreate ;
        this.dateModify = (!dateModify)?" ":dateModify ;
    }
}

class riceInMachineEdit {
    constructor(id , volume ,dateModify){
        this.id = id ;     
        this.volume = volume ;
        this.dateModify = (!dateModify)?" ":dateModify ;
    }
}

module.exports = {
    riceInMachine,
    riceInMachineEdit
}

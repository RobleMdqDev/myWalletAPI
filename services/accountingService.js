const accountingModel = require('../models/accounting.js');
const categoryModel = require('../models/category.js')
const userModel = require('../models/users.js');

module.exports = {
    newAccounting: async (accounting) => {
        
        let response = await categoryModel.categoryId(accounting.category_id);
        if (response.length == 0) {
            throw new Error("This category doesn't exist")
        }

        if(accounting.user != null){
            response = await userModel.idUser(accounting.user);
            if (response.length == 0) {
                throw new Error("This id doesn't exist")
            }
        }

        response = await accountingModel.newAccounting(accounting);
        return response;
    },

    editAccounting: async (accounting) => {       
              
        let response = await accountingModel.idAccounting(accounting.id);
        
        if (response[0].user_id != accounting.user_id) {
            throw new Error("This user can't be modified");
        }
        
        response = await accountingModel.editAccounting(accounting);
        return response;
    },    

    deleteAccounting: async (id) => {
        var response = await accountingModel.idAccounting(id);
        if (response.length == 0) {
            throw new Error("This operation doesn't exist")
        }
       
        response = await accountingModel.deleteAccounting(id)
        return response;
    }
}
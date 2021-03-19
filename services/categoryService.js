const categoryModel = require('../models/category.js')
const accountingModel = require('../models/accounting')

module.exports = {
	newCategory: async (name) => {
		var response = await categoryModel.nameCategory(name);
		if (response.length > 0) {
			throw new Error('That category already exists');
		}

		response = await categoryModel.newCategory(name);
		return response;
	},

	editCategory: async (category) => {
		var response = await categoryModel.nameCategory(category.name);
		if (response.length > 0) {
			throw new Error('That category already exists');
		}

		response = await accountingModel.categoryAccounting(category.id);
		if (response.length > 0) {
			throw new Error("This category has associated operations, it cannot be edited.");
		}

		response = await categoryModel.editCategory(category);
		return response;
	},

	deleteCategory: async (id) => {
		var response = await categoryModel.categoryId(id);
		if (response.length == 0) {
			throw new Error("This category doesn't exist");
		}
		response = await accountingModel.categoryAccounting(id);
		if (response.length > 0) {
			throw new Error("This category has associated operations, it cannot be deleted.");
		}

		response = await categoryModel.deleteCategory(id)
		return response;
	},

	categoryID: async (id) => {
		var response = await categoryModel.categoryId(id);
		if (response.length < 1) {
			throw new Error("This category doesn't exist");
		}
		return response;
	}

}
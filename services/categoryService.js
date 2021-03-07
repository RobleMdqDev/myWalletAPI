const categoryModel = require('../models/category.js')

module.exports = {
	newCategory: async (name) => {
		var response = await categoryModel.nameCategory(name);
		if (response.length > 0) {
			throw new Error('Category Existente');
		}

		response = await categoryModel.newCategory(name);
		return response;
	},

	editCategory: async (category) => {
		var response = await categoryModel.nameCategory(category.name);
		if (response.length > 0) {
			throw new Error('Category Existente');
		}

		response = await categoryModel.categoryAccounting(category.id);
		if (response.length > 0) {
			throw new Error("Esta category tiene Accounting asociados, no se puede edit");
		}

		response = await categoryModel.editCategory(category);
		return response;
	},

	deleteCategory: async (id) => {
		var response = await categoryModel.categoryId(id);
		if (response.length == 0) {
			throw new Error("Esta category no existe");
		}

		response = await categoryModel.categoryAccounting(id);
		if (response.length > 0) {
			throw new Error("Esta category tiene Accounting asociados, no se puede eliminar");
		}

		response = await categoryModel.deleteCategory(id)
		return response;
	},

	categoryID: async (id) => {
		var response = await categoryModel.categoryId(id);
		if (response.length < 1) {
			throw new Error("Esta category no existe");
		}
		return response;
	}

}
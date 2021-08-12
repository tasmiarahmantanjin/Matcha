// This file contains all the rules form userMatch form validations

// To-do: Make sure this matched with incoming data: 
const { body } = require('express-validator')

exports.rules = (() => {
	return [

    //ageRangeMax, ageRangeMin, distance, gender, sexual_orientation
		//body('ageRangeMax').notEmpty(),
		//body('ageRangeMin').notEmpty(),
		//body('distance').notEmpty(),

		// body('user_name').notEmpty().isLength({ min: 3 }),
		//body('gender').notEmpty(),
		//body('sexual_orientation').notEmpty(),
	]
})()
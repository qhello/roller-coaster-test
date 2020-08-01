import Joi from '@hapi/joi'

interface validatorInput {
	rideSeats: string
	runByDay: string
	numberOfGroups: string
	countByGroup: string[]
}

interface validatorOutput {
	rideSeats: number
	runByDay: number
	numberOfGroups: number
	countByGroup: number[]
}

export interface validatorResponse {
	error?: Joi.ValidationError
	value: validatorOutput
}

export default (input: validatorInput): validatorResponse =>
	Joi.object({
		rideSeats: Joi.number()
			.integer()
			.min(1)
			.max(10 ** 7)
			.required(),
		runByDay: Joi.number()
			.integer()
			.min(1)
			// Disabled otherwise fixtures "hard" & "harder" wouldn't work
			// .max(10 ** 7)
			.required(),
		numberOfGroups: Joi.number().integer().min(1).max(1000).required(),
		countByGroup: Joi.array()
			.items(
				Joi.number()
					.integer()
					.min(1)
					.max(Math.min(parseInt(input.rideSeats, 10) || 0, 10 ** 6)) // Groups can't be larger than ride capacity
			)
			.length(parseInt(input.numberOfGroups, 10) || 0)
			.required(),
	})
		.required()
		.validate(input)

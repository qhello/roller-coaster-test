import validator from './validator'

export default (input: string): number | Error => {
	console.time('Function time')

	if (!input) throw new Error('Input is empty!')

	// First let's split input by lines
	const [firstLine, ...otherLines] = input.split('\n')

	// Let's get args from first line
	const firstLineArgs = firstLine.split(' ')

	// Check if input is correct
	const { error, value } = validator({
		rideSeats: firstLineArgs[0],
		runByDay: firstLineArgs[1],
		numberOfGroups: firstLineArgs[2],
		countByGroup: otherLines,
	})

	if (error) throw new Error(error.message)

	// Input validated, let's extract our variables
	const { rideSeats, runByDay, countByGroup } = value

	// console.log({ value })

	let earnings = 0
	const queue = countByGroup

	// Now let's run our roller coaster X times
	for (let runNumber = 0; runNumber < runByDay; runNumber += 1) {
		// const newQueue = [] // This will be the queue after boarding

		let availableSeats = rideSeats
		let groupBoarded = 0

		// eslint-disable-next-line no-restricted-syntax
		for (const currentGroup of queue) {
			// Can't bring this group on board, let's stop boarding
			if (availableSeats < currentGroup) break

			// Let's board current group, we mark them as earning
			availableSeats -= currentGroup
			groupBoarded += 1
		}

		// Calculate number of people on ride
		earnings += rideSeats - availableSeats

		// Ride is gone! Update queue
		queue.push(...queue.splice(0, groupBoarded))

		// console.log({ earnings, runNumber, peopleBoarded, queue })
	}

	console.timeEnd('Function time')

	return earnings
}

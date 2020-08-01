import fs from 'fs/promises'
import path from 'path'

import handler from '..'

const getFileContent = async (relativePath: string): Promise<string> =>
	(await fs.readFile(path.join(__dirname, relativePath))).toString('utf-8')

describe('Calculate roller revenue', () => {
	it('Should return error: bad input', async () => {
		// Empty input
		expect(() => handler('')).toThrow(/empty/)
		// Only first input
		expect(() => handler('1')).toThrow(/is required/)
		// Only two first input
		expect(() => handler('1 2')).toThrow(/is required/)
		// String instead of number
		expect(() => handler('1 A 1 \n 1')).toThrow(/must be a number/)
		// Only first line
		expect(() => handler('1 2 3')).toThrow(/must contain/)
		// Not all group count are defined
		expect(() => handler('1 1 2 \n 1')).toThrow(/must contain/)
		// A group is too big to go on the ride
		expect(() => handler('1 1 2 \n 10')).toThrow(
			/must be less than or equal to/
		)
	})

	it('Should math fixture: simple case', async () => {
		const fixture = '1.simple_case'
		const input = await getFileContent(`./fixtures/${fixture}.input.txt`)
		const output = await getFileContent(`./fixtures/${fixture}.output.txt`)
		expect(handler(input)).toEqual(parseInt(output, 10))
	})

	it('Should math fixture: 1000 groups', async () => {
		const fixture = '2.1000_groups'
		const input = await getFileContent(`./fixtures/${fixture}.input.txt`)
		const output = await getFileContent(`./fixtures/${fixture}.output.txt`)
		expect(handler(input)).toEqual(parseInt(output, 10))
	})

	it('Should math fixture: same groups', async () => {
		const fixture = '3.same_groups'
		const input = await getFileContent(`./fixtures/${fixture}.input.txt`)
		const output = await getFileContent(`./fixtures/${fixture}.output.txt`)
		expect(handler(input)).toEqual(parseInt(output, 10))
	})

	it('Should math fixture: all the people', async () => {
		const fixture = '4.all_the_people'
		const input = await getFileContent(`./fixtures/${fixture}.input.txt`)
		const output = await getFileContent(`./fixtures/${fixture}.output.txt`)
		expect(handler(input)).toEqual(parseInt(output, 10))
	})

	it('Should math fixture: high earnings', async () => {
		const fixture = '5.high_earnings'
		const input = await getFileContent(`./fixtures/${fixture}.input.txt`)
		const output = await getFileContent(`./fixtures/${fixture}.output.txt`)
		expect(handler(input)).toEqual(parseInt(output, 10))
	})

	// TODO: make this faster! Estimated: 25min run
	// it('Should math fixture: hard', async () => {
	// 	const fixture = '6.hard'
	// 	const input = await getFileContent(`./fixtures/${fixture}.input.txt`)
	// 	const output = await getFileContent(`./fixtures/${fixture}.output.txt`)
	// 	expect(handler(input)).toEqual(parseInt(output, 10))
	// })

	// TODO: make this faster! Estimated: 25min*10 run
	// it('Should math fixture: harder', async () => {
	// 	const fixture = '7.harder'
	// 	const input = await getFileContent(`./fixtures/${fixture}.input.txt`)
	// 	const output = await getFileContent(`./fixtures/${fixture}.output.txt`)
	// 	expect(handler(input)).toEqual(parseInt(output, 10))
	// })
})

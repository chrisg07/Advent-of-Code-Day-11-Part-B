module.exports = class HeightMap {
	map: Array<Array<number>> = []
	answer = 0
	allOctopiFlash = false
	
  constructor(lines) {
		for (let [index, entry] of lines.entries()) {
			if (entry) {
				// row of input
				this.map[index] = entry.split('').map(char => Number(char))
			}
		}
		while (!this.allOctopiFlash) {
			this.incrementOctopi()
			this.flashOctopi()
			this.allOctopiFlash = this.checkIfAllOctopiFlash()
			console.log('all octopi flash', this.allOctopiFlash)
			this.answer++
			console.log('step: ', this.answer)
		}
		console.log('answer:', this.answer)
  }

	checkIfAllOctopiFlash(): boolean {
		const allPointsFlashed = true;
		const fourCornersFlashed = this.map[0][0] === 0 
			&& this.map[0][this.map.length - 1] === 0 
			&& this.map[this.map.length - 1][0] === 0 
			&& this.map[this.map.length - 1][this.map.length - 1] === 0 
		if (fourCornersFlashed) {-
			this.map.forEach(row => 
				row.forEach(column => {
					console.log('column', column)
					if (column !== 0) {
						console.log('checked all octopi on turn but found at', this.answer, column)
						return false
					}
				})
			)
			return true
		} else {
			return false
		}
	}

	incrementOctopi(): void {
		this.map = this.map.map(row => row.map(column => column + 1))
	}

	flashOctopi(): void {
		this.map.forEach((row: Array<number>, x) => row.forEach((column: number, y) => {
				if (column > 9) {
					this.flashOctopus({x, y})
				}
		}))
	}

	flashOctopus(point): void {
		this.map[point.x][point.y] = 0
		const north = {x: point.x - 1, y: point.y}
		this.flashOctopusNeighbor(north)
		const northEast = {x: point.x - 1, y: point.y + 1}
		this.flashOctopusNeighbor(northEast)
		const east = {x: point.x, y: point.y + 1}
		this.flashOctopusNeighbor(east)
		const southEast = {x: point.x + 1, y: point.y + 1}
		this.flashOctopusNeighbor(southEast)
		const south = {x: point.x + 1, y: point.y}
		this.flashOctopusNeighbor(south)
		const southWest = {x: point.x + 1, y: point.y - 1}
		this.flashOctopusNeighbor(southWest)
		const west = {x: point.x, y: point.y - 1}
		this.flashOctopusNeighbor(west)
		const northWest = {x: point.x - 1, y: point.y - 1}
		this.flashOctopusNeighbor(northWest)
	}

	flashOctopusNeighbor(point): void {
		if (this.pointIsValid(point) && this.map[point.x][point.y] !== 0) {
			this.map[point.x][point.y]++
			if (this.map[point.x][point.y] > 9) {
				this.flashOctopus(point)
			}
		}
	}

	pointIsValid(point): boolean {
		const boundedX = point.x >= 0 && point.x < this.map.length
		if (boundedX) {
			const boundedY = point.y >= 0 && point.y < this.map[point.x].length
			return boundedY
		}
		return false
	}
}

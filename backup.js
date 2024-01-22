
/* document.addEventListener("DOMContentLoaded", getEvaluation()) */

/* async function getEvaluation()  */
const getEvaluation = async () => {
	const response = await
		fetch('http://localhost:8080/eval', {
			method: 'GET',
			mode: 'cors'
		});
	const data = await response.json();
	/* console.log(data) */
	return data
}

getEvaluation().then(data => data.map((dataPoint) => {
	/* console.log(dataPoint.rating) */
	allData.push(dataPoint)
	if (dataPoint.rating < 7) {
		detractors.push(dataPoint.rating)
	}
	else if (dataPoint.rating == 7 || dataPoint.rating == 8) {
		indifferents.push(dataPoint.rating)
	}
	else if (dataPoint.rating > 8) {
		promoters.push(dataPoint.rating)
	}
	else console.log("Bruder Problem")
}))
/* console.log(data[1].name) */

/* console.log(data.name) */


allData = []

const detractors = []
const indifferents = []
const promoters = []



let getPercentage = (Other1, Other2) => {
	const percentage = Other1.length + 5
	return percentage
}

await console.log("Length of detractors array: " + detractors.length)

const promotersPercent = getPercentage(indifferents, detractors)
console.log("Promoters Percent: " + promotersPercent)

/* console.log(detractors)
console.log(indifferents)
console.log(promoters)
console.log(allData) */



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





getEvaluation()




async function main() {
	try {
		const data = await getEvaluation();
		allData = []

		detractors = []
		indifferents = []
		promoters = []
		/* console.log(data) */
		const newData = data.map((dataPoint) => {
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

			else {
				console.log("Bruder Problem")

			}
		})

		console.log("last line, detractors: " + detractors.length)
		console.log("alldata Length: " + allData.length)
	}
	catch (error) {
		console.log("I HATE ASYNC I HATE ASYNC")
	}

	const percentageDetractors = getPercentage(indifferents, promoters)
	console.log("Percentage Detractors: " + percentageDetractors)

	const percentageIndifferents = getPercentage(detractors, promoters)
	console.log("Percentage Indifferents" + percentageIndifferents)

	const percentagePromoters = getPercentage(detractors, indifferents)
	console.log("Percentage Promoters" + percentagePromoters)

	const netPromoterScore = Math.floor(percentagePromoters - percentageDetractors)
	console.log(netPromoterScore)

	/* const npsScore = document.getElementById() */
	document.getElementById("eval-totalcount").textContent = netPromoterScore;
}





let getPercentage = (Other1, Other2) => {
	const otherVotes = Other1.length + Other2.length
	/* console.log("Other1 Length : " + Other1.length) */
	const targetVotes = allData.length - otherVotes
	/* console.log("target votes : " + targetVotes) */
	const percentage = targetVotes / allData.length * 100
	/* console.log("Percentage from getPercentage :" + percentage) */
	return percentage
}



document.addEventListener("DOMContentLoaded", main())

/* console.log(detractors)
console.log(indifferents)
console.log(promoters)
console.log(allData) */
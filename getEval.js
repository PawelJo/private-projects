


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


		rating1 = []
		rating2 = []
		rating3 = []
		rating4 = []
		rating5 = []
		rating6 = []
		rating7 = []
		rating8 = []
		rating9 = []
		rating10 = []


		/* console.log(data) */
		const newData = data.map((dataPoint) => {
			allData.push(dataPoint)
			if (dataPoint.rating == 0) {
				console.log("Hack someone else")
				return
			}
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
			switch (dataPoint.rating) {
				case 1:
					rating1.push(dataPoint.rating);
					break;
				case 2:
					rating2.push(dataPoint.rating);
					break;
				case 3:
					rating3.push(dataPoint.rating);
					break;
				case 4:
					rating4.push(dataPoint.rating);
					break;
				case 5:
					rating5.push(dataPoint.rating);
					break;
				case 6:
					rating6.push(dataPoint.rating);
					break;
				case 7:
					rating7.push(dataPoint.rating);
					break;
				case 8:
					rating8.push(dataPoint.rating);
					break;
				case 9:
					rating9.push(dataPoint.rating);
					break;
				case 10:
					rating10.push(dataPoint.rating);
					break;
				default:
					console.log("Sorry, we couldn't interpret your rating")
			}
		})

		console.log("last line, detractors: " + detractors.length)
		console.log("alldata Length: " + allData.length)
		console.log("rating10 lenght: " + rating10.length)
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
	document.getElementById("vote-count").textContent = allData.length;


	document.getElementById("rating-1").textContent = rating1.length
	document.getElementById("rating-2").textContent = rating2.length
	document.getElementById("rating-3").textContent = rating3.length
	document.getElementById("rating-4").textContent = rating4.length
	document.getElementById("rating-5").textContent = rating5.length
	document.getElementById("rating-6").textContent = rating6.length
	document.getElementById("rating-7").textContent = rating7.length
	document.getElementById("rating-8").textContent = rating8.length
	document.getElementById("rating-9").textContent = rating9.length
	document.getElementById("rating-10").textContent = rating10.length


	console.log("rating1 length :" + rating1.length)
	console.log("rating2 length :" + rating2.length)
	console.log("rating3 length :" + rating3.length)
	console.log("rating4 length :" + rating4.length)
	console.log("rating5 length :" + rating5.length)
	console.log("rating6 length :" + rating6.length)
	console.log("rating7 length :" + rating7.length)
	console.log("rating8 length :" + rating8.length)
	console.log("rating9 length :" + rating9.length)
	console.log("rating10 length :" + rating10.length)


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
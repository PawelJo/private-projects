const getEvaluation = async () => {
	const response = await
		fetch('http://localhost:8080/eval', {
			method: 'GET',
			mode: 'cors'
		});
	const data = await response.json();
	return data
}

getEvaluation()

allData = []
detractors = []
indifferents = []
promoters = []


async function main() {
	try {
		const data = await getEvaluation();
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

		const newData = data.map((dataPoint) => {

			if (dataPoint.rating == 0) {
				console.log("Hack someone else")
				return
			}
			if (dataPoint.rating < 7) {
				detractors.push(dataPoint.rating)
				allData.push(dataPoint)
			}
			else if (dataPoint.rating == 7 || dataPoint.rating == 8) {
				indifferents.push(dataPoint.rating)
				allData.push(dataPoint)
			}
			else if (dataPoint.rating > 8) {
				promoters.push(dataPoint.rating)
				allData.push(dataPoint)
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

	}
	catch (error) {
		console.log("I HATE ASYNC I HATE ASYNC")
	}
	const percentageDetractors = getPercentage(indifferents, promoters)
	const percentageIndifferents = getPercentage(detractors, promoters)
	const percentagePromoters = getPercentage(detractors, indifferents)

	const netPromoterScore = Math.floor(percentagePromoters - percentageDetractors)

	document.getElementById("eval-totalcount").textContent = netPromoterScore;
	document.getElementById("rating-numVotes").textContent = allData.length;

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

	displayUserData()
}





let getPercentage = (Other1, Other2) => {
	const otherVotes = Other1.length + Other2.length
	const targetVotes = allData.length - otherVotes
	const percentage = targetVotes / allData.length * 100
	return percentage
}



document.addEventListener("DOMContentLoaded", main())


function displayUserData() {
	const jsonData = allData;
	const userListBody = document.getElementById('userListBody');

	userListBody.innerHTML = '';

	// Loop through the JSON data and create table rows
	jsonData.forEach(user => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>${user.name}</td>
			<td>${user.company}</td>
			<td>${user.industry}</td>
			<td>${user.rating}</td>
		`;
		userListBody.appendChild(row);
	});
}
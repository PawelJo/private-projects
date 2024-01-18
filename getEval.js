
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

getEvaluation().then(data => console.log(data[1]))
/* console.log(data[1].name) */

/* console.log(data.name) */

function getLow() {
	if (x < 5) {
		low.push(x)
	}
}
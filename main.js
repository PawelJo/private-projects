



/* 		function captureRating() {
			const capturedRating = document.querySelector('input[name="rating"]:checked').value;
			return capturedRating
	
		} */

/* Little helper function for testing */
/* 		function goToCountDown() {
			e.preventDefault();
			window.location.replace(" http://127.0.0.1:5500/countdown.html");
		} */


/* let customerData;
function getData() {
	fetch('./data.json').then(response => response.json())
		.then(data => {
			customerData = data;
		}).then(() => {
			console.log(customerData)
		});
} */


const oldBody = document.querySelector("body")
console.log("Oldbody :")
console.log(oldBody)

var userID = null
let randomUser = "";
/* let rating = null; */
let capturedRating = null

async function getRandomUser() {
	const response = await
		fetch('http://localhost:8080', {
			method: 'GET',
			mode: 'cors'
		});
	const user = await response.json();
	return user
}





console.log(userID)

function postRating() {

	fetch('http://localhost:8080', {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify({
			id: userID,
			name: randomUser.name,
			rating: parseInt(capturedRating)
		}),
		headers: {
			"Content-type": "application/json"
		}

	})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log(err))
	/* 	console.log("Fire awayy")
		console.log(userID)
		console.log(randomUser.name)
		console.log(capturedRating) */

}



function changeHTML() {

	const oldText = document.querySelector(".survey-content");
	/* console.log(oldText) */
	const newText = document.createElement("div")

	newText.innerHTML =
		'<p class="survey-text id="first-stage">Danke für Ihre Bewertung. Teilen Sie uns gerne mit, was noch verbessert werden muss.</p>'

	const counter = document.createElement('div');
	counter.innerHTML = '<div id="countdown"></div>'

	const ratingSelectedText = document.createElement('p')
	ratingSelectedText.innerHTML =

		/* 				'`<p class="survey-text">`Du hast uns mit ${capturedRating} bewertet.+ <a href="http://127.0.0.1:5500/">Zurück und neubewerten.</a></p>`' */


		'<p class="survey-text">Du hast uns mit ' + capturedRating + ' bewertet. <a href="http://127.0.0.1:5500/">Zurück und neubewerten.</a></p>'

	oldText.replaceWith(newText, ratingSelectedText, counter)

	console.log(`Du hast uns mit ${capturedRating} bewertet.`)

	let timeleft = 3;
	const downloadTimer = setInterval(function () {

		if (timeleft <= 0) {
			clearInterval(downloadTimer);


			/* window.location.replace("http://127.0.0.1:5500/evaluation.html"); */


			const toBeRemoved = document.querySelector("#first-stage")
			const toBeRemoved2 = document.querySelector("#second-stage")
			console.log("Elements to be removed: ")
			console.log(toBeRemoved)
			/* toBeRemoved.innerHTML = '' */
			toBeRemoved.remove()
			toBeRemoved2.remove()

			postRating()


		} else {
			document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
		}
		timeleft -= 1;
	}, 1000);
}

function changeBackHTML() {


	console.log("oldbody  second try :")
	console.log(oldBody)





	document.body.innerHTML = oldBody;

	/* console.log(Body) */
}

function numberChosen() {


	capturedRating =

		document.querySelector('input[name="rating"]:checked').value;

	/* console.log(capturedRating) */


	changeHTML()



}





// Helper Function for navigation

function changeBack() {
	window.location.replace("http://127.0.0.1:5500/")
}

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



function postRating() {

	fetch('http://localhost:8080', {
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify({
			id: userID,
			name: randomUser.name,
			rating: parseInt(capturedRating),
			company: randomUser.company,
			industry: randomUser.industry
		}),
		headers: {
			"Content-type": "application/json"
		}

	})
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(err => console.log("Lak wer bist du " + err))
}



function changeHTML() {

	const oldText = document.querySelector(".survey-content");
	/* console.log(oldText) */
	const newText = document.createElement("div")
	newText.className = 'survey-content';

	newText.innerHTML =
		'<div class="survey-content"><p class="survey-text id="first-stage">Danke für Ihre Bewertung. Teilen Sie uns gerne mit, was noch verbessert werden muss.</p><p class="survey-text-rating">Du hast uns mit ' + capturedRating + ' bewertet.</p><button class="link-button" onClick="killTimer(); changeBackHTML()">Zurück und neubewerten.</button><div id="countdown" class="countdown"></div></div>'

	const counter = document.createElement('div');
	counter.innerHTML = ''

	const ratingSelectedText = document.createElement('p')
	ratingSelectedText.innerHTML = ''

	oldText.replaceWith(newText)

	timerManagement();

}


function killTimer() {
	clearInterval(countdownTimer)
}

function changeBackHTML() {
	const oldBody = `	<div class="wrapper">
	<header class="header">
		<p class="welcome-message" id="first-stage">Hi ${randomUser.name}! Willkommen zurück zu RantWhere.</p>
	</header>
	<div class="survey-box" id="second-stage">
		<div class="survey-content">
			<p class="survey-text">Wie wahrscheinlich (1-10) ist es, dass Sie uns weiterempfehlen werden?</p>

			<div class="ratings">
				<p class="survey-text">Gering</p>

				<form class="radio-form">
					<input type="radio" id="1" name="rating" value="1" onclick="numberChosen()">
					<label for="1">1</label>
					<input type="radio" id="2" name="rating" value="2" onclick="numberChosen()">
					<label for="2">2</label>
					<input type="radio" id="3" name="rating" value="3" onclick="numberChosen()">
					<label for="3">3</label>
					<input type="radio" id="4" name="rating" value="4" onclick="numberChosen()">
					<label for="4">4</label>
					<input type="radio" id="5" name="rating" value="5" onclick="numberChosen()">
					<label for="5">5</label>
					<input type="radio" id="6" name="rating" value="6" onclick="numberChosen()">
					<label for="6">6</label>
					<input type="radio" id="7" name="rating" value="7" onclick="numberChosen()">
					<label for="7">7</label>
					<input type="radio" id="8" name="rating" value="8" onclick="numberChosen()">
					<label for="8">8</label>
					<input type="radio" id="9" name="rating" value="9" onclick="numberChosen()">
					<label for="9">9</label>
					<input type="radio" id="10" name="rating" value="10" onclick="numberChosen()">
					<label for="10">10</label>
				</form>
				<p class="survey-text">hoch</p>
			</div>
		</div>
	</div>


	<div class="exampleGrid">
	<div class="exampleBoxSquare"></div>
	<div class="exampleBoxLong"></div>
	<div class="exampleBoxSquare"></div>
	<div class="exampleBoxSquare"></div>
	<div class="exampleBoxSquare"></div>
	<div class="exampleBoxSquare"></div>
	<div class="exampleBoxSquare"></div>
	<div class="exampleBoxLong"></div>
	<div class="exampleBoxLong"></div>
	<div class="exampleBoxSquare"></div>
	<div class="exampleBoxSquare"></div>
	<div class="exampleBoxSquare"></div>
</div>


</div>

<script src="main.js"></script>
`

	const oldHTML = document.querySelector("body")
	const oldHTML2 = document.querySelector(".survey-box")

	console.log(oldHTML2)

	oldHTML.innerHTML = ''

	console.log("new body triggered")

	const newBody = document.createElement('div')
	newBody.innerHTML = oldBody
	document.body.append(newBody)



}

function numberChosen() {


	capturedRating =

		document.querySelector('input[name="rating"]:checked').value;

	changeHTML()



}



function changeBack() {


	changeBackHTML();
}

let countdownTimer;

function timerManagement() {
	let timeleft = 3;
	countdownTimer = setInterval(function () {

		if (timeleft <= 0) {
			clearInterval(countdownTimer);




			const toBeRemoved = document.querySelector("#first-stage")
			const toBeRemoved2 = document.querySelector("#second-stage")
			console.log("Elements to be removed: ")
			console.log(toBeRemoved)
			toBeRemoved.remove()
			toBeRemoved2.remove()

			postRating()



		} else {

			document.getElementById("countdown").innerHTML = timeleft;
		}
		timeleft -= 1;
	}, 1000);

}
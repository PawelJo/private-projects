document.addEventListener("DOMContentLoaded", async () => {


	try {
		randomUser = await getRandomUser();
	} catch (e) {
		console.log("An Error occured :");
		console.log(e)
	}
	const greeting = document.querySelector(".welcome-message")
	greeting.textContent = `Hi ${randomUser.name}! Willkommen zurück zu RantWhere.`

	window.userID = randomUser.id
	/* console.log(window.userID) */
})


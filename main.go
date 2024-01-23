package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type User struct {
	Id       int    `json:"id"`
	Name     string `json:"name"`
	Rating   int    `json:"rating"`
	Company  string `json:"company"`
	Industry string `json:"industry"`
}

// Test function, DELETE LATER
/* func writeUser() {
	data := User{
		Id:     6,
		Name:   "Hurensohn",
		Rating: 4,
	}

	file, _ := json.MarshalIndent(data, "", "")

	_ = ioutil.WriteFile("test.json", file, 0644)
} */

// Get User for Get Request and to initialize User to receive rating from

func getUsers() (users []User) {

	fileBytes, err := ioutil.ReadFile("data.json")

	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(fileBytes, &users)

	if err != nil {
		panic(err)
	}

	return users

}

// Functions for updating user Rating from received Rating

const filepath string = "data.json"

func readJSON(filePath string) ([]User, error) {
	data, err := ioutil.ReadFile(filepath)
	if err != nil {
		panic(err)
	}

	var users []User
	if err := json.Unmarshal(data, &users); err != nil {
		return nil, err
	}

	return users, nil
}

func writeJSON(filePath string, users []User) error {
	jsonData, err := json.MarshalIndent(users, "", "    ")
	if err != nil {
		panic(err)
	}
	if err := ioutil.WriteFile(filePath, jsonData, 0644); err != nil {
		panic(err)
	}

	return nil
}

func updateRatingByID(users []User, id int, newRating int) {
	for i := range users {
		if users[i].Id == id {
			users[i].Rating = newRating
			break
		}
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func get(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	users := getUsers()

	rand.Seed(time.Now().UnixNano())
	randomIndex := rand.Intn(len(users))

	user, err := json.Marshal(users[randomIndex])
	if err != nil {
		panic(err)
	}

	w.Write(user)
}

func getEval(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	users, err := json.Marshal(getUsers())
	if err != nil {
		panic(err)
	}

	fmt.Println(users)

	w.Write(users)
}

func post(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		enableCors(&w)
		fmt.Println("SHOIGU WHERE IS MY CORS RESPONSE")
		return
	}

	var newUser User

	// Read the JSON data from the request body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		errorMsg := fmt.Sprintf("Error decoding JSON: %v", err)
		http.Error(w, errorMsg, http.StatusBadRequest)
		return
	}

	// Unmarshal the JSON data into the newItem struct
	if err := json.Unmarshal(body, &newUser); err != nil {
		errorMsg := fmt.Sprintf("Error decoding JSON: %v", err)
		http.Error(w, errorMsg, http.StatusBadRequest)
		return
	}

	// Read existing items from the JSON file
	users, err := readJSON(filepath)
	if err != nil {
		errorMsg := fmt.Sprintf("Error reading JSON file: %v", err)
		http.Error(w, errorMsg, http.StatusInternalServerError)
		return
	}

	// Update rating by ID
	updateRatingByID(users, newUser.Id, newUser.Rating)

	// Write updated struct back to JSON file
	if err := writeJSON(filepath, users); err != nil {
		errorMsg := fmt.Sprintf("Error writing to JSON file: %v", err)
		http.Error(w, errorMsg, http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "Rating updated successfully")

	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	fmt.Println("ayy we ballin")
	w.Write([]byte(`{"message": "post called"}`))
}

func put(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	fmt.Println("we getting arab money")
	w.Write([]byte(`{"message": "put called"}`))

}

func delete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "delete called"}`))
}
func options(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "options called"}`))
}

func notFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"message": "not found"}`))
}

func main() {

	/* getUsers() */

	r := mux.NewRouter()
	r.HandleFunc("/", get).Methods(http.MethodGet)
	r.HandleFunc("/eval", getEval).Methods(http.MethodGet)
	r.HandleFunc("/", post).Methods(http.MethodPost)
	r.HandleFunc("/", put).Methods(http.MethodPut)
	r.HandleFunc("/", delete).Methods(http.MethodDelete)
	r.HandleFunc("/", options).Methods(http.MethodOptions)
	r.HandleFunc("/", notFound)
	log.Fatal(http.ListenAndServe(":8080", r))
}

package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type User struct {
	Id     int    `json:"id"`
	Name   string `json:"name"`
	Rating int    `json:"rating"`
}

func writeUser() {
	data := User{
		Id:     6,
		Name:   "Hurensohn",
		Rating: 4,
	}

	file, _ := json.MarshalIndent(data, "", "")

	_ = ioutil.WriteFile("test.json", file, 0644)
}

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

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func get(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	users := getUsers()

	rand.Seed(time.Now().UnixNano())     // seed or it will be set to 1
	randomIndex := rand.Intn(len(users)) // generate a random int in the range 0 to 9

	user, err := json.Marshal(users[randomIndex])
	if err != nil {
		panic(err)
	}

	w.Write(user)
}

func post(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message": "post called"}`))
}

func put(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	w.Write([]byte(`{"message": "put called"}`))
}

func delete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "delete called"}`))
}
func options(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "options called"}`))
}

func notFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{"message": "not found"}`))
}

/*
type Users struct {
	Users []User `json:"users"`
} */

func main() {

	writeUser()

	getUsers()
	/*  	 */

	r := mux.NewRouter()
	r.HandleFunc("/", get).Methods(http.MethodGet)
	r.HandleFunc("/", post).Methods(http.MethodPost)
	r.HandleFunc("/", put).Methods(http.MethodPut)
	r.HandleFunc("/", delete).Methods(http.MethodDelete)
	r.HandleFunc("/", options).Methods(http.MethodOptions)
	r.HandleFunc("/", notFound)
	log.Fatal(http.ListenAndServe(":8080", r))
}

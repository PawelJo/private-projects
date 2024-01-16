package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func get(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	data, err := os.ReadFile("data.json")
	if err != nil {
		fmt.Println("An Error Occured:", err)
		return
	}
	fmt.Println("Your data is:", data)
	// Parse JSON
	var jsonData []map[string]interface{}
	if err := json.Unmarshal(data, &jsonData); err != nil {
		http.Error(w, "Error parsing JSON data", http.StatusInternalServerError)
		return
	}

	jsonResponse, err := json.Marshal(jsonData)
	if err != nil {
		http.Error(w, "Error converting Data to JSON", http.StatusInternalServerError)
		return
	}

	/* defer jsonFile.Close() */

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	/* w.Write([]byte(`{"message": "get called"}`)) */

	w.Write(jsonResponse)
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

type Users struct {
	Users []User `json:"users"`
}

type User struct {
	Name   string `json:"name"`
	Type   string `json:"type"`
	Age    int    `json:"Age"`
	Social Social `json:"social"`
}

type Social struct {
	Facebook string `json:"facebook"`
	Twitter  string `json:"twitter"`
}

/*
	func readJson() {
		jsonFile, err := os.Open("data.json")

		if err != nil {
			fmt.Println(err)
		}
		var users Users

byteValue, _ := io.ReadAll(jsonFile)

		fmt.Println(len(users.Users))
		json.Unmarshal(byteValue, &users)
		 for i := 0; i < len(users.Users); i++ {
			fmt.Println("User Type: " + users.Users[i].Type)
			fmt.Println("User Age: " + strconv.Itoa(users.Users[i].Age))
			fmt.Println("User Name: " + users.Users[i].Name)
			fmt.Println("Facebook Url: " + users.Users[i].Social.Facebook)
			fmt.Println("\n")
		}
		fmt.Println(users)
		fmt.Println("User Type: " + users.Users[2].Type)
		fmt.Println("User Age: " + strconv.Itoa(users.Users[2].Age))
		fmt.Println("User Name: " + users.Users[2].Name)
		fmt.Println("Facebook Url: " + users.Users[2].Social.Facebook)
		fmt.Println("\n")

		byteArray, err := io.ReadAll(jsonFile)
		json.Marshal(byteArray)
		fmt.Println(string(byteArray))

		defer jsonFile.Close()
	}
*/
func main() {

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

// TODO: Figure out how the fuck to return the mapped users from json

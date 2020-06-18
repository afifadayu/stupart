package main

import (
	"fmt"
	"net/http"

	"github.com/chyntiadewifortuna/chatbot/pkg/handler"
	"github.com/urfave/negroni"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", handler.Hello)
	mux.HandleFunc("/chatbot", handler.ChatbotResponseHandler)

	n := negroni.Classic() // Includes some default middlewares
	n.UseHandler(mux)

	fmt.Println("Starting Chatbot at Port 3000")

	err := http.ListenAndServe(":3000", n)

	if err != nil {
		panic(err);
	}
}

package handler

import (
	"encoding/json"
	"fmt"
	"github.com/adrian3ka/go-learn-ai/naive_bayes"
	"github.com/adrian3ka/go-learn-ai/term_frequency"
	"github.com/adrian3ka/go-learn-ai/tf_idf"
	"github.com/adrian3ka/go-learn-ai/word_vectorizer"
	"io/ioutil"
	"log"
	"net/http"
	//"github.com/adrian3ka/go-learn-ai"
)

var predictor naive_bayes.MultinomialNaiveBayes

func init() {
	fmt.Println("Preparing Chatbot")
	wordVectorizer := word_vectorizer.New(word_vectorizer.WordVectorizerConfig{
		Lower: true,
	})

	err := wordVectorizer.Learn(corpuses)

	if err != nil {
		panic(err)
	}

	termFrequency := term_frequency.New(term_frequency.TermFrequencyConfig{
		Binary:         false,
		WordVectorizer: wordVectorizer,
	})

	err = termFrequency.Learn(wordVectorizer.GetCleanedCorpus())

	if err != nil {
		panic(err)
	}

	tfIdf, err := tf_idf.New(tf_idf.TermFrequencyInverseDocumentFrequencyConfig{
		Smooth:          true,
		NormalizerType:  tf_idf.EuclideanSumSquare,
		CountVectorizer: termFrequency,
	})

	if err != nil {
		panic(err)
	}

	err = tfIdf.Fit()

	if err != nil {
		panic(err)
	}

	predictor = naive_bayes.NewMultinomialNaiveBayes(naive_bayes.MultinomialNaiveBayesConfig{
		Evaluator: tfIdf,
	})
}

func Hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Welcome to the home page!")
}

type ChatbotRequest struct {
	Message string `json:"message"`
}

type ChatbotResponse struct {
	Message string `json:"message"`
}

func predict(question string) string  {
	dataTest := []string{
		question,
	}

	predicted, err := predictor.Predict(dataTest)

	if err != nil {
		log.Printf("Error Predicting")
		return "Maaf kami gagal memahami pertanyaan Anda"
	}

	return predicted[0]
}

func ChatbotResponseHandler(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)

	if err != nil {
		log.Printf("Error reading body: %v", err)
		http.Error(w, "can't read body", http.StatusBadRequest)
		return
	}

	requestBody := ChatbotRequest{}

	err = json.Unmarshal(body, &requestBody)

	if err != nil {
		fmt.Fprint(w, err.Error())
		return
	}

	fmt.Println(requestBody.Message)

	topic := predict(requestBody.Message)

	answer := AnswerOf(topic)

	res := ChatbotResponse{
		Message: answer,
	}

	b, err := json.Marshal(res)

	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, string(b))
}

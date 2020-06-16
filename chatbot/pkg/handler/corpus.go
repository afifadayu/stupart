package handler

import (
	"fmt"
	"math/rand"
)

var corpuses map[string][]string
var answer map[string][]string

func init() {
	corpuses = make(map[string][]string)
	answer = make(map[string][]string)

	// ====================== B 1 ================================================
	corpuses[STATISTIKA] = []string{
		"Apa itu statistika?",
		"Apa yang dimaksud dengan statistika?",
		"Statistika adalah?",
		"Pengertian statistika?",
	}

	answer[STATISTIKA] = []string{
		"Oh, Kalau statistika itu cabang dari matematika berupa ilmu yang mempelajari tentang pengumpulan," +
			"penganalisaan, pengolahan, penyajian data berupa informasi yang bermanfaat",
		"Kalau statistika sih cabang dari matematika berupa ilmu yang mempelajari tentang pengumpulan," +
			"penganalisaan, pengolahan, penyajian data berupa informasi yang bermanfaat",
	}

	// ====================== B 2 ================================================
	corpuses[PARAMETER] = []string{
		"Apa itu parameter?",
		"Apa yang dimaksud dengan parameter?",
		"Parameter adalah?",
		"Pengertian parameter?",
	}

	answer[PARAMETER] = []string{
		"Oh kalau parameter itu adalah ukuran-ukuran deskriptif yang menggambarkan populasi",
		"Kalau dalam ruang lingkup statistika parameter adalah ukuran-ukuran deskriptif yang menggambarkan populasi",
	}



	//==================== other ===========================================
	corpuses[HELLO] = []string{
		"hello",
		"hi",
		"halo",
		"hallo",
	}

	answer[HELLO] = []string{
		"Hello, ada yang bisa Starley bantu?",
	}

	corpuses[OTHER] = []string{
		"hello",
		"nanya",
		"sudah makan belum",
		"apa kabar",
		"apa",
		"kenapa",
		"dimana",
	}

	answer[OTHER] = []string{
		"Maaf kak kita kita belum tau jawabannya",
	}

}

func GetCorpus() map[string][]string {
	return corpuses
}

func AnswerOf(topic string) string {
	if _, exists := answer[topic]; !exists {
		fmt.Println("Missing Topic")

		return "Wah kami belum mengerti jawabannya nih kak"
	}

	availableAnswer := answer[topic]

	answerIndex := rand.Intn(len(availableAnswer))

	return availableAnswer[answerIndex]
}

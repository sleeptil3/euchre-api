

class Card {
	static gameValues = {
		"9": 1,
		"10": 2,
		"J": 3,
		"Q": 4,
		"K": 5,
		"A": 6
	}
	constructor(faceValue, suitCode) {
		this.faceValue = faceValue
		this.suit = suits[suitCode]
		this.value = Card.gameValues[faceValue]
	}
}

class Suit {
	constructor(code, name) {
		this.code = code
		this.name = name
	}
}

class Deck {
	static faceValues = ["9", "10", "J", "Q", "K", "A"]
	deck = []
	generateDeck = () => {
		for (const suit in suits) {
			for (const faceValue of Deck.faceValues) {
				this.deck.push(new Card(faceValue, suit))
			}
		}
	}

	// Randomize array in-place using Durstenfeld shuffle algorithm
	// Resourced from StackOverflow user 'ashleedawg'
	shuffleDeck = () => {
		for (let i = this.deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
	}
}

const hearts = new Suit("h", "Hearts")
const diamonds = new Suit("d", "Diamonds")
const spades = new Suit("s", "Spades")
const clubs = new Suit("c", "Clubs")

const suits = {
	"h": { right: hearts, left: diamonds },
	"d": { right: diamonds, left: hearts },
	"s": { right: spades, left: clubs },
	"c": { right: clubs, left: spades }
}

console.log(suits.d)

module.exports = Deck
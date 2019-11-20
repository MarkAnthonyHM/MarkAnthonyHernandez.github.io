let titles = [
  "Membership With Benefits", 
  "It's simple: Bat Haus provides a quiet, productive atmosphere, and the community takes care of itself. You'll be surprised just how much you'll get done and who you may meet in the process."];
const markovTitles = {};
const markovContent = {};
const incompleteClause = ['of', 'to', 'and', 'with', 'from', 'at', 'the', 'is', 'are', 'an', 'a', 'where', 'when', 'in', 'on', 'their', 'her', 'his'];

window.onload = function () {
		markovChainGenerator(titles, markovTitles)
		remix();
}

// modified from https://medium.com/@alexkrameris/markov-chain-implementation-in-javascript-a698f371d66f
function markovChainGenerator(text, markovChain) {
  
	const textArr = [];

	text.forEach((el) => { 
		el.split(' ').forEach((word) => { 
			textArr.push(word) 
		})
	})

	for (let i = 0; i < textArr.length; i++) {
	    let word = textArr[i]//.replace(/[\W_]/, "")
		    if (!markovChain[word]) {
	    		markovChain[word] = []
	    	}
		    if (textArr[i + 1] && word.length > 0) {
		      markovChain[word].push(textArr[i + 1])//.replace(/[\W_]/, ""));
			}
	}
}

function getMarkovText(markovChain) {
	const words = Object.keys(markovChain)
	let word = words[Math.floor(Math.random() * words.length)]
	let result = ''
	for (let i = 0; i < 12; i++ ) {
 		result += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + ' ';
		var newWord =  markovChain[word][Math.floor(Math.random() * markovChain[word].length)]
		word = newWord;
  		if (!word || !markovChain.hasOwnProperty(word)) word = words[Math.floor(Math.random() * words.length)]

  		if (incompleteClause.indexOf(newWord) > -1) {
  			i -= 2;
  		}
  	}

  	return result;
}

function remix() {
	document.getElementById('title').innerText = getMarkovText(markovTitles);
}

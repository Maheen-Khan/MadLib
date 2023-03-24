// get words from API based on query
async function getWords(query) {
    // try/catch in case there is an error
  try{
    // await api response
    const response = await fetch("https://api.datamuse.com/words?" + query);
    // await json response
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
}
    
// generate words based on user input
async function generateWords() {
// create FormData from form
  const form = document.querySelector('form');
  const formData = new FormData(form);
  
  // get input value from form where from each key from FormData
  const adj = formData.get('adj1');
  const adj2 = formData.get('adj2');
  const noun1 = formData.get('noun1');
  const noun2 = formData.get('noun2');

  // sends an alert if any text fields are empty
  if (adj.length == 0 || noun1.length == 0 || adj2.length == 0 || noun2.length == 0) {
    alert("All fields need to be filled")
  }

  else {
  // await API response b/c anytime we call a function with async (i.e. getWords), function that calls must also be async (i.e. generateWords))
  const word1 = await getWords("ml=" + adj);
  // gets a random index from the array recieved from the api so multiple words can be generated
  var randomIndex = getRndm(word1);
  // get element where id="" and replace HTML with word of object in nouns variable
  document.getElementById("word1").innerHTML = word1[randomIndex].word;


  const adjForNoun = await getWords("rel_jjb=" + noun1);
  randomIndex = getRndm(adjForNoun);
  document.getElementById("adj").innerHTML = adjForNoun[randomIndex].word;

  // returns a random letter (except x and z) so more words can be generated
  var letter = alphabet[getRndm(alphabet)];
  const nounForAdj = await getWords("lc=" + adj2 + "&sp=" + letter + "*" );
  randomIndex = getRndm(nounForAdj);
  document.getElementById("noun1").innerHTML = nounForAdj[randomIndex].word;

  const nounAndNoun = await getWords("ml=" + noun2);
  randomIndex = getRndm(nounAndNoun);
  document.getElementById("noun2").innerHTML = nounAndNoun[randomIndex].word;
  }
}

// returns a random index from an array passed through
function getRndm(arr){
  return rndm = Math.floor(Math.random() * (arr.length));
}

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
"k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y"]
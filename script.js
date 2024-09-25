const langButtons = document.querySelectorAll('.lang-button');
const selectLang = document.querySelector('#selectLang');
const textInput = document.querySelector('.text-input');
const translationText = document.querySelector('.translation-text');
const translationFlag = document.querySelector('.translation-flag');
const resetButton = document.querySelector('.reset-button');
const divColore = document.querySelectorAll('.chble');

function reset() {
  textInput.value = '';
  translationText.innerText = 'Traduzione';
  translationFlag.innerText = '';
  cambiaColore("#5b7876")
}

//cambio suggerimento nella casella al cambiare della lingua scelta
function scegliLingua() {
  let lingua = selectLang.value;
  console.log(lingua);
  let messaggio = (lingua == "it") ? "inserisci il testo da tradurre" : "Please enter some text to translate.";
  textInput.setAttribute("placeholder", messaggio);
}
selectLang.addEventListener("change", scegliLingua);


async function translate(text,langPartenza, lang, flag) {
  const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${langPartenza}|${lang}`;
  const response = await fetch(url);
  const jsonData = await response.json();
  const result = jsonData.responseData.translatedText; //->responseData e translatedText sono proprietà dell'oggetto JSON restituito dall'API di traduzion
  console.log(jsonData);
  console.log(result);

  translationText.innerText = result;
  translationFlag.innerText = flag + lang;
}

function cambiaColore(colore) {
  divColore.forEach(element => {
    console.log(colore)
    element.style.backgroundColor= colore;
  });
}

langButtons.forEach(function(langButton) {
  langButton.addEventListener('click', function() {

    // recupero il testo dal campo di input e rimuovo eventuali spazi extra
    // all'inizio e alla fine della stringa inserita con il metodo .trim()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
    const text = textInput.value.trim();

    // recupero il codice lingua dal data-attribute del pulsante
    const langPart = selectLang.value;
    // recupero il codice lingua dal data-attribute del pulsante
    const lang = langButton.dataset.lang;
    // recupero la bandierina dalla testo del pulsante
    const flag = langButton.innerText;

    // se il campo di input ha effettvamente del testo
    // invoco la funzione e faccio partire la chiamata alle API
    if(text.length > 0) {
      translate(text, langPart, lang, flag);
    }

    console.log(lang)
    switch(lang) {
      case "en":
        cambiaColore("#8aa76e");
        break;
    } 
  });
});

resetButton.addEventListener('click', reset);








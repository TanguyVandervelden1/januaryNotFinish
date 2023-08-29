import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const TradPage = () => {
    clearPage();
    renderTradForm();
  };

  function renderTradForm() {
    const main = document.querySelector('main');
    const form = document.createElement('form');
    form.className = 'p-5';
    const frenchLabel = document.createElement('label');
    frenchLabel.innerText = "Français";
    const frenchWord = document.createElement('input');
    frenchWord.type = 'text';
    frenchWord.id = 'frenchWord';
    frenchWord.required = true;
    frenchWord.className = 'form-control mb-3';
    const englishLabel = document.createElement('label');
    englishLabel.innerText = "English";
    const englishWord = document.createElement('input');
    englishWord.type = 'text';
    englishWord.id = 'englishWord';
    englishWord.required = true;
    englishWord.className = 'form-control mb-3';
    
    const submit = document.createElement('input');
    submit.value = 'Ajouter la traduction';
    submit.type = 'submit';
    submit.className = 'btn btn-danger';
    form.appendChild(frenchLabel);
    form.appendChild(frenchWord);
    form.appendChild(englishLabel);
    form.appendChild(englishWord);
    form.appendChild(submit);
    main.appendChild(form);
    form.addEventListener('submit', addTrad);
  
  }

  async function addTrad(e) {

    e.preventDefault();
  
    const french = document.querySelector('#frenchWord').value;
    const english = document.querySelector('#englishWord').value;
  
    const options = {
  
      method: 'POST',
  
      body: JSON.stringify({
  
        "fr" : french,
  
        "en": english,
  
      }),

      headers: {

        'Content-Type': 'application/json',
  
      },
  
  
    };
  
  
    const response = await fetch('/api/trad', options); // fetch return a promise => we wait for the response
  
  
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  
    console.log(response.statusText);
  
    // const newTrad = await response.json(); // json() returns a promise => we wait for the data
  
  
    // console.log('New pizza added : ', newTrad);
  
  
    Navigate('/');
  
  }


  export default TradPage;
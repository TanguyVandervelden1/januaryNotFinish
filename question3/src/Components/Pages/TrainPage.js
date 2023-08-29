import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const TrainPage = () => {
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
    const submit = document.createElement('input');
    submit.value = 'Traduire';
    submit.type = 'submit';
    submit.className = 'btn btn-danger';
    const labelResponseFrench = document.createElement('label');
    labelResponseFrench.id = 'labelResponseFrench';

    form.appendChild(frenchLabel);
    form.appendChild(frenchWord);
    form.appendChild(submit);
    form.appendChild(labelResponseFrench);
    main.appendChild(form);
    form.addEventListener('submit', translateFrench);

    const formEnglish = document.createElement('form');
    formEnglish.className = 'p-5';
    const englishLabel = document.createElement('label');
    englishLabel.innerText = "English";
    const englishWord = document.createElement('input');
    englishWord.type = 'text';
    englishWord.id = 'englishWord';
    englishWord.required = true;
    englishWord.className = 'form-control mb-3';

    const submitEnglish = document.createElement('input');
    submitEnglish.value = 'Translate';
    submitEnglish.type = 'submit';
    submitEnglish.className = 'btn btn-danger';
    const labelResponseEnglish = document.createElement('label');
    labelResponseEnglish.id = 'labelResponseEnglish';

    formEnglish.appendChild(englishLabel);
    formEnglish.appendChild(englishWord);
    formEnglish.appendChild(submitEnglish);
    formEnglish.appendChild(labelResponseEnglish);
    main.appendChild(formEnglish);
    formEnglish.addEventListener('submit', translateEnglish);
      
  }

  async function translateFrench(e) {

    e.preventDefault();
  
    const french = document.querySelector('#frenchWord').value;

    const label = document.querySelector('#labelResponseFrench');
    label.innerText = 'Traduction englaise : ';  
  
    const response = await fetch(`/api/trad/fr?query=${french}`); // fetch return a promise => we wait for the response
  
  
    if (response.ok) {
        const newTrad = await response.json();
        label.appendChild(document.createTextNode(newTrad.en));
    }else {
        const label2 = document.createElement('label');
        label2.style.color="red";
        const doc = document.createTextNode("Impossible d'obtenir la traduction");
        label2.appendChild(doc);
    
        label.appendChild(label2);
    }
 
  
  
    Navigate('/');
  
  }

  async function translateEnglish(e) {

    e.preventDefault();
  
    const english = document.querySelector('#englishWord').value;

    const label = document.querySelector('#labelResponseEnglish');
    label.innerText = 'Traduction française : ';

    const url = `/api/trad/en?query=${english}`;
  
  
    const response = await fetch(url); // fetch return a promise => we wait for the response
  
    if (response.ok) {
        const newTrad = await response.json();
        label.appendChild(document.createTextNode(newTrad.fr));
    }else {
        const label2 = document.createElement('label');
        label2.style.color="red";
        const doc = document.createTextNode("Impossible d'obtenir la traduction");
        label2.appendChild(doc);
    
        label.appendChild(label2);
    }
  
    Navigate('/');
  
  }

  export default TrainPage;
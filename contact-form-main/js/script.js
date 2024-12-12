
const formElement = document.querySelector('.contact-form');
const buttonSubmit = document.getElementById('buttonSubmit');
const messageSuccess = document.querySelector('.invisible');


formElement.addEventListener('submit',(event)=>{
    event.preventDefault();

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    let validateTmp = [];
    let isChecked = false;

    const radioOptions = document.querySelectorAll('.contact-form__input-radio');

    validateTmp.push(validationMessageError(firstName,document.querySelector('#voidFirstName')));
    validateTmp.push(validationMessageError(lastName,document.querySelector('#voidLastName')));
    validateTmp.push(validationMessageError(email,document.querySelector('#voidEmail')));
    validateTmp.push(validationMessageError(message,document.querySelector('#voidText')));
    validateTmp.push(validationMessageErrorChecked(consent,document.querySelector('#voidConsent')));

for (const option of radioOptions) {
    if (option.checked) {
        isChecked = true;
        if (!document.querySelector('#voidQueryType').classList.contains('messageValidationEmpty')) {
            controlMessageError(document.querySelector('#voidQueryType')); // lo quito
        }
        break; // Salimos del bucle porque ya encontramos el checked
    } else {
        isChecked = false;
        if (document.querySelector('#voidQueryType').classList.contains('messageValidationEmpty')) { // si existe la clase no se ve
            controlMessageError(document.querySelector('#voidQueryType')); // lo muestro
        }
    }
}

isChecked?validateTmp.push(1):validateTmp.push(0);

//VALIDA QUE ESTAN LLENOS LOS CAMPOS

    if(!validateTmp.some(item => item === 0)){
       messageSuccess.classList.toggle('invisible');
       setTimeout(() => {
          messageSuccess.classList.toggle('invisible');
       }, 2000);
     }

});

function controlMessageError(nodo){
   nodo.classList.toggle('messageValidationEmpty');
}

function validationMessageError(nodoInput,nodoMsg) {
    if (nodoInput.value == ''){
        if(nodoMsg.classList.contains('messageValidationEmpty')){
           controlMessageError(nodoMsg);
	}
	           return 0;

    }else{
         if(!nodoMsg.classList.contains('messageValidationEmpty'))
            {
	     controlMessageError(nodoMsg);
	    }
	     return 1;

    } 
}

function validationMessageErrorChecked(nodoInput,nodoMsg) {
    if (!nodoInput.checked){
        if(nodoMsg.classList.contains('messageValidationEmpty'))
        {
           controlMessageError(nodoMsg);
	}
	return 0;
        }else{
            if(!nodoMsg.classList.contains('messageValidationEmpty'))
	    {
                controlMessageError(nodoMsg);
   	    }
            return 1;

            } 
}
//obtener datos formularios
//detener el comportamiento por defecto
//aparecer el mensaje de exito

const formElement = document.querySelector('.contact-form');
const buttonSubmit = document.getElementById('buttonSubmit');
const messageSuccess = document.querySelector('.invisible');


formElement.addEventListener('submit',(event)=>{
    event.preventDefault();

    // const firstName = event.

    //Se maneja el mensaje de exito
    messageSuccess.classList.toggle('invisible');
    setTimeout(() => {
        messageSuccess.classList.toggle('invisible');
    }, 2000); 

});
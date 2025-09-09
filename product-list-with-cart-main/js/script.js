/*COLOCAR LAS IMAGENES EN EL ELEMENTO*/

//EXTRAER LA INFORMACION
async function getDataFood(){
   try {
      const data = await fetch('./../data.json')
      const dataFood = await data.json();
      dataFood.forEach(item => {
         console.log(`xobjeto: ${item[1]}`);
       });
      
      //Se devuelve una promesa
      return dataFood;
      
   } catch (error) {
      console.error(`Error: ${error}`)

   }
}

function createCardFood(){
   //SE CREA ELEMENTOS DE LA TARJETA COMIDA
   const containerItems = document.querySelector('.pageFood__items');
   const foodTarget = document.createElement('article');
   const imgContainer = document.createElement('figure');
   const imageContainerResponsive = document.createElement('picture');
   const imageFood = document.createElement('img');
   const buttonAdd = document.createElement('button');
   const iconButton = document.createElement('span');
   const containerDescription = document.createElement('div');
   const typeDescripction = document.createElement('p');
   const nameDescription = document.createElement('p');
   const priceDescripction = document.createElement('p');




   //SE ASIGNA LAS CLASES
   foodTarget.className = 'pageFood__food-Card';
   imgContainer.className = 'food-Card__box-image';
   imageFood.className = 'food-Card__image';
   buttonAdd.className = 'food-Card__button-addCart';
   containerDescription.className = 'food-Card__description';
   typeDescripction.className = 'card-description__type';
   nameDescription.className = 'card-description__name';
   priceDescripction.className = 'card-description__price';
   //ELEMENTOS LLENADOS CON EL JSON
   imageFood.src = './assets/images/image-baklava-mobile.jpg'
   priceDescripction.innerText = 'no $6.50';
   buttonAdd.innerText = 'Add to cart'
   typeDescripction.innerText = 'NO Waffle with B6erries'
   nameDescription.innerText = 'NO WAFFLE'
   
   // foodTarget.className = 'pageFood_food-card';
   
   //SE AGREGAN LOS ELEMENTOS
   containerItems.append(foodTarget);
   foodTarget.append(imgContainer);
   imgContainer.append(imageContainerResponsive);
   imageContainerResponsive.append(imageFood);
   foodTarget.append(buttonAdd);
   buttonAdd.prepend(iconButton);
   foodTarget.append(containerDescription);
   containerDescription.append(typeDescripction);
   containerDescription.append(nameDescription);
   containerDescription.append(priceDescripction);
   

   const x = getDataFood();



   for (const item of x) {
      console.log(item.name);
   }
}
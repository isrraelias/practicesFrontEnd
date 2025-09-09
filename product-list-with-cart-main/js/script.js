<<<<<<< HEAD
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
=======
const buttonAddCart = document.querySelector(".pageFood__items");
const buttonDeleteCart = document.querySelector('.user-cart');
const buttonConfirmed = document.querySelector('.detail-total__button');
const buttonNewOrder = document.querySelector('.confirm-windows__clearButton');

//EXTRAER LA INFORMACION DEL JSON
async function getDataFood() {
/*La naturaleza de la información que traemos nos obliga a acceder a dicha información mediante
un recorrido o bucle y en este caso un */
  try {
    // const data = await fetch("./../data.json");
    const data = await fetch('data.json');
    const dataFood = await data.json();
    return dataFood;
    //retornamos una promesa
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

//inserta los datos recibidos del json
// async function insertDataFood(typeImg) {
//   const dataFood = await getDataFood();
//   dataFood.forEach((item) => {
//     createCardFood(
//       item.image.mobile,
//       item.name,
//       item.category,
//       item.price.toFixed(2)
//     ); //JavaScript interpreta los valores numéricos como Number y elimina los ceros no significativos a la derecha del punto decimal al convertirlos a una cadena
//   });
// }

// Inserta los datos recibidos del JSON
async function insertDataFood(typeImg) {
  const dataFood = await getDataFood();

  dataFood.forEach((item) => {
    // Usamos el tipo de imagen especificado en typeImg
    const selectedImage = item.image[typeImg];

    if (!selectedImage) {
      console.error(`El tipo de imagen '${typeImg}' no existe para el item:`, item);
      return;
    }

    createCardFood(
      //selectedImage, // Imagen seleccionada dinámicamente
      item.image, // Usamos la imagen completa del objeto
      item.name,
      item.category,
      item.price.toFixed(2)
    );
  });
}

//crea la tarjeta de la comida
function createCardFood(img, name, category, price) {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  //SE CREA ELEMENTOS DE LA TARJETA COMIDA
  const containerItems = document.querySelector(".pageFood__items");
  const foodTarget = document.createElement("article");
  const imgContainer = document.createElement("figure");
  const imageContainerResponsive = document.createElement("picture");
  const imageFood = document.createElement("img");
  const imageResponsiveMbl = document.createElement("source");
  const imageResponsiveWds = document.createElement("source");
  const imageResponsiveTbl = document.createElement("source");
  const buttonAdd = document.createElement("button");
  const iconButton = document.createElement("span");
  const containerDescription = document.createElement("div");
  const typeDescripction = document.createElement("p");
  const nameDescription = document.createElement("p");
  const priceDescripction = document.createElement("p");

  let itemName = items.find((item)=> item.id === name.replace(/\s+/g, ''));

  //SE ASIGNA LAS CLASES
  foodTarget.className = "pageFood__food-Card";
  imgContainer.className = "food-Card__box-image";
  imageFood.className = "food-Card__image";
  buttonAdd.className = "food-Card__button-addCart";
  containerDescription.className = "food-Card__description";
  typeDescripction.className = "card-description__type";
  nameDescription.className = "card-description__name";
  priceDescripction.className = "card-description__price";
  
  buttonAdd.dataset.accion = 'agregarPrimario'
  
  //se llena los atributos
  imageResponsiveWds.setAttribute("media", "(min-width: 1024px)");
  imageResponsiveWds.setAttribute("srcset", img.desktop);
  imageResponsiveMbl.setAttribute("media", "(min-width: 768px)");
  imageResponsiveMbl.setAttribute("srcset", img.tablet);
  imageResponsiveTbl.setAttribute("media", "(min-width: 480px)");
  imageResponsiveTbl.setAttribute("srcset", img.mobile);

  //se llena con el json
  imageFood.src = img.mobile;
  typeDescripction.innerText = category;
  nameDescription.innerText = name;//////crear ID?
  priceDescripction.innerText = `$${price}`;
  
  //SE AGREGAN LOS ELEMENTOS
  containerItems.append(foodTarget);
  foodTarget.append(imgContainer);
  imgContainer.append(imageContainerResponsive);
  imageContainerResponsive.append(imageResponsiveWds);
  imageContainerResponsive.append(imageResponsiveMbl);
  imageContainerResponsive.append(imageFood);
  foodTarget.append(buttonAdd);
  foodTarget.append(containerDescription);
  containerDescription.append(typeDescripction);
  containerDescription.append(nameDescription);
  containerDescription.append(priceDescripction);
  
  if (itemName !== undefined ) {
    buttonAdd.innerText = `${itemName.units}`;
    buttonAdd.insertAdjacentHTML('afterbegin',`<span class='button-addCart__btnAdd' data-accion='agregarSecundario'></span>`);
    buttonAdd.insertAdjacentHTML('beforeend',`<span class= 'button-addCart__btnDelete' data-accion='eliminar'></span>`);
    buttonAdd.classList.add('food-Card__button-addCart_with-element')
    
  } else {
    buttonAdd.innerText = "Add to cart";
    iconButton.className = "button-addCart__icon";
    buttonAdd.prepend(iconButton);
  }

}

/*recibe la info a llenar en el carro y actualiza el localStorage */
function updateItemsCart(containerInfo) {
  const itemsInCart = JSON.parse(localStorage.getItem("itemsInCart") || "[]");
  let itemF = {};
  let existItem = false;
  const nameFood = containerInfo.querySelector('.card-description__name').textContent;
  const priceFood = containerInfo.querySelector('.card-description__price').textContent;

  /*si ya existe el producto se deberia sumar en units esto servira para la multiplacion
  del precio x und en el carrito*/
  itemsInCart.forEach((item) =>{
   if (item.name === nameFood) {
      item.units = item.units + 1;
      existItem = true;
      updateElementsCart(item.id,item.units, item.price.slice(1));
      //crear funcion que solo modifique la info de ese elemento?
   }
   
   })

   //si no existe lo crea y lo inserta en el array
   if (!existItem) {
      itemF = {
         id: nameFood.replace(/\s+/g, ''),
         name: nameFood,
         price: priceFood,
         units: 1,
         };
         //crear funcion que solo inserte nuevos elementos en el carrito?
         pushItemsCart(itemF.name,itemF.name,itemF.price.slice(1),itemF.units);
         itemsInCart.push(itemF);
   }
   localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));

}

function getObjectFood(id) {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  return items.filter((item) => item.id === id);
}

//evento del boton añadir al carrito
buttonAddCart.addEventListener("click", (event) => {
  const x = event.target.closest("button") || false;
  const y = event.target.closest(".button-addCart__btnDelete") || false;
  const z = event.target.closest(".button-addCart__btnAdd") || false;
  const accion = event.target.getAttribute('data-accion');  
  
  if (y.nodeName === "SPAN" && accion === 'eliminar') {
    const idElement = x.nextElementSibling.querySelector('.card-description__name');
    let id = document.getElementById(idElement.textContent.replace(/\s+/g, ''));
    deleteOneItemCart(idElement.textContent.replace(/\s+/g, ''));
    modifiqueElementsButton(y);

    let itemExists = getObjectFood(idElement.textContent.replace(/\s+/g, ''));
    console.log(itemExists[0].units);
    if (itemExists[0].units === 0 ) {
      deleteItemCart(id);
    } 
    updateCart();
  }
  
  if (z.nodeName === "SPAN" && accion === 'agregarSecundario') {
    updateItemsCart(x.nextElementSibling);
    modifiqueElementsButton(z);
    updateCart();
  }

  if (x.nodeName === "BUTTON" && accion === 'agregarPrimario') {
    updateItemsCart(x.nextElementSibling);
    updateCart();
    //agregamos clases activas
    activeElementsStyles(x);
  }


});

//actualiza el # de elementos en el titulo del carrito con el localStorage
function updateCart() {
  const x = JSON.parse(localStorage.getItem("itemsInCart") || "[]");
  const cartElement =
    document.querySelector(".user-cart__title").firstElementChild;
  const containerCart = document.querySelector(".user-cart");
  const containerTotalCart = document.querySelector('.user-cart__detail-total');
  const textEmpty = document.querySelector('.user-cart__text-Empty');

  //validamos la imagen del carrito vacio
  //con reduce sumamos el # de unidades y lo inicizamos en 0 para cuando no haya elementos
  let totalUnits = x.reduce((sum,item) => sum + item.units, 0);

    if (totalUnits == 0) {
      containerCart.classList.add("user-cart_img-background");
      containerTotalCart.classList.add('invisible');
      textEmpty.classList.remove('invisible');
    } else {
      containerCart.classList.remove("user-cart_img-background");
      containerTotalCart.classList.remove('invisible');
      textEmpty.classList.add('invisible');
    }

    cartElement.textContent = `(${totalUnits})`;
    totalItemsCart();
}

function pushItemsCart(id,name,price,units) {
   const cart = document.querySelector('.user-cart__detail-total');
   const containerItem = document.createElement('div');
   const nameItem = document.createElement('p');
   const detailItem = document.createElement('p');
   const buttonDeleteItem = document.createElement('p');

   //se agrega el contenido
   nameItem.innerText = name;
   detailItem.innerText = `${units}x`;
   detailItem.insertAdjacentHTML('beforeend',`<span>@ $${price}</span>`);
   detailItem.insertAdjacentHTML('beforeend',`<span>$${(parseFloat(price) * units).toFixed(2)}</span>`);
   buttonDeleteItem.insertAdjacentHTML('beforeend',`<span class='buttonCartDelete'></span>`);

   //se agregan clases
   containerItem.className = 'user-cart__detailItems';
   nameItem.className = 'detailItems__name';
   detailItem.className = 'detailItems__prices';
   detailItem.id = id.replace(/\s+/g, '');//quitamos los espacios en blanco
   buttonDeleteItem.className = 'detailItems__button';

   //se inserta al html
   cart.before(containerItem);
   containerItem.append(nameItem);
   containerItem.append(detailItem);
   containerItem.append(buttonDeleteItem);

}

//ACTUALIZA LOS CAMPOS AL HABER + DE 1 ITEM
function updateElementsCart(id, units, price){
  const item = document.querySelector(`#${id}`);
  item.innerText = `${units}x`;
  item.insertAdjacentHTML('beforeend',`<span>@ $${price}</span>`);
  item.insertAdjacentHTML('beforeend',`<span>$${(parseFloat(price) * units).toFixed(2)}</span>`);

}

//ingresa los datos al refrescar la pagina
function refreshCartItems() {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];

  items.forEach((item)=>{
    pushItemsCart(item.name,item.name,item.price.slice(1),item.units);
  })
}

//saca el total monetario del carrito
// function totalItemsCart() {
//   const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];

//   const prueba = document.querySelector('.detail-total__texto-total');
//   let valor ;

//   valor = items.reduce((sum,item) => {
//     return sum + parseFloat(item.price.slice(1)) * item.units
//   },0)

//   prueba.firstElementChild.innerText = `$${valor.toFixed(2)}`;

// }

function totalItemsCart() {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];

  const elements = document.querySelectorAll('.detail-total__texto-total');
  let valor = items.reduce((sum, item) => {
    return sum + parseFloat(item.price.slice(1)) * item.units;
  }, 0);

  elements.forEach(element => {
    if (element.firstElementChild) {
      element.firstElementChild.innerText = `$${valor.toFixed(2)}`;
    }
  });
}

buttonDeleteCart.addEventListener('click',(event)=>{
  const x = event.target.closest('span') || '';

  if (x.nodeName === "SPAN") {
    const numberItems = x.parentNode.previousElementSibling;
    if (numberItems.textContent.slice(0,1) > 1 ) {
      deleteOneItemCart(numberItems.id)
    } else {
      deleteItemCart(numberItems);
    } 
  }

});

//borra el itemn recibiendo el array con el item creado en el carrito (contiene id)
function deleteOneItemCart(itemCart) {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];

  let x = items.map((item)=> {
    if(item.id === itemCart){
      item.units -= 1;
      updateElementsCart(item.id, item.units, item.price.slice(1));
    }
    //recuerda que debes devolver algo al usar map y al usar {} debes usar return
    return item;
  })

  localStorage.setItem("itemsInCart", JSON.stringify(x));
  updateCart();
}


//borra el itemn recibiendo el array con el item creado en el carrito (contiene id)
//cuando solo hay un elemento
function deleteItemCart(itemCart) {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  const itemDelete = itemCart.parentNode;

  let x = items.filter((item)=> {
    return item.id !== itemCart.id;
  })

  localStorage.setItem("itemsInCart", JSON.stringify(x));

  itemDelete.remove();
  updateCart();
  
}

function activeElementsStyles(buttonNode) {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  let idItem = buttonNode.nextElementSibling.querySelector('.card-description__name');
  idItem = idItem.textContent.replace(/\s+/g, '');
  //obtenemos el elemento html con la img 
  const imgNode = buttonNode.previousElementSibling;
  
  //con que numero vamos a llenar el texto del boton?
  //con el valor de units del localS,¿como lo obtengo?
  //sacando del localS el valor de units mediante el id obtenido
  let infoItemLocal = items.find((item)=> item.id === idItem)
  
  //asignamos el numero al boton
  buttonNode.innerText = `${infoItemLocal.units}`;

  buttonNode.insertAdjacentHTML('afterbegin',`<span class='button-addCart__btnAdd' data-accion='agregarSecundario'></span>`);
  buttonNode.insertAdjacentHTML('beforeend',`<span class= 'button-addCart__btnDelete' data-accion='eliminar'></span>`);

  imgNode.classList.add('food-Card__box-image_with-element');
  buttonNode.classList.add('food-Card__button-addCart_with-element')
}

function modifiqueElementsButton(buttonNode) {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  let idItem = buttonNode.parentNode.nextElementSibling.querySelector('.card-description__name');
  idItem = idItem.textContent.replace(/\s+/g, '');
  const buttonToModified = buttonNode.parentNode;
  const imgNode = buttonNode.parentNode.previousElementSibling;
  let infoItemLocal = items.find((item)=> item.id === idItem);

  if (infoItemLocal.units === 0) {
    const iconButton = document.createElement("span");
    iconButton.className = "button-addCart__icon";
    imgNode.classList.remove('food-Card__box-image_with-element');
    buttonToModified.classList.remove('food-Card__button-addCart_with-element')
    buttonToModified.innerText = "Add to cart";
    buttonToModified.prepend(iconButton);

  }else{
    buttonToModified.innerText = `${infoItemLocal.units}`;
    buttonToModified.insertAdjacentHTML('afterbegin',`<span class='button-addCart__btnAdd' data-accion='agregarSecundario'></span>`);
    buttonToModified.insertAdjacentHTML('beforeend',`<span class= 'button-addCart__btnDelete' data-accion='eliminar'></span>`);
    buttonNode.classList.add('food-Card__button-addCart_with-element')
  }  
}

//borra todos los items del carrito
function deleteAllItemsCart() {
  const containerCart = document.querySelectorAll(".user-cart__detailItems");
  const buttonItems = document.querySelectorAll('.button-addCart__btnDelete');
  
  containerCart.forEach(nodo => {
    nodo.remove();
  });
  
  //limpia el localStorage
  localStorage.removeItem('itemsInCart');
  updateCart();

  buttonItems.forEach((item)=>{
    const imgNode = item.parentNode.previousElementSibling;
    const buttonToModified = item.parentNode;
    
    imgNode.classList.remove('food-Card__box-image_with-element');
    buttonToModified.classList.remove('food-Card__button-addCart_with-element')
    buttonToModified.innerText = "Add to cart";
    const iconButton = document.createElement("span");
    iconButton.className = "button-addCart__icon";
    buttonToModified.prepend(iconButton);
  })
}

  //modifiqueElementsButton(item);  

//inserta en la ventana flotante

//aqui toca volver a combocar la api para sacar el otro tipo de img
async function insertIntoConfirmWindows(item) {
  const containerCart = document.querySelector(".confirm-windows__cart");
  const containerTotalCart = document.querySelector('.confirm-windows__cart-totals');
  const cart = document.querySelector('.user-cart__detail-total');
  const price = item.price.slice(1);

  const containerItem = document.createElement('div');
  const nameItem = document.createElement('p');
  const detailItem = document.createElement('p');
  const finalPriceItem = document.createElement('p');
  const contImgItem = document.createElement('div');
  const imgItem = document.createElement('img');

  //se agrega el contenido
  const urlImg = await getImageFood(item.name);
  console.log(`Aqui va la url para la pantalla flotante ${urlImg}`)
  imgItem.src = urlImg;

  nameItem.innerText = item.name;
  detailItem.innerText = `${item.units}x`;
  detailItem.insertAdjacentHTML('beforeend',`<span>@ $${price}</span>`);
  finalPriceItem.innerText = `$${(parseFloat(price) * item.units).toFixed(2)}`;
  // buttonDeleteItem.insertAdjacentHTML('beforeend',`<span class='buttonCartDelete'></span>`);

  //se agregan clases
  containerItem.className = 'confirm-windows__item';//aqui nos quedamos FELIZ AÑO NUEVO
  contImgItem.className = 'confirm-windows__item-img'
  nameItem.className = 'confirm-windows__item-name';
  detailItem.className = 'confirm-windows__item-detail';
  finalPriceItem.className = 'confirm-windows__item-finalPrice';
  // buttonDeleteItem.className = 'detailItems__button';

  //se inserta al html
  containerCart.prepend(containerItem);
  // cart.before(containerItem);
  containerItem.prepend(contImgItem);
  contImgItem.prepend(imgItem);
  containerItem.append(nameItem);
  containerItem.append(detailItem);
  containerItem.append(finalPriceItem);
  // containerItem.append(buttonDeleteItem);
  totalItemsCart();

}

//funcion que devuelve la img propia de una comida
//necesito recibir el nombre como tipo id
async function getImageFood(nameFood) {
  const dataFood = await getDataFood();//trae todo el objeto json
  const foodItem = dataFood.find(item => item.name === nameFood);
  return foodItem ? foodItem.image.thumbnail : null;
  
  // const x = dataFood.filter((item)=> item.name === nameFood )
  // return x.length > 0 ? x[0].image.thumbnail : null;
}

buttonConfirmed.addEventListener('click',(event)=>{
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];
  const overlay = document.querySelector('.confirm-windows__overlay');
  const ventanaCart = document.querySelector('.confirm-windows');

  overlay.classList.add('visible');
  
  ventanaCart.classList.remove('invisible');
  if (items.length > 0) {
    items.forEach((item)=>{
      insertIntoConfirmWindows(item);
    })
  }else{
    console-log('no hay items en el carro');
  }
})

buttonNewOrder.addEventListener('click',()=>{
  const ventanaOverlay = document.querySelector('.confirm-windows__overlay');
  const ventanaCart = document.querySelector('.confirm-windows');
  const containerCart = document.querySelectorAll(".confirm-windows__item");

  ventanaOverlay.classList.remove('visible');
  ventanaOverlay.classList.add('invisible');
  ventanaCart.classList.add('invisible');

//Quita los items del carrito de la ventana flotante
  containerCart.forEach((item)=>{
    item.remove();
  })

  deleteAllItemsCart();

})

insertDataFood('mobile');
updateCart();
refreshCartItems();
totalItemsCart();
>>>>>>> ab9e39a53d93e0cfc7253e8005a094fd472ab53f

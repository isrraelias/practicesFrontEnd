const buttonAddCart = document.querySelector(".pageFood__items");
const buttonDeleteCart = document.querySelector('.user-cart');
let listaItems = [];

//EXTRAER LA INFORMACION DEL JSON
async function getDataFood() {
/*La naturaleza de la información que traemos nos obliga a acceder a dicha información mediante
un recorrido o bucle y en este caso un */
  try {
    const data = await fetch("./../data.json");
    const dataFood = await data.json();
    return dataFood;
    //retornamos una promesa
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

//inserta los datos recibidos del json
async function insertDataFood() {
  const dataFood = await getDataFood();
  dataFood.forEach((item) => {
    createCardFood(
      item.image.mobile,
      item.name,
      item.category,
      item.price.toFixed(2)
    ); //JavaScript interpreta los valores numéricos como Number y elimina los ceros no significativos a la derecha del punto decimal al convertirlos a una cadena
  });
}

//crea la tarjeta de la comida
function createCardFood(img, name, category, price) {
  //SE CREA ELEMENTOS DE LA TARJETA COMIDA
  const containerItems = document.querySelector(".pageFood__items");
  const foodTarget = document.createElement("article");
  const imgContainer = document.createElement("figure");
  const imageContainerResponsive = document.createElement("picture");
  const imageFood = document.createElement("img");
  const buttonAdd = document.createElement("button");
  const iconButton = document.createElement("span");
  const containerDescription = document.createElement("div");
  const typeDescripction = document.createElement("p");
  const nameDescription = document.createElement("p");
  const priceDescripction = document.createElement("p");

  //SE ASIGNA LAS CLASES
  foodTarget.className = "pageFood__food-Card";
  imgContainer.className = "food-Card__box-image";
  imageFood.className = "food-Card__image";
  buttonAdd.className = "food-Card__button-addCart";
  containerDescription.className = "food-Card__description";
  typeDescripction.className = "card-description__type";
  nameDescription.className = "card-description__name";
  priceDescripction.className = "card-description__price";
  buttonAdd.innerText = "Add to cart";
  //se llena con el json
  imageFood.src = img;
  typeDescripction.innerText = category;
  nameDescription.innerText = name;//////crear ID?
  priceDescripction.innerText = `$${price}`;

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

//evento del boton añadir al carrito
buttonAddCart.addEventListener("click", (event) => {
  const x = event.target.closest("button");

  if (x.nodeName === "BUTTON") {
    updateItemsCart(x.nextElementSibling);
    updateCart();
  }
});

//actualiza el # de elementos en el carrito leyendo el localStorage
function updateCart() {
  const x = JSON.parse(localStorage.getItem("itemsInCart") || "[]");
  const cartElement =
    document.querySelector(".user-cart__title").firstElementChild;
  const containerCart = document.querySelector(".user-cart");
  const textEmpty = document.querySelector('.user-cart__text-Empty');

  //validamos la imagen del carrito vacio
  //con reduce sumamos el # de unidades y lo inicizamos en 0 para cuando no haya elementos
  let totalUnits = x.reduce((sum,item) => sum + item.units, 0)
    if (totalUnits == 0) {
      containerCart.classList.add("user-cart_img-background")
    } else {
      containerCart.classList.remove("user-cart_img-background");
      textEmpty.style.display = 'none'
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

//saca el total del carrito
function totalItemsCart() {
  const items = JSON.parse(localStorage.getItem('itemsInCart')) || [];

  const prueba = document.querySelector('.detail-total__texto-total');
  let valor ;

  valor = items.reduce((sum,item) => {
    return sum + parseFloat(item.price.slice(1)) * item.units
  },0)

  prueba.firstElementChild.innerText = `$${valor.toFixed(2)}`;

}

buttonDeleteCart.addEventListener('click',(event)=>{
  const x = event.target.closest('span');

  if (x.nodeName === "SPAN") {
    //deleteItemCart(x);
    console.log(x.afterElementSibling);
  }

});

insertDataFood();
updateCart();
refreshCartItems();
totalItemsCart();

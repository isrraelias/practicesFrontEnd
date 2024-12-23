const buttonAddCart = document.querySelector(".pageFood__items");
let listaItems = [];

//EXTRAER LA INFORMACION
/*La naturaleza de la información que traemos nos obliga a acceder a dicha información mediante
un recorrido o bucle y en este caso un */
async function getDataFood() {
  try {
    const data = await fetch("./../data.json");
    const dataFood = await data.json();
    return dataFood;
    //retornamos una promesa
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

async function insertDataFood() {
  const dataFood = await getDataFood();
  dataFood.forEach((item) => {
    createCardFood(
      item.image.mobile,
      item.name,
      item.category,
      item.price.toFixed(2)
    ); //JavaScript interpreta los valores numéricos como Number y elimina los ceros no significativos a la derecha del punto decimal al convertirlos a una cadena
    // console.log(`NAME: ${item.image.mobile}`);
    // console.log(`NAME: ${item.name}`);
    // console.log(`NAME: ${item.category}`);
    // console.log(`NAME: ${item.price}`);
  });
}

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
  nameDescription.innerText = name;
  priceDescripction.innerText = `$${price}`;

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
}

insertDataFood();

function updateItemsCart(containerInfo) {
  const itemsInCart = JSON.parse(localStorage.getItem("itemsInCart") || "[]");

  const item = {
    name: containerInfo.firstElementChild.textContent,
    price: containerInfo.lastElementChild.textContent,
  };

  itemsInCart.push(item);
  localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
}

//evento de añadir al carrito
buttonAddCart.addEventListener("click", (event) => {
  const x = event.target.closest("button");

  if (x.nodeName === "BUTTON") {
    updateItemsCart(x.nextElementSibling);
    updateNumberCart();
  } else {
    console.dir(x);
  }
});

//actualiza la cantidad de elementos en el carrito
function updateNumberCart() {
  const x = JSON.parse(localStorage.getItem("itemsInCart") || "[]");
  const cartElement =
    document.querySelector(".user-cart__title").firstElementChild;
  const containerCart = document.querySelector(".user-cart");

  //validamos la imagen del carrito vacio
  x.length == 0
    ? containerCart.classList.add("user-cart_img-background")
    : containerCart.classList.remove("user-cart_img-background");

  cartElement.textContent = `(${x.length})`;
}

updateNumberCart();

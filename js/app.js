document.getElementById("error-message").style.display = "none";
document.getElementById("spinner-id").style.display = "none";
document.getElementById("msg").style.display = "none";

// Button Event Listener...
document.getElementById("input-btn").addEventListener("click", () => {
  /* const msg = */ document.getElementById("msg").style.display = "none";
  // const msgValue = "";

  const inputField = document.getElementById("inputField");
  const inputText = inputField.value;

  if (inputText == "") {
    document.getElementById("spinner-id").style.display = "none";
    document.getElementById("error-message").style.display = "block";
  } else {
    loadFoodNames(inputText);
    inputField.value = "";
    const DetailsContainer = document.getElementById("foodDetails-container");
    DetailsContainer.textContent = "";
    document.getElementById("spinner-id").style.display = "block";
  }
});
// Get Food Name URL...
const loadFoodNames = (name) => {
  console.log(name);
  if (name == "") {
    document.getElementById("spinner-id").style.display = "none";
    document.getElementById("error-message").style.display = "block";
  } else {
    if (name.length == 1) {
      document.getElementById("error-message").style.display = "none";
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
      urlFetching(url);
    } else {
      document.getElementById("error-message").style.display = "none";
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
      urlFetching(url);
    }
  }
};

// Common Function for Fetch Url...
function urlFetching(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => getFoodNames(data.meals));
}
//Get Food name...
const getFoodNames = (names) => {
  if (names == null) {
    document.getElementById("spinner-id").style.display = "none";
    document.getElementById("msg").style.display = "block";
  }
  const container = document.getElementById("food-container");
  container.textContent = "";
  document.getElementById("spinner-id").style.display = "none";
  // document.getElementById("msg").style.display = "none";

  //Food Cart
  for (const name of names) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
                <div class="card h-100">
                <img src="${name.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3 class="card-title">${name.strMeal}</h3>
                        <p class="card-text">
                            ${name.strInstructions.substr(0, 200)}
                        </p>
                    </div>
                    <div class="card-footer">
                   <h4 onclick="loadDetails(${name.idMeal})">More Details</h4>
                  </div>
                </div>
    `;
    container.appendChild(div);
  }
};
//get Food id
const loadDetails = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getDetails(data.meals[0]));
};
//Food Details Card
const getDetails = (Details) => {
  window.scrollTo(0, 40);

  const DetailsContainer = document.getElementById("foodDetails-container");
  const div = document.createElement("div");
  div.className = "card w-75 mx-auto";
  DetailsContainer.textContent = "";
  div.innerHTML = `
  <div class="card h-100">
  <img src="${Details.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${Details.strMeal}</h5>
          <p class="card-text"></p>
          <ul id="ingredient-list"></ul>
      </div>
      <div class="card-footer">
          <h4 onclick="countFood()">Add to cart</h4>
          </div>
      </div>
  `;
  DetailsContainer.appendChild(div);

  const list = document.getElementById("ingredient-list");
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = "strIngredient" + i;
    const ingredient = Details[ingredientKey];

    const quantityKey = "strMeasure" + i;
    const quantity = Details[quantityKey];
    const listItem = ingredient + " " + quantity;
    const li = document.createElement("li");
    if (listItem.length > 2 && listItem.indexOf("null null") != 0) {
      li.innerText = listItem;
      list.appendChild(li);
    }
  }
};

const countFood = () => {
  const itemCount = document.getElementById("item-count");
  const itemText = parseInt(itemCount.innerText) + 1;
  itemCount.innerText = itemText;
  const modalContainer = document.getElementById("modal-container");
  const div = document.createElement("div");
  div.innerHTML += `<div class="bg-primary text-white m-1 p-2"> This is a  Modal Box </div>`;
  modalContainer.appendChild(div);
};

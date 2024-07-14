// https://www.themealdb.com/api.php

/// <reference types="../@types/jquery" />

// * ===================== Global ====================>>
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

// ? ===================== When Start ====================>>
$(".inner-loading-screen").fadeIn(300);

// $(".open-close ").on("click", function(){
//   console.log("open-close");
// })

function openSideNav() {
  $(".side-nav-menu").animate(
    {
      left: 0
    },
    500
  );

  $(".links li").animate({ top: "0px" }, 600);
  $(".open-close").removeClass("fa-align-justify");
  $(".open-close").addClass("fa-x");

  $(document).on("click",function() {
    $('.links li').each(function(index) {
      $(this).delay(index * 200).fadeIn(50);
    });
  });

  $(".links li").each(function (index) {
    $(this)
      .delay(index * 50)
      .animate(
        {
          top: 0
        },
        50
      );
  });
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -boxWidth
    },
    500
  );
  $(".links li").animate({ top: 300 }, 100);
  $(".open-close").addClass("fa-align-justify");
  $(".open-close").removeClass("fa-x");
}

closeSideNav();
$(".side-nav-menu .open-close").on("click", function () {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

// ? ===================== Function ====================>>

// =====================   getData()  =======================

async function getData() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let data = await response.json();
  // console.log(data.meals);
  displayRecipe(data.meals);
}
getData();

// =====================  displayRecipe()  =======================
function displayRecipe(meals) {
  $(".inner-loading-screen").fadeIn(500);

  console.log(meals);
  let recipeBox = "";
  for (i = 0; i < meals.length; i++) {
    recipeBox += `
    <div class="col-md-3">
                <div onclick="getMealDetails('${meals[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meals[i].strMealThumb}" alt="food" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
        </div>
    
    `;
  }
  // console.log(meals[i].strCategory);

  rowData.innerHTML = recipeBox;
  $(".inner-loading-screen").fadeOut(500);
}

// =====================  showSearchInputs()  =======================
function showSearchInputs() {
  searchContainer.innerHTML = `
  <div class="row py-4 ">
      <div class="col-md-6 ">
          <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
      </div>
      <div class="col-md-6">
          <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
      </div>
  </div>`;

  rowData.innerHTML = "";
}

// =====================  searchByName()  =======================
async function searchByName(term) {
  closeSideNav();
  rowData.innerHTML = "";

  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? displayRecipe(response.meals) : displayRecipe([]);
  $(".inner-loading-screen").fadeOut(500);
}

// =====================  searchByFLetter()  =======================
async function searchByFLetter(term) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? displayRecipe(response.meals) : displayRecipe([]);
  $(".inner-loading-screen").fadeOut(500);
}

// =====================  getCategories()  =======================
async function getCategories() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);
  searchContainer.innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(500);
}

// =====================   displayCategories()  =======================
function displayCategories(arr) {
  let recipeBox = "";

  for (let i = 0; i < arr.length; i++) {
    recipeBox += `
      <div class="col-md-3">
              <div onclick="getCategoryMeals('${
                arr[i].strCategory
              }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${
                    arr[i].strCategoryThumb
                  }" alt="img" >
                  <div class="meal-layer position-absolute text-center text-black p-2">
                      <h3>${arr[i].strCategory}</h3>
                      <p>${arr[i].strCategoryDescription
                        .split(" ")
                        .slice(0, 20)
                        .join(" ")}</p>
                  </div>
              </div>
      </div>
      `;
  }

  rowData.innerHTML = recipeBox;
  console.log(arr);
}

// =====================   getArea()  =======================
async function getArea() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayArea(respone.meals);
  $(".inner-loading-screen").fadeOut(500);
}

// =====================   displayArea()  =======================
function displayArea(meals) {
  let recipeBox = "";

  for (let i = 0; i < meals.length; i++) {
    recipeBox += `
      <div class="col-md-3">
              <div onclick="getAreaMeals('${meals[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                      <i class="fa-solid fa-house-laptop fa-4x"></i>
                      <h3>${meals[i].strArea}</h3>
              </div>
      </div>
      `;
  }

  rowData.innerHTML = recipeBox;
}

// =====================   getIngredients()  =======================
async function getIngredients() {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  searchContainer.innerHTML = "";

  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayIngredients(respone.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

function displayIngredients(arr) {
  let recipeBox = "";

  for (let i = 0; i < arr.length; i++) {
    recipeBox += `
      <div class="col-md-3">
              <div onclick="getIngredientsMeals('${
                arr[i].strIngredient
              }')" class="rounded-2 text-center cursor-pointer">
                      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                      <h3>${arr[i].strIngredient}</h3>
                      <p>${arr[i].strDescription
                        .split(" ")
                        .slice(0, 20)
                        .join(" ")}</p>
              </div>
      </div>
      `;
  }

  rowData.innerHTML = recipeBox;
}

// =====================   getCategoryMeals()  =======================
async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayRecipe(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

// =====================   getAreaMeals()  =======================
async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayRecipe(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

// =====================   getIngredientsMeals()  =======================
async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayRecipe(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(500);
}

// =====================   getMealDetails()  =======================
async function getMealDetails(mealID) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(500);

  searchContainer.innerHTML = "";
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();

  console.log(`details ${respone.meals[0]} `);
  displayMealDetails(respone.meals[0]);
  $(".inner-loading-screen").fadeOut(500);
}

// =====================   displayMealDetails()  =======================
function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
      <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let recipeBox = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredients}
              </ul>

              <h3>Tags :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`;

  rowData.innerHTML = recipeBox;
}


// =====================   showContacts()  =======================
function showContacts() {
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswdTouched = true;
  });
}

let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passwordTouched = false;
let repasswdTouched = false;

// =====================  inputValidation()  =======================

function nameValidation() {
  return /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/.test(
    document.getElementById("nameInput").value
  );
}

function emailValidation() {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]|1[0-4][0-9]|150)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

function inputsValidation() {
  if (nameTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswdTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

const input1 = document.querySelector("#FormControlInput1");
const btn1 = document.querySelector("#sb-btn");
const content = document.querySelector(".row-1");
const content2 = document.querySelector(".row-2");
const content3 = document.querySelector(".row-3");
const countryInfo1 = document.querySelector(".country1");
const countryInfo2 = document.querySelector(".country2");
let contentCount = 0;

// request.open("GET", "https://restcountries.com/v3.1/name/turkey");
// request.send();

// function setCousntry(data) {
//   console.log(data.name.common);
//   console.log("Ülkenin nüfusu " + data.population);
//   console.log("Ülkenin başkenti " + data.capital);
//   console.log("Ülkenin bölgesi " + data.subregion);
//   console.log("Ülkenin parabirimi " + Object.values(data.currencies)[0].name);
//   console.log(data.flags.svg); //flag img
// }

const setCountry = (country) => {
  const request = new XMLHttpRequest();
  request.open("GET", "https://restcountries.com/v3.1/name/" + country);
  request.send();
  request.addEventListener("load", () => {
    const data = JSON.parse(request.responseText);
    flagImg = data[0].flags.svg;
    cardTitle = data[0].name.common;
    displayCountry(data);
  });
};
const displayCountry = (data) => {
  contentCount += 1;
  let mans = (data[0].population / 10000000).toFixed(0);
  let icons = `<i class="fa-solid fa-user"></i>`;
  let totalIcons = icons.repeat(mans);
  let countryCard = `
  <div class="card h-100" style="width: 18rem">
        <div class="card-header">
          <h5 class="card-title">${cardTitle}</h5>
        </div>
        <img src="${flagImg}" class="card-img-top" />
        <div class="card-body">
          <p class="card-text" id="card-text">
          The capital city of ${data[0].name.common} is ${data[0].capital}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Population :</b> ${(
            data[0].population / 1000000
          ).toFixed(2)} Million</li>
          <li class="list-group-item"><b>Region :</b> ${data[0].subregion}</li>
          <li class="list-group-item"><b>Currency :</b> ${
            Object.values(data[0].currencies)[0].name
          }</li>
        </ul>
        
      </div>
  `;
  let popMan = `${totalIcons}`;
  if (contentCount == 1) {
    content.innerHTML = countryCard;
    countryInfo1.innerHTML = popMan;
  } else if (contentCount == 2) {
    content3.innerHTML = countryCard;
    countryInfo2.innerHTML = popMan;
  } else {
    contentCount = 1;
    content.innerHTML = countryCard;
    countryInfo1.innerHTML = popMan;
  }
};

btn1.addEventListener("click", () => {
  country = input1.value;
  setCountry(country);
});

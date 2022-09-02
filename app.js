const input1 = document.querySelector("#FormControlInput1");
const btn1 = document.querySelector("#sb-btn");
const content = document.querySelector(".row-1");
const content2 = document.querySelector(".row-2");
const content3 = document.querySelector(".row-3");
const countryInfo1 = document.querySelector(".country1");
const countryInfo2 = document.querySelector(".country2");
let contentCount = 0;

const setCountry = (country) => {
  fetch("https://restcountries.com/v3.1/name/" + country)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Country not found. Please write the country name in English."
        );
      }
      return response.json();
    })
    .then((data) => displayCountry(data))
    .catch((error) => displayErr(error));
};
const displayCountry = (data) => {
  contentCount += 1;
  let crn = Object.keys(data[0].currencies)[0];
  let mans = (data[0].population / 10000000).toFixed(0);
  let icons = `<i class="fa-solid fa-user"></i>`;
  let totalIcons = icons.repeat(mans);
  let countryCard = `
  <div class="card h-100" style="width: 18rem">
        <div class="card-header">
          <h5 class="card-title">${data[0].name.common}</h5>
        </div>
        <img src="${data[0].flags.svg}" class="card-img-top" />
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
            Object.values(Object.values(data[0].currencies)[0])[0]
          } ${crn}</li>
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
const displayErr = (error) => {
  return alert(error.message);
};
btn1.addEventListener("click", () => {
  country = input1.value;
  setCountry(country);
});

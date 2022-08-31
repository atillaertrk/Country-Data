const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/name/turkey");
request.send();
request.addEventListener("load", () => {
  const data = JSON.parse(request.responseText);
  console.log(data[0].population);
  setCountry(data[0]);
});
function setCountry(data) {
  console.log(data.name.common);
  console.log("Ülkenin nüfusu " + data.population);
  console.log("Ülkenin başkenti " + data.capital);
  console.log("Ülkenin bölgesi " + data.subregion);
  console.log("Ülkenin parabirimi " + Object.values(data.currencies)[0].name);
  console.log(data.flags.svg); //flag img
}

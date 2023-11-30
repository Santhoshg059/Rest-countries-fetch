document.addEventListener("DOMContentLoaded", () => {
  const countryCardsContainer = document.getElementById("countryCards");

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((countries) => {
      countries.forEach((country) => {
        const col = document.createElement("div");
        col.classList.add(
          "row",
          "col-sm-6",
          "col-md-4",
          "col-lg-4",
          "col-xl-4",
          "col-sm-12",
          "mb-4"
        );

        const card = document.createElement("div");
        card.classList.add("card", "h-100");

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.innerText = country.name.common;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardImg = document.createElement("img");
        cardImg.classList.add(
          "card-img-top",
          "row",
          "col-sm-6",
          "col-md-4",
          "col-lg-4",
          "col-xl-4"
        );
        cardImg.setAttribute("tagName", "IMG");
        cardImg.src = country.flags.png;
        cardImg.alt = country.name.common;
        cardBody.appendChild(cardImg);

        const cardText = document.createElement("div");
        cardText.classList.add("card-text");
        cardText.setAttribute("tagName", "DIV");

        const region = document.createElement("p");
        region.innerText = `Region: ${country.region}`;
        cardText.appendChild(region);


        const capital = document.createElement("p");
        capital.innerText = `Capital: ${country.capital}`;

        const latlng = document.createElement("p");
        latlng.innerText = `Latlng: ${country.latlng}`;
        
        // Append card details to the card body
        cardText.appendChild(capital);
        cardText.appendChild(latlng);
        
        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary");
        button.innerText = "Click for Weather";

        button.addEventListener("click", () => {
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=8cab4454850b3b42a483c3199bc8463f`
          )
            .then((response) => response.json())
            .then((weatherData) => {
              console.log(weatherData);
            })
            .catch((error) => {
              console.log("Error fetching weather data:", error);
            });
        });
        cardBody.appendChild(cardText);

        cardBody.appendChild(button);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        col.appendChild(card);
        countryCardsContainer.appendChild(col);
      });
    })
    .catch((error) => {
      console.log("Error fetching countries data:", error);
    });
});

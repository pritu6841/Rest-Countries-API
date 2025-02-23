const countryName = new URLSearchParams(window.location.search).get('name');
const outerBox = document.querySelector('.outerBox');
const countryContent = document.querySelector('.country-content1');
const countryFlag = document.querySelector('.country-flag');
const backButton = document.querySelector('.anchor');
const mode = document.querySelector('.darkMode')
const body = document.querySelector('body')

mode.addEventListener('click',(e)=>{
    body.classList.toggle('dark')
})


// Check if countryName is available before proceeding
if (countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            data.forEach((country) => {
                console.log(country);

                // Display flag image
                const flagImage = document.createElement('img');
                flagImage.src = country.flags.svg;
                countryFlag.append(flagImage);

                // Gather country data
                const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A";
                const population = country.population ? country.population.toLocaleString() : "N/A";
                const region = country.region || "N/A";
                const subRegion = country.subregion || "N/A";
                const capital = country.capital ? country.capital[0] : "N/A";
                const topLevelDomain = country.tld ? country.tld[0] : "N/A";
                const currencies = country.currencies ? Object.values(country.currencies).map(cur => cur.name).join(', ') : "N/A";
                const languages = country.languages ? Object.values(country.languages).join(', ') : "N/A";

                // Create HTML content
                const countryContentHtml = `
                    <h3 class="card-title">${country.name.common}</h3>
                    <div class="details-text">
                        <p><b>Native Name: </b>${nativeName}</p>
                        <p><b>Population: </b>${population}</p>
                        <p><b>Region: </b>${region}</p>
                        <p><b>Sub Region: </b>${subRegion}</p>
                        <p><b>Capital: </b>${capital}</p>
                        <p><b>Top level Domain: </b>${topLevelDomain}</p>
                        <p><b>Currencies: </b>${currencies}</p>
                        <p><b>Languages: </b>${languages}</p>
                    </div>`;

                countryContent.innerHTML = countryContentHtml;

                // Border countries section
                const borderCountries = document.createElement('div');
                borderCountries.classList.add('border-country');
                
                if (country.borders && country.borders.length > 0) {
                    const boldTag = document.createElement('b');
                    boldTag.innerText = `Border Countries: `;
                    borderCountries.append(boldTag);

                    country.borders.forEach((border) => {
                        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                            .then((res) => {
                                if (!res.ok) {
                                    throw new Error(`Failed to fetch border country: ${border}`);
                                }
                                return res.json();
                            })
                            .then(([borderCountry]) => {
                                const borderCountryTag = document.createElement('a');
                                borderCountryTag.innerText = borderCountry.name.common;
                                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
                                borderCountries.append(borderCountryTag);
                            })
                            .catch((error) => console.error('Error fetching border country:', error));
                    });
                } else {
                    borderCountries.innerHTML = `<p>No border countries</p>`;
                }

                countryContent.append(borderCountries);
            });
        })
        .catch((error) => console.error('Error fetching country data:', error));
} else {
    console.error("Country name is not specified in the URL");
}

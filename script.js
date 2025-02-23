
const countryContainer = document.querySelector('.country-container')
const filterByRegion = document.querySelector('.filter')
const searchInput = document.querySelector('.search input')
const mode = document.querySelector('.darkMode')
const body = document.querySelector('body')
let allCountries

mode.addEventListener('click',(e)=>{
    body.classList.toggle('dark')
})
fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data)=>{
        renderCountries(data)
        allCountries = data
    })

filterByRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data)=> renderCountries(data))

})    
    function renderCountries(data){
        countryContainer.innerHTML = '' 
        data.forEach((country)=>{
            const countryCard = document.createElement('a')
            countryCard.classList.add('countries-card')
            countryCard.href = `/country.html?name=${country.name.common}`
            const cardHtml = `
                <img src=${country.flags.svg} alt="">
                <div class="country-content">
                    <h3 class="card-title"> ${country.name.common}</h3>
                    <p><b>Population: </b> ${new Intl.NumberFormat("en-IN").format(country.population)}</p>
                    <p><b>Region: </b>${country.region}</p>
                    <p><b>Capital: </b>${country.capital?.[0]}</p>
                </div>`
            countryCard.innerHTML = cardHtml
            
            countryContainer.append(countryCard)
        })
    }

searchInput.addEventListener('input', (e)=>{
    // console.log(e.target.value);
    // console.log(allCountries);
    const filterData = allCountries.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filterData);
})

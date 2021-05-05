document.addEventListener("DOMContentLoaded", function() {
    fetchImages();
    fetchBreeds();
    attachChangeListener();
})

const allBreeds = [];

function attachChangeListener() {
    const dropdown = document.querySelector("#breed-dropdown");
    dropdown.addEventListener("change", handleOnChange);
}

function handleOnChange(event) {
    const letter = event.target.value;
    const filteredBreeds = allBreeds.filter(
        (breedName) => breedName[0] === letter
    );
    document.querySelector("#dog-breeds").innerHTML = ""; //wipes out any child elements that exist
    filteredBreeds.forEach(renderListItem); // iterate over a filtered array & re-render it
}

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
        .then(response => response.json())
        .then((data) => data.message.forEach(renderImage));
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    fetch(breedUrl)    
        .then(response => response.json())
        .then((data) => {
            breeds = data.message
            renderListItems(data.message)
        });
};

function renderImage(url) {
    const img = document.createElement("img");
    img.src = url;
    img.className = "dog-image"
    document.querySelector("#dog-image-container").append(img);
}

function renderListItems(breeds) {
    for(const breed in breeds) {
        allBreeds.push(breed)
        renderListItem(breed); 
        for(const subBreed of breeds[breed]) {
            const fullBreedName = `${subBreed} ${breed}`;
            allBreeds.push(fullBreedName);
            renderListItem(fullBreedName);
        }
}};

function renderListItem(breedName) {
    const li = document.createElement("li")
    li.innerText = breedName;
    document.querySelector("#dog-breeds").append(li);
}

/* Line 12 fetch is an asyncronous function that returns a promise object that we can 
   call .then on, which will invoke a callback function if the promise is resolved -
   since it's being passed an anonymous callback function - this is invoking another
   function, so we can just have renderImage as the callback function */
// Line 13 
    // Making network request to a server that's responding w/ JSON
    // Col 37-57; for each url, create <img/> element - .forEach an be used b/c iterating over an array
// Line 14 (a callback function), returns a promise
// Line 16 iterate over array of image urls
// Line 17 & 18; set the source attribute of the img = url
// Line 21 append the img to the page - because doc.querSel()returns object, we can chain on a method

// OPTIONAL
// Line 19 Style images w/ CSS; creates class attribute for each image
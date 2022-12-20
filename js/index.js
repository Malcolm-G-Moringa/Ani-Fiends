// Print function
const print = data=>console.log(data);

// Global Variables
const RECOMMEND = "https://api.jikan.moe/v4/recommendations/anime";
const SEASON_NOW = "https://api.jikan.moe/v4/seasons/now";

// HTML ROWS
const seasonRow = document.querySelector('#season-container div.row');

fetch(SEASON_NOW)
.then(resp=>resp.json())
.then(data=>initSeason(data.data))

function initSeason(data){
  print(data)
  for(let anime of data){
    showSeasonal(anime);
  }
}

function showSeasonal(data){
  // Assign image and title data to variables
  const image = data.images.jpg.large_image_url;
  const title = data.title;

  // Create card element to put image and title
  const card = document.createElement('div');
  card.classList = ('card mb-5');

  // create card body element to put title
  const cardBody = document.createElement('div');
  cardBody.classList = ('card-body');

  // create image element
  const imageElement = document.createElement('img');
  imageElement.classList = ('card-img-top');
  imageElement.alt = title;
  imageElement.src = image;

  // create header for title
  const cardTitle = document.createElement('h4');
  cardTitle.classList = ('card-title text-center');
  cardTitle.textContent = title;

  // append title to cardBody
  cardBody.append(cardTitle);

  // append cardBody and image to card
  card.append(imageElement,cardBody);

  // append card to season row
  seasonRow.append(card);
}
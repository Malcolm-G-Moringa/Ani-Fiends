// Print function
const print = data=>console.log(data);

// Global Variables
const RECOMMEND = "https://api.jikan.moe/v4/recommendations/anime";
const SEASON_NOW = "https://api.jikan.moe/v4/seasons/now";

// HTML ROWS
const seasonRow = document.querySelector('#season-container div.row');

// Login page
// Variable for login form
const loginForm = document.querySelector('.loginBox form');

// add event listener to form
loginForm.addEventListener('submit',e=>{
  e.preventDefault();
  const username = e.target.querySelector('#uname').value;
  const password = e.target.querySelector('#pass').value;

  if(username !='' && pass != ''){
    document.querySelector('#home').removeAttribute('hidden');
    document.querySelector('#login-page').setAttribute('hidden','');
    document.querySelector('#login-style').remove();
  }
})

fetch(SEASON_NOW)
.then(resp=>resp.json())
.then(data=>initSeason(data.data))

fetch(RECOMMEND)
.then(resp=>resp.json())
.then(data=>{
  print(data)
  initRecommend(data.data)
})

function initSeason(data){
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

function initRecommend(data){
  print(data)
  const animes = data.slice(0,10);

  // create variables to access an anime in the array of recommended animes
  let animesValue = 0;
  let currentAnime = animes[animesValue].entry[0];

  // assign buttons to variables
  const prevBtn = document.querySelector('#prev-recommend button');
  const nextBtn = document.querySelector('#next-recommend button');

  // add eventlisteners to buttons
  prevBtn.addEventListener('click',e=>{
    if(animesValue>0){
      --animesValue;
      showRecommend();
    }
  })
  
  nextBtn.addEventListener('click',e=>{
    if(animesValue<animes.length){
      ++animesValue;
      showRecommend();
    }
  });

  showRecommend();


  function showRecommend(){
    // get anime info
    fetch(`https://api.jikan.moe/v4/anime/${animes[animesValue].entry[0].mal_id}`)
    .then(resp=>resp.json())
    .then(data=>displayRecommend(data.data))

    function displayRecommend(anime){
      print(anime)
      // select the elements to show recommend details
      const recommendImg = document.querySelector('.recommend-img');
      const recommendTitle = document.querySelector('#recommend-title');
      const recommendSynopsis = document.querySelector('#recommend-synopsis');
      
      // show recommend image
      recommendImg.src = anime.images.webp.image_url;

      // show recommend title
      recommendTitle.textContent = animes[animesValue].entry[0].title;

      // show recommend synopsis
      recommendSynopsis.textContent = anime.synopsis
    }
  }

}
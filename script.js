const apiKey = 'EF9pGkGyJfYa1KoKJEx4AhJQGAvAnE1l'

// =======================loader=======================
function animation() {
    setTimeout(() => {
        document.querySelector('.animationSec1').style.animation = 'loading 1s'
    }, 100);
    setTimeout(() => {
        document.querySelector('.animationSec2').style.animation = 'loading 1s'
    }, 1000);
    setTimeout(() => {
        document.querySelector('.animationSec4').style.animation = 'loading 1s'
    }, 2000);
    setTimeout(() => {
        document.querySelector('.animationSec3').style.animation = 'loading 1s'
    }, 4000);
    setTimeout(() => {
        document.querySelector('.animationSec1').style.animation = ''
        document.querySelector('.animationSec2').style.animation = ''
        document.querySelector('.animationSec3').style.animation = ''
        document.querySelector('.animationSec4').style.animation = ''
    }, 5000)
}
animation()

let restartAnimation = setInterval(() => {
    animation()
}, 5001);


// =======================navMenu=======================
const hamMenuFirst = document.querySelector('.hamMenuFirst')
const hamMenuSecond = document.querySelector('.hamMenuSecond')
const slideMenu = document.querySelector('.slideMenu')

let hamMenuClicked = false
document.querySelector('.hamMenu').addEventListener('click', () => {
    if (!hamMenuClicked) {
        hamMenuFirst.style.width = '35px'
        hamMenuSecond.style.width = '35px'
        slideMenu.style.right = '0'
        hamMenuClicked = true
    } else {
        hamMenuFirst.style.width = '25px'
        hamMenuSecond.style.width = '30px'
        slideMenu.style.right = '-170px'
        hamMenuClicked = false
    }
})

// =======================Header=======================
let length = 4
async function showNews() {
    const topNewsResponse = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + apiKey)

    const topNewsData = await topNewsResponse.json()

    //Injecting Data in Front article
    document.querySelector('.headerTitle').innerHTML = topNewsData.results[0].title
    document.querySelector('.newsby').innerHTML = topNewsData.results[0].byline
    document.querySelector('.newsdate').innerHTML = '&#8226; ' + topNewsData.results[0].published_date

    try {
        document.querySelector('.topNewsImage').src = topNewsData.results[0].media[0]['media-metadata'][2].url
        
    } catch(error) {
        document.querySelector('.topNewsImage').style.display = "none"
    }

    document.querySelector('.topNewsAbstract').innerHTML = topNewsData.results[0].abstract

    document.querySelector('.topNewsReadMoreButton').href = topNewsData.results[0].url

    //injecting Data in other Article
    for (let i = 0; i < length; i++) {
        document.querySelector('.otherHeaderArticleContainer').innerHTML += `
            <a class="OtherArticleWrapper" target="_blank" href='${topNewsData.results[i].url}'>
                <img src="assests/" class="otherTopNewsImage">

                <div class="otherArticleInfo">
                    <h1 class="otherHeaderTitle">${topNewsData.results[i].title}</h1>

                    <div class="otherHeaderTitleInfo">
                        <span class="otherNewsby">${topNewsData.results[i].byline}</span>
                        <span class="otherNewsdate">${topNewsData.results[i].published_date}</span>
                    </div>
                </div>
            </a>`
    }

    i = 1
    document.querySelectorAll('.otherTopNewsImage').forEach(element => {
        try {
            element.src = topNewsData.results[i].media[0]['media-metadata'][1].url
        } catch (error) {
            element.src = 'assests/no-pictures.png'
        }
        i++
    })

    // loading screen
    document.querySelector('.loader').style.opacity = '0'
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none'
    }, 600);
    clearInterval(restartAnimation)
}

showNews()


// Show More Top Article Button
let showMore = true
document.querySelector('.showMoreTopArticles').addEventListener('click', () => {
    if (showMore) {
        length = 10
        document.querySelector('.showLessTopArticles').innerHTML = 'Show less'
        document.querySelector('.showMoreTopArticles img').style.rotate = '180deg'

        showMore = false
    } else if (!showMore) {
        length = 4
        document.querySelector('.showLessTopArticles').innerHTML = 'Show more'
        document.querySelector('.showMoreTopArticles img').style.rotate = '-180deg'
        document.querySelector('.otherHeaderArticleContainer').innerHTML = ''
        showMore = true
    }
    showNews()
})

// =======================Search=======================
document.querySelector('.searchButton').addEventListener('click', () => {
    document.querySelector('.searchResult').innerHTML = `<img src="assests/loader.png" class="loadingContent">`
    const filter = document.querySelector('.searchBar').value
    searchKeywords(filter)
})
document.querySelector('.searchBar').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('.searchResult').innerHTML = `<img src="assests/loader.png" class="loadingContent">`
        const filter = document.querySelector('.searchBar').value
        searchKeywords(filter)
    }
})

async function searchKeywords(filter) {
    const searchNews = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${filter}&api-key=` + apiKey)

    const searchNewsData = await searchNews.json()

    document.querySelector('.searchResult').innerHTML = ''

    for (let i = 0; i < 9; i++) {
        document.querySelector('.searchResult').innerHTML += `
        <a href="${searchNewsData.response.docs[i].web_url}">
            <div class="searchResultLink">
                <h1 class="searchResultHeadline">${searchNewsData.response.docs[i].headline.main}</h1>
                <p class="searchResultAbstract">${searchNewsData.response.docs[i].abstract}</p>
            </div>
        </a>`  
    }    
}

// =======================Show Top Stories=======================
async function showTopStories(section) {

    const topStories = await fetch(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=` + apiKey)
    
    const topStoriesData = await topStories.json()

    document.querySelector('.topStoriesContainer').innerHTML = ''


    let imgSrc
    for (let i = 0; i < 3; i++) {

        // If API didnt Provide the Image it will change the image to 'no-picture'
        try {
            imgSrc = topStoriesData.results[i].multimedia[1].url
        } catch (error) {
            imgSrc = 'assests/no-pictures.png'
        }

        // inject Stories in HTML
        document.querySelector('.topStoriesContainer').innerHTML += `
        <a href=${topStoriesData.results[0].url}>
            <div class="topStoriesWrapper">
                <img src=${imgSrc} class="topStoriesImg">
                <div class="topStoriesInfo">
                    <h1 class="topStoriesTitle">${topStoriesData.results[i].title}</h1>
                    <div class="topStoriesBy">${topStoriesData.results[i].byline}</div>
                    <p class="topStoriesAbstract">${topStoriesData.results[0].abstract}</p>
                </div>
            </div>
        </a>`
    }    

}

// Stories Section Scroll Bar
document.querySelectorAll('.topStoriesSection').forEach(element => {
    element.addEventListener('click', (e) => {
        document.querySelector('.topStoriesContainer').innerHTML = `<img src="assests/loader.png" class="loadingContent">`

        // it will make all section normal
        document.querySelectorAll('.topStoriesSection').forEach(element => {
            element.style.backgroundColor = '#212121'
            element.style.color = '#fff'
        })
        // change the color of clicked section
        e.target.style.backgroundColor = '#fff'
        e.target.style.color = '#212121'
        showTopStories(e.target.innerHTML)
    })
});
showTopStories('technology')

// Stories Section Scroll
const storiesScrollContainer = document.querySelector('.topStoriesSectionContainer')

document.querySelector('.forwardButton').addEventListener('click', () => {
    storiesScrollContainer.scrollLeft += 300
})
document.querySelector('.backwardButton').addEventListener('click', () => {
    storiesScrollContainer.scrollLeft -= 300
})

storiesScrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault()
    storiesScrollContainer.scrollLeft += e.deltaY
})

// =======================Book Section=======================
async function showBookReview() {
    const bookReview = await fetch('https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=' + apiKey)

    const bookReviewData = await bookReview.json()

    try {
        const bookReviewResult = bookReviewData.results

        for (let i = 0; i < 15; i++) {
            document.querySelector('.bookReviewWrapper').innerHTML += `
            <a class="bookReviewLink" href="${bookReviewResult.books[i].amazon_product_url}">
                <div class="bookContainer">
                    <img class="bookCover" src="${bookReviewResult.books[i].book_image}" >
                    <h2 class="bookTitle">${bookReviewResult.books[i].title}</h2>
                    <h6 class="bookAuthor">${bookReviewResult.books[i].author}</h6>
                
                    <p class="bookDiscribtion">${bookReviewResult.books[i].description}</p>
                </div>
            </a>`
        }
        
    } catch (error) {
        console.log(error);
        document.querySelector('.bookReview').style.display = 'none'
    }
    
}

showBookReview()

// Book Review Section Scroll
const BookScrollContainer = document.querySelector('.bookReviewWrapper')

document.querySelector('.bookForwardButton').addEventListener('click', () => {
    BookScrollContainer.scrollLeft -= 300
})
document.querySelector('.bookBackwardButton').addEventListener('click', () => {
    BookScrollContainer.scrollLeft += 300
})

BookScrollContainer.addEventListener('wheel', (e) => {
    e.preventDefault()
    e.deltaY > 0 ? BookScrollContainer.scrollLeft += e.deltaY + 200: BookScrollContainer.scrollLeft += e.deltaY - 200
})
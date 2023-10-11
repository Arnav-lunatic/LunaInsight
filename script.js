const apiKey = 'sSasVjjGp7OnXVkkIGb0Edn8qIBZi2Jb'

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
    let i = 1
    document.querySelectorAll('.otherHeaderTitle').forEach(element => {
        element.innerHTML = topNewsData.results[i].title
        i++
    });

    i = 1
    document.querySelectorAll('.otherNewsby').forEach(element => {
        element.innerHTML = topNewsData.results[i].byline
        i++
    })

    i = 1
    document.querySelectorAll('.otherNewsdate').forEach(element => {
        element.innerHTML = '&#8226; ' + topNewsData.results[i].published_date
        i++
    })



    i = 1
    document.querySelectorAll('.otherTopNewsImage').forEach(element => {
        try {
            element.src = topNewsData.results[i].media[0]['media-metadata'][1].url
        } catch (error) {
            element.src = 'assests/no-pictures.png'
        }
        i++
    })


    i = 1
    document.querySelectorAll('.OtherArticleWrapper').forEach(element => {
        element.href = topNewsData.results[i].url
        i++
    })
}

showNews()

// Search
document.querySelector('.searchButton').addEventListener('click', () => {
    document.querySelector('.searchResult').innerHTML = ''
    const filter = document.querySelector('.searchBar').value
    searchKeywords(filter)
})
document.querySelector('.searchBar').addEventListener('keypress', (e) => {
    if (e.key = 'Enter') {
        document.querySelector('.searchResult').innerHTML = ''
        const filter = document.querySelector('.searchBar').value
        searchKeywords(filter)
    }
})

async function searchKeywords(filter) {
    const searchNews = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${filter}&api-key=` + apiKey)

    const searchNewsData = await searchNews.json()

    for (let i = 0; i < 10; i++) {
        document.querySelector('.searchResult').innerHTML += `
        <a href="${searchNewsData.response.docs[i].web_url}">
            <div class="searchResultLink">
                <h1 class="searchResultHeadline">${searchNewsData.response.docs[i].headline.main}</h1>
                <p class="searchResultAbstract">${searchNewsData.response.docs[i].abstract}</p>
            </div>
        </a>`  
    }    
}
    
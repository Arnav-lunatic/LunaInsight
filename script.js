const apiKey = 'sSasVjjGp7OnXVkkIGb0Edn8qIBZi2Jb'

async function showNews() {
    const topNewsResponse = await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=' + apiKey)

    let topNewsData = await topNewsResponse.json()

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
            element.style.display = "none"
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
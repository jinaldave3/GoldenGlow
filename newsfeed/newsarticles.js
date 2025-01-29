const apiKey = '7e2c8b42c7894ad48429130cd4906bd8';
let currentIndex = 0;
let articlesData = [];

async function fetchArticles(query) {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
        const data = await response.json();
        articlesData = data.articles;
        displayArticle(currentIndex);
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}


function displayMainArticle(index) {
    const article = articlesData[index];
    document.getElementById('mainArticleTitle').innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
    document.getElementById('mainArticleImage').src = article.urlToImage;
    document.getElementById('mainArticleDescription').innerText = article.description;
}

function displayRelatedArticles(startIndex) {
    const relatedArticlesContainer = document.getElementById('relatedArticlesContainer');
    relatedArticlesContainer.innerHTML = '';

    for (let i = startIndex; i < startIndex + 3; i++) {
        if (i >= articlesData.length) break;
        const article = articlesData[i];
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('related-article');
        articleDiv.innerHTML = `
            <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
            <img src="${article.urlToImage}" alt="Article Image" width="100">
            <p>${article.description}</p>
        `;
        relatedArticlesContainer.appendChild(articleDiv);
    }
}



function displayArticle(index) {
    displayMainArticle(index);
    displayRelatedArticles(index + 1);
}

function prevArticle() {
    currentIndex = (currentIndex - 1 + articlesData.length) % articlesData.length;
    displayArticle(currentIndex);
}

function nextArticle() {
    currentIndex = (currentIndex + 1) % articlesData.length;
    displayArticle(currentIndex);
}

window.onload = () => {
    fetchArticles('menopause');
   
};

async function searchArticles() {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput.trim() === '') {
        alert('Please enter a search query.');
        return;
    }
    await fetchArticles(searchInput);
}

async function filterArticles(filter) {
    const searchInput = document.getElementById('searchInput').value;
    await fetchArticles(`menopause ${filter} ${searchInput}`);
}
window.onload = start.fetchArticles();
  
  // Call fetchArticles every 10 minutes (600 seconds)
  setInterval(fetchArticles, 600000);
  
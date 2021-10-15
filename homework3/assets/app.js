const searchTxt = document.querySelector(".input-txt");
const bookList = document.querySelector(".book-list");
const searchBtn = document.querySelector(".search-btn");

function loadBookList(data) {
    const booksList = data.items
    const booksElement = booksList.map((book) => {
        const bookInfo = book.volumeInfo
        const { title, authors, imageLinks, volumeLink } = bookInfo
        return `<div class="book-item">
                        <img class="book-img" src=${imageLinks.thumbnail} alt="image of book"/>
                        <h3 class="book-title">${title}</h3>
                        <span class="book-author">${authors?authors.join(''):"UNKNOW"}</span>
                        <a href=${volumeLink} target="blank" class="btn btn-detail" onclick="showDetail()">Detail</a>
                    </div>`
    })
    bookList.innerHTML = booksElement.join('')
}

function searchBook() {
    const searchValue = searchTxt.value
    if (searchValue) {
        const booksApi = 'https://www.googleapis.com/books/v1/volumes?q'
        bookList.innerHTML = "Loading..."
        fetch(`${booksApi}=${searchValue}`)
            .then(res => res.json())
            .then(data => loadBookList(data))
    } else {
        bookList.innerHTML = "Please enter name of the book!"
    }
}

searchBtn.addEventListener('click', function() {
    searchBook()
})
searchTxt.addEventListener('keydown', function(e) {
    if (e.which === 13) {
        searchBtn.click()
        search.blur()
    }
})
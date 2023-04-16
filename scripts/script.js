// fetch book by search

export const fetchBooks = async (searchTerm) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;

    const promise = await fetch(url);
    const response = await promise;
    const bookData = await response.json();
    console.log(bookData.items);
    return bookData.items;
};

// getting book info
export const bookInfo = async (searchTerm) => {
    const info = await fetchBooks(searchTerm);

    const bookDetail = info.map((book) => {
        const description =
            book.volumeInfo?.description ?? "Book Description Not Available";
        // cut short description
        const desc = description.split(" ");
        const shortDesc = desc.slice(0, 35).join(" ");
        const bookInfo = {
            img:
                book.volumeInfo?.imageLinks?.thumbnail ??
                "./assets/book-img-not-found.png",
            title: book.volumeInfo?.title ?? "Title Not Available",
            author: book.volumeInfo?.authors ?? "Authors Not Available",
            description: shortDesc.length < 30 ? shortDesc : `${shortDesc} ...`,
        };
        return bookInfo;
    });
    return bookDetail;
};

// book info cards from search

export const bookCard = (book) => {
    // make book div
    const bookCard = document.createElement("div");
    bookCard.className = "book__card";

    // book img
    const bookImg = document.createElement("img");
    bookImg.className = "book__img";
    bookImg.src = `${book.img}`;
    bookCard.appendChild(bookImg);

    // book title
    const bookTitle = document.createElement("h3");
    bookTitle.className = "book__title";
    const bookTitleNode = document.createTextNode(
        `${book.title.toUpperCase()}`
    );
    bookTitle.appendChild(bookTitleNode);
    bookCard.appendChild(bookTitle);

    // book author
    const bookAuthor = document.createElement("p");
    bookAuthor.className = "book__author";
    const bookAuthorNode = document.createTextNode(`Author: ${book.author}`);
    bookAuthor.appendChild(bookAuthorNode);
    bookCard.appendChild(bookAuthor);

    // book desc
    const bookDesc = document.createElement("p");
    bookDesc.className = "book__desc";
    const bookDescNode = document.createTextNode(`${book.description}`);
    bookDesc.appendChild(bookDescNode);
    bookCard.appendChild(bookDesc);

    return bookCard;
};

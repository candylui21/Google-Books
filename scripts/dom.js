import { bookInfo } from "./script.js";
import { bookCard } from "./script.js";

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const searchResultsDiv = document.querySelector(".searchResults");
const searchResultsTitle = document.querySelector(".searchResults__title");
// event listener for search button
searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.replace(/\s+/g, "+");
    const bookSearch = await bookInfo(searchTerm);
    console.log(bookSearch);
    const bookGrid = bookSearch.map((book) => bookCard(book));
    console.log(bookGrid);
    // append to html
    searchResultsDiv.innerHTML = "";
    bookGrid.forEach((book) => {
        searchResultsDiv.appendChild(book);
    });
    // create search title

    const searchTitle = document.createElement("p");
    searchTitle.className = "searchResults__title";
    const searchTitleNode = document.createTextNode(
        `Your Perfect Pairing With "${searchTerm}" :`
    );
    searchTitle.appendChild(searchTitleNode);
    const searchResultsTitle = document.createElement("div");
    searchResultsTitle.className = "searchResults__titleContainer";
    searchResultsTitle.appendChild(searchTitle);
    searchResultsDiv.prepend(searchResultsTitle);

    // clear search bar
    searchInput.value = "";
    searchResultsDiv.scrollIntoView({ behavior: "smooth", block: "start" });
});

// hover over title to view desc
const title = document.querySelector("#title");
const titleDesc = document.querySelector("#title__desc");
title.addEventListener("mouseenter", () => {
    title.classList.add("hover");
    titleDesc.classList.add("hover");
});
title.addEventListener("mouseleave", () => {
    title.classList.remove("hover");
    titleDesc.classList.remove("hover");
});

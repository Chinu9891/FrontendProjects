/** @type {HTMLButtonElement} */
const addBookmarkBtn = document.getElementById("add-bookmark");
/** @type {HTMLElement} */
const bookmarkList = document.getElementById("bookmark-list");
/** @type {HTMLInputElement} */
const bookmarkNameInput = document.getElementById("bookmark-name");
/** @type {HTMLInputElement} */
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

addBookmarkBtn.addEventListener("click", function () {
   const name = bookmarkNameInput.value.trim();
   const url = bookmarkUrlInput.value.trim();

   if (!name || !url) {
      alert("Please enter both name and URL.");
      return;
   }

   if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Please enter a valid URL (starting with http:// or https://).");
      return;
   }


   addBookmark(name,url);
   saveBookmark(name,url);
   bookmarkNameInput.value = "";
   bookmarkUrlInput.value = "";

   console.log(`Bookmark added: ${name} - ${url}`);
});

function addBookmark(name,url){
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = name;
    link.target = "_blank";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name,url);
    })

    li.appendChild(link);
    li.appendChild(removeButton);

    bookmarkList.appendChild(li);
}

function getBookmarksFromStorage() {
    const bookmarks = localStorage.getItem("bookmarks");
    return bookmarks ? JSON.parse(bookmarks) : []
}

function saveBookmark(name,url){
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({name,url});
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}

function loadBookmarks() {
   const bookmarks = getBookmarksFromStorage();
   bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}

function removeBookmarkFromStorage(name,url){
    const bookmarks = getBookmarksFromStorage();
    bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

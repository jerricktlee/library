const myLibrary = [
   new Book("The Lightning Thief", "Rick Riordan", 377, true),
   new Book("The Sea of Monsters", "Rick Riordan", 279, true),
   new Book("The Titan's Curse", "Rick Riordan", 312, true)
];

const addBtn = document.querySelector('#add-btn');
const bookContainer = document.querySelector('.book-container');
const dialog = document.querySelector('#modal');
const showBtn = document.querySelector('#add-btn');
const closeBtn = document.querySelector('#close-btn');

function Book(title, author, pages, read) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
   const newBook = new Book(title, author, pages, read);
   myLibrary.push(newBook);
}

addBtn.addEventListener('click', () => {
   dialog.showModal();
   dialog.addEventListener('click', clickOutsideToClose);
});

closeBtn.addEventListener('click', (e) => {
   closeModalHandler();
});

function clickOutsideToClose(e) {
   if (e.target.id === 'modal') {
      closeModalHandler();
   }
}

function closeModalHandler(e) {
   dialog.removeEventListener('click', clickOutsideToClose);
   dialog.close();
   e.preventDefault();
}

function displayBooks() {
   myLibrary.forEach((book) => {
      const bookCard = document.createElement('div');
      const title = document.createElement('p');
      const author = document.createElement('p');
      const pages = document.createElement('p');
      const readBtn = document.createElement('button');
      const removeBtn = document.createElement('button');

      title.textContent = `"${book.title}"`;
      author.textContent = book.author;
      pages.textContent= book.pages;
      if (book.read) {
         readBtn.textContent = 'Read';
         readBtn.className = 'read-btn';
      } else {
         readBtn.textContent = 'Not read';
         readBtn.className = 'not-read-btn';
      }
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'remove-btn';

      bookCard.className = 'card';
      bookCard.appendChild(title);
      bookCard.appendChild(author);
      bookCard.appendChild(pages);
      bookCard.appendChild(readBtn);
      bookCard.appendChild(removeBtn);
      
      console.log(bookCard);

      bookContainer.appendChild(bookCard);
   });
}
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
const submitBtn = document.querySelector('#submit-btn');
const form = document.querySelector('#book-form');

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

function clickOutsideToClose(e) {
   if (e.target.id === 'modal') {
      closeModalHandler();
   }
}

function closeModalHandler() {
   dialog.removeEventListener('click', clickOutsideToClose);
   dialog.close();
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
      addReadEventListener(readBtn);
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

function addReadEventListener(readBtn) {
   readBtn.addEventListener('click', () => {
      if (readBtn.className === 'read-btn') {
         readBtn.textContent = 'Not read';
         readBtn.className = 'not-read-btn';
      }
      else if (readBtn.className === 'not-read-btn') {
         readBtn.textContent = 'Read';
         readBtn.className = 'read-btn';
      }
   });
}

addBtn.addEventListener('click', () => {
   dialog.showModal();
   dialog.addEventListener('click', clickOutsideToClose);
});

closeBtn.addEventListener('click', (e) => {
   closeModalHandler();
});

form.addEventListener('submit', (e) => {
   e.preventDefault();
   dialog.close();
   const data = new FormData(form);
   const title = data.get("title");
   const author = data.get("author");
   const pages = data.get("pages");
   const read = data.get("read") === 'on' ? true : false;

   form.reset();
   console.log(`title: ${title}\mauthor: ${author}\npages: ${pages}\nread: ${read}`);
   addBookToLibrary(title, author, pages, read);
   displayBooks();
});
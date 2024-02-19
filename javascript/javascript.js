const myLibrary = [];

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

Book.prototype.toggleRead = function() {
   if (this.read) {
      this.read = false;
   } else {
      this.read = true;
   }
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
   form.reset();
}

function displayBooks() {
   myLibrary.forEach((book, index) => {
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
      
      bookCard.setAttribute('index', index);

      addReadEventListener(readBtn);
      addRemoveEventListener(removeBtn);

      bookContainer.appendChild(bookCard);
   });
}

function addReadEventListener(readBtn) {
   readBtn.addEventListener('click', () => {
      if (myLibrary[readBtn.parentNode.getAttribute('index')].read) {
         readBtn.textContent = 'Not read';
         readBtn.className = 'not-read-btn';
      } else {
         readBtn.textContent = 'Read';
         readBtn.className = 'read-btn';
      }
      console.log(myLibrary[readBtn.parentNode.getAttribute('index')].read);
      myLibrary[readBtn.parentNode.getAttribute('index')].toggleRead();
      console.log(myLibrary[readBtn.parentNode.getAttribute('index')].read);
   });
}

function addRemoveEventListener(removeBtn) {
   removeBtn.addEventListener('click', () => {
      const index = removeBtn.parentNode.getAttribute('index');
      const childToRemove = document.querySelector(`.card:nth-child(${+index+1})`);
      myLibrary.splice(index,1);
      childToRemove.parentNode.removeChild(childToRemove);
      resetDisplay();
   });
}

function clearDisplay() {
   while(bookContainer.firstChild) {
      bookContainer.removeChild(bookContainer.firstChild);
   }
}

function resetDisplay() {
   clearDisplay();
   displayBooks();
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
   addBookToLibrary(title, author, pages, read);
   resetDisplay();
});
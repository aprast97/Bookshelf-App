// Membuat rak buku
let books = [];

// Memuat data buku dari localStorage
function loadBooks() {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
}

// Menyimpan data buku ke localStorage
function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

// Menampilkan daftar buku
function displayBooks() {
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');

  incompleteBookList.innerHTML = '';
  completeBookList.innerHTML = '';

  books.forEach((book) => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', book.id);
    bookItem.setAttribute('data-testid', 'bookItem');

    const title = document.createElement('h3');
    title.setAttribute('data-testid', 'bookItemTitle');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.setAttribute('data-testid', 'bookItemAuthor');
    author.textContent = `Penulis: ${book.author}`;

    const year = document.createElement('p');
    year.setAttribute('data-testid', 'bookItemYear');
    year.textContent = `Tahun: ${book.year}`;

    const buttonContainer = document.createElement('div');
    
    const completeButton = document.createElement('button');
    completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    completeButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
    completeButton.addEventListener('click', () => toggleBookStatus(book.id));

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.textContent = 'Hapus Buku';
    deleteButton.addEventListener('click', () => deleteBook(book.id));

    const editButton = document.createElement('button');
    editButton.setAttribute('data-testid', 'bookItemEditButton');
    editButton.textContent = 'Edit Buku';
    
    // Menerapkan fungsi edit agar bisa ditambahkan sesuai kebutuhan

    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    bookItem.appendChild(title);
    bookItem.appendChild(author);
    bookItem.appendChild(year);
    bookItem.appendChild(buttonContainer);

    if (book.isComplete) {
      completeBookList.appendChild(bookItem);
    } else {
      incompleteBookList.appendChild(bookItem);
    }
  });
}

// Menambahkan buku baru
function addBook(title, author, year, isComplete) {
  const book = {
    id: Date.now().toString(),
    title,
    author,
    year,
    isComplete,
  };
  books.push(book);
  saveBooks();
  displayBooks();
}

// Menghapus buku
function deleteBook(id) {
  books = books.filter((book) => book.id !== id);
  saveBooks();
  displayBooks();
}

// Mengubah status buku (belum selesai dibaca atau selesai dibaca)
function toggleBookStatus(id) {
  const book = books.find((book) => book.id === id);
  if (book) {
    book.isComplete = !book.isComplete;
    saveBooks();
    displayBooks();
  }
}

// Membenahi form tambah buku
const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = parseInt(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  addBook(title, author, year, isComplete);

  bookForm.reset();
});

// Memuat buku saat halaman pertama kali dimuat
loadBooks();
displayBooks();

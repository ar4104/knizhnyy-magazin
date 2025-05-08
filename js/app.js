// Класс для хранения и обработки данных о книгах
class BookStore {
  constructor() {
    this.books = new Map(); // ключ - ID книги, значение - объект книги
  }

  addBook(book) {
    if (this.books.has(book.id)) {
      alert('Книга с таким ID уже существует');
      return false;
    }
    this.books.set(book.id, book);
    return true;
  }

  removeBook(id) {
    return this.books.delete(id);
  }

  getBook(id) {
    return this.books.get(id);
  }

  getAllBooks() {
    return Array.from(this.books.values());
  }
}

const store = new BookStore();

// Создание формы и кнопок
function createForm() {
  const formContainer = document.getElementById('form-container');
  formContainer.innerHTML = `
    <form id="book-form">
      <label for="id">ID книги:</label>
      <input type="text" id="id" name="id" required />

      <label for="author">ФИО автора:</label>
      <input type="text" id="author" name="author" required />

      <label for="title">Название книги:</label>
      <input type="text" id="title" name="title" required />

      <label for="publisher">Издательство:</label>
      <input type="text" id="publisher" name="publisher" required />

      <label for="pages">Количество страниц:</label>
      <input type="number" id="pages" name="pages" required min="1" />

      <div class="buttons">
        <button type="submit">Ввести данные</button>
        <button type="button" id="clear-btn">Очистить форму</button>
        <button type="button" id="delete-btn">Удалить запись по ID</button>
        <button type="button" id="show-all-btn">Показать все данные</button>
        <button type="button" id="show-id-btn">Показать элемент по ID</button>
      </div>
    </form>
    <div id="id-input-container" style="margin-top:10px; display:none;">
      <label for="id-input">Введите ID:</label>
      <input type="text" id="id-input" />
      <button type="button" id="id-submit-btn">Показать</button>
    </div>
  `;

  const form = document.getElementById('book-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const book = {
      id: form.id.value.trim(),
      author: form.author.value.trim(),
      title: form.title.value.trim(),
      publisher: form.publisher.value.trim(),
      pages: parseInt(form.pages.value, 10),
    };
    if (store.addBook(book)) {
      alert('Книга добавлена');
      form.reset();
      renderBooks(store.getAllBooks());
    }
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    form.reset();
  });

  document.getElementById('delete-btn').addEventListener('click', () => {
    const id = prompt('Введите ID книги для удаления:');
    if (id) {
      if (store.removeBook(id.trim())) {
        alert('Книга удалена');
        renderBooks(store.getAllBooks());
      } else {
        alert('Книга с таким ID не найдена');
      }
    }
  });

  document.getElementById('show-all-btn').addEventListener('click', () => {
    renderBooks(store.getAllBooks());
  });

  document.getElementById('show-id-btn').addEventListener('click', () => {
    const idInputContainer = document.getElementById('id-input-container');
    idInputContainer.style.display = 'block';
  });

  document.getElementById('id-submit-btn').addEventListener('click', () => {
    const id = document.getElementById('id-input').value.trim();
    if (!id) {
      alert('Введите ID');
      return;
    }
    const book = store.getBook(id);
    if (book) {
      renderBooks([book]);
    } else {
      alert('Книга с таким ID не найдена');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createForm();
});

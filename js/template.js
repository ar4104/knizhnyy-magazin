// Шаблон Handlebars для вывода информации о книгах
const bookTemplateSource = `
  <div class="book-list">
    {{#if books.length}}
      <h2>Список книг</h2>
      <ol>
        {{#each books}}
          <li>
            <h3>{{title}}</h3>
            <p><strong>ID:</strong> {{id}}</p>
            <p><strong>Автор:</strong> {{author}}</p>
            <p><strong>Издательство:</strong> {{publisher}}</p>
            <p><strong>Количество страниц:</strong> {{pages}}</p>
          </li>
        {{/each}}
      </ol>
    {{else}}
      <p>Книги не найдены.</p>
    {{/if}}
  </div>
`;

const bookTemplate = Handlebars.compile(bookTemplateSource);

function renderBooks(books) {
  const outputContainer = document.getElementById('output-container');
  outputContainer.innerHTML = bookTemplate({ books });
}

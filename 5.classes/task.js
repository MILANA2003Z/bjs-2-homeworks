// Базовый класс печатного издания
class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      this.name = name;
      this.releaseDate = releaseDate;
      this.pagesCount = pagesCount;
      this.state = 100; // Начальное состояние
      this.type = null; // Пока тип не определен
    }
  
    // Метод для восстановления состояния
    fix() {
      this.state *= 1.5;
      if (this.state > 100) {
        this.state = 100;
      }
    }
  
    // Сеттер для установки состояния с проверкой границ
    set state(newState) {
      if (newState < 0) {
        this._state = 0;
      } else if (newState > 100) {
        this._state = 100;
      } else {
        this._state = newState;
      }
    }
  
    // Геттер для получения значения состояния
    get state() {
      return this._state;
    }
  }
  
  // Класс для журналов, наследующийся от PrintEditionItem
  class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.type = "magazine";
    }
  }
  
  // Класс для книг, наследующийся от PrintEditionItem
  class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
      super(name, releaseDate, pagesCount);
      this.author = author;
      this.type = "book";
    }
  }
  
  // Подтипы для класса Book
  class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "novel";
    }
  }
  
  class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "fantastic";
    }
  }
  
  class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
      super(author, name, releaseDate, pagesCount);
      this.type = "detective";
    }
  }
  
  // Пример использования
  const sherlock = new PrintEditionItem(
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  );
  
  console.log(sherlock.releaseDate); // 2019
  console.log(sherlock.state); // 100
  sherlock.fix();
  console.log(sherlock.state); // 100
  
  const picknick = new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  );
  
  console.log(picknick.author); // "Аркадий и Борис Стругацкие"
  picknick.state = 10;
  console.log(picknick.state); // 10
  picknick.fix();
  console.log(picknick.state); // 15
  

  class Library {
    constructor(name) {
      this.name = name;
      this.books = [];
    }
  
    // Метод добавления книги в библиотеку
    addBook(book) {
      if (book.state > 30) {
        this.books.push(book);
      }
    }
  
    // Метод поиска книги по определённому типу и значению
    findBookBy(type, value) {
      return this.books.find(book => book[type] === value) || null;
    }
  
    // Метод выдачи книги по названию
    giveBookByName(bookName) {
      const index = this.books.findIndex(book => book.name === bookName);
      if (index === -1) {
        return null;
      }
      return this.books.splice(index, 1)[0];
    }
  }
  
  // Пример использования и тестовый сценарий
  
  // Создаем библиотеку
  const library = new Library("Библиотека имени Ленина");
  
  // Добавляем печатные издания разных типов
  library.addBook(
    new DetectiveBook(
      "Артур Конан Дойл",
      "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
      2019,
      1008
    )
  );
  library.addBook(
    new FantasticBook(
      "Аркадий и Борис Стругацкие",
      "Пикник на обочине",
      1972,
      168
    )
  );
  library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
  library.addBook(new Magazine("Мурзилка", 1924, 60));
  
  // Поиск книги, изданной в 1919 году
  console.log(library.findBookBy("releaseDate", 1919)); // null
  
  // Поиск книги, изданной в 1924 году
  console.log(library.findBookBy("releaseDate", 1924).name); // "Мурзилка"
  
  // Количество книг до выдачи
  console.log("Количество книг до выдачи: " + library.books.length); // 4
  
  // Выдача книги по названию
  const bookToGive = library.giveBookByName("Машина времени");
  console.log("Количество книг после выдачи: " + library.books.length); // 3
  
  // Повреждение выданной книги
  if (bookToGive) {
    bookToGive.state = 10;
    console.log("Состояние выданной книги после повреждения: " + bookToGive.state); // 10
  }
  
  // Восстановление выданной книги
  if (bookToGive) {
    bookToGive.fix();
    console.log("Состояние выданной книги после восстановления: " + bookToGive.state); // 15
  }
  
  // Попытка добавить восстановленную книгу обратно в библиотеку
  library.addBook(bookToGive);
  console.log("Количество книг после попытки вернуть поврежденную книгу: " + library.books.length); // 3, так как состояние < 30
  
  // Повторное восстановление книги для добавления в библиотеку
  if (bookToGive) {
    bookToGive.fix(); // состояние должно стать 22.5
    bookToGive.fix(); // состояние должно стать 33.75, этого хватит, чтобы вернуться в библиотеку
    library.addBook(bookToGive);
  }
  console.log("Количество книг после успешного возврата: " + library.books.length); // 4
  

  class Student {
    constructor(name) {
      this.name = name;
      this.marks = {}; // Структура для хранения оценок по предметам
    }
  
    // Метод для добавления оценки по предмету
    addMark(mark, subject) {
      // Проверка валидности оценки
      if (mark < 2 || mark > 5) {
        return;
      }
      // Если предмета нет в списке, создаём пустой массив для него
      if (!this.marks[subject]) {
        this.marks[subject] = [];
      }
      // Добавляем оценку по предмету
      this.marks[subject].push(mark);
    }
  
    // Метод для получения средней оценки по предмету
    getAverageBySubject(subject) {
      const subjectMarks = this.marks[subject];
      // Если предмета нет в списке, возвращаем 0
      if (!subjectMarks || subjectMarks.length === 0) {
        return 0;
      }
      // Считаем сумму оценок и делим на количество оценок
      const sum = subjectMarks.reduce((acc, mark) => acc + mark, 0);
      return sum / subjectMarks.length;
    }
  
    // Метод для получения общей средней оценки по всем предметам
    getAverage() {
      const subjects = Object.keys(this.marks);
      // Если нет оценок ни по одному предмету, возвращаем 0
      if (subjects.length === 0) {
        return 0;
      }
      // Суммируем средние оценки по каждому предмету
      const totalAverage = subjects.reduce((acc, subject) => acc + this.getAverageBySubject(subject), 0);
      return totalAverage / subjects.length;
    }
  }
  
  // Пример использования
  
  const student = new Student("Олег Никифоров");
  student.addMark(5, "химия");
  student.addMark(5, "химия");
  student.addMark(5, "физика");
  student.addMark(4, "физика");
  student.addMark(6, "физика"); // Оценка не добавится, так как больше 5
  
  console.log(student.getAverageBySubject("физика")); // 4.5
  console.log(student.getAverageBySubject("биология")); // 0, так как оценок по предмету нет
  console.log(student.getAverage()); // Средний балл по всем предметам 4.75
  

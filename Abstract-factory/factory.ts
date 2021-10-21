// Suppose we are working with a server and we need to make factories for creating models:

interface AbstractFactory {
  createBookModel: () => AbstractBookModel;
  createAuthorModel: () => AbstractAuthorModel;
}

class MicroserviceFactory1 implements AbstractFactory {
  createBookModel(): AbstractBookModel {
    return new BookModel();
  }

  createAuthorModel(): AbstractAuthorModel {
    return new AuthorModel();
  }
}

class MicroserviceFactory2 implements AbstractFactory {
  createBookModel(): AbstractBookModel {
    return new BookModel();
  }

  createAuthorModel(): AbstractAuthorModel {
    return new AuthorModel();
  }
}

interface AbstractBookModel {
  logTitle: () => string;
}

interface AbstractAuthorModel {
  logName: () => string;
  addAuthor: () => void;
}

class BookModel implements AbstractBookModel{
  logTitle() {
    return 'Selfish gene';
  }
}

class AuthorModel implements AbstractAuthorModel {
  logName() {
    return 'Author logger';
  }

  addAuthor() {
    return {name: 'Richard Dawkins'}
  }
}

const clientCode = (factory: AbstractFactory) => {
  const book = factory.createBookModel();
}

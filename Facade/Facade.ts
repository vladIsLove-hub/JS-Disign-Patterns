interface IORM {
  query: (query: string) => string;
  where: (condition: string) => string;
  find: (id: string) => string;
  findAll: (ids: string[]) => string;
  take: (item: number) => string;
  skip: (num: number) => string;
}


// Suppose it's an orm-library
class ORM implements IORM {
  public query(query: string): string {
    return query;
  }

  public where(condition: string): string {
    return condition;
  }

  public find(id: string): string {
    return `We found item by id:${id}`;
  }

  public findAll(ids: string[]): string {
    return `We found item by id:${ids.join(', ')}`;
  }

  public take(item: number): string {
    return `${item} - all`;
  }

  public skip(num: number): string {
    return `${num} items skipped`;
  }
}

class ORMFacade {
  protected orm: IORM;

  constructor(orm: IORM) {
    this.orm = orm;
  }

  public find(id: string): string {
    const data = this.orm.find(id);
    console.log('Some hard calculate...');
    return JSON.stringify(data);
  }
}

const main = (facade: ORMFacade) => {
  console.log(facade.find('11'));
}

const orm = new ORM();
const ormFacade = new ORMFacade(orm);

main(ormFacade)


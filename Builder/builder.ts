interface Builder {
  addConfig: () => void;
  addRouting: (path: string) => void;
  addLogger: (log: string) => void;
}

class AppBuilder implements Builder {
  private app: App;

  constructor() {
    this.reset();
  }

  public reset() {
    this.app = new App();
  }

  addConfig() {
    this.app.pushToParts({
      name: 'Main config',
    })
  }

  addLogger(log: string) {
    this.app.pushToParts({
      name: 'Logger',
      log,
    })
  }

  addRouting(path: string) {
    this.app.pushToParts({
      name: 'Router',
      path,
    })
  }

  public getApp(): App {
    const result = this.app;
    this.reset();
    return result;
  }
}

class Director {
  private builder: Builder;

  public setBuilder(builder: Builder) {
    this.builder = builder;
  }

  public addConfigAndLogger(log: string) {
    this.builder.addConfig();
    this.builder.addLogger(log);
  }
}

class App {
  public parts = [];

  public pushToParts(data: any) {
    this.parts.push(data);
  }
}

const main = (director: Director) => {
  const builder = new AppBuilder();
  builder.addConfig();
  builder.addLogger('Log');
  director.setBuilder(builder);
  director.addConfigAndLogger('Log');
  builder.addRouting('../app.js')
  console.log(builder.getApp());
}

console.log(main(new Director()));
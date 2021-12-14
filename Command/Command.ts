interface Command {
  execute(): void;
}

class PlainCommand implements Command {
  private payload: string;

  constructor (payload: string) {
    this.payload = payload;
  }

  execute() {
    console.log(`Payload: ${this.payload}`);
  }
}

class ComplexCommand implements Command {
  private reciever: Reciever;
  private a: string;
  private b: string;

  constructor (reciever: Reciever, a: string, b: string) {
    this.reciever = reciever;
    this.a = a;
    this.b = b;
  }

  execute() {
    console.log('Handling complex command...');
    this.reciever.doSmth(this.a);
    this.reciever.doSmthImp(this.b);
  }
}

class Reciever {
  public doSmth(a: string) {
    console.log(`Reciever: Working! data: ${a}`);
  }

  public doSmthImp(b: string) {
    console.log(`Reciever: Working! data: ${b}`);
  }
}

class Invoker {
  private onStart: Command;
  private onFinish: Command;

  public set handleStart(command: Command) {
    this.onStart = command;
  }

  public set handleFinish(command: Command) {
    this.onFinish = command;
  }

  public doSomethingImportant() {
    console.log('Invoker: Does anybody want something done before I begin?');
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }

    console.log('Invoker: Does anybody want something done after I finish?');
    if (this.isCommand(this.onFinish)) {
        this.onFinish.execute();
    }
  }

  private isCommand(object): object is Command {
    return object.execute !== undefined;
  }
}

const invoker = new Invoker();
const reciever = new Reciever();
invoker.handleStart = new PlainCommand(`It's plain command`);
invoker.handleFinish = new ComplexCommand(reciever, 'First of the important thing', 'Second of the important thing');

invoker.doSomethingImportant();
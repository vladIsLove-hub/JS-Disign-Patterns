interface IController {
  sendResponse: (res: string) => string;
}

class Controller implements IController {
  public sendResponse(res: string): string {
    return res;
  }
}

class Decorator implements IController {
  protected contoller: Controller;

  constructor (controller: IController) {
    this.contoller = controller;
  }

  public sendResponse(res: string): string {
    return res;
  }
}

class HTTPStatusDecorator extends Decorator {
  constructor(controller: Controller, public status: number) {
    super(controller);
    this.status = status;
  }

  public sendResponse(res: string): string {
    return `Status: ${this.status} \nResponse: ${super.sendResponse(res)}`;
  }
}

const clientCode = (response: string) => {
  const controller = new Controller();
  const decorator = new HTTPStatusDecorator(controller, 200);
  console.log(decorator.sendResponse(response));
}

const jsonResp = JSON.stringify({
  name: 'Jack',
  age: 22,
  role: 'User',
}, null, 2);

clientCode(jsonResp);
interface Handler {
  setNext: (handler: Handler) => Handler;
  handle: (request: string) => string;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return null;
  }
}

class AuthHandler extends AbstractHandler {
  public handle(request): string {
    if (request === 'Auth') {
      console.log('Doing some logic for check by auth...');
      return  'User logged in';
    }

    return super.handle(request);
  }
}

class RoleHandler extends AbstractHandler {
  public handle(request): string {
    if (request === 'Guest') {
      console.log('Doing some logic for check by role...');
      return  'This user has a role - guest';
    }

    return super.handle(request);
  }
}

class SubscribeHandler extends AbstractHandler {
  public handle(request): string {
    if (request === 'Sub') {
      console.log('Doing some logic for check by subscribe...');
      return  'This user has a subscribe';
    }

    return super.handle(request);
  }
}

const clientCode = (handler: Handler) => {
  const requests = ['Auth', 'Guest', 'Sub'];

  for (const request of requests) {
    const result = handler.handle(request);
    if (result) {
      console.log(result);
    } else {
      console.log('Empty');
    }
  }
}

const auth = new AuthHandler();
const role = new RoleHandler();
const sub = new SubscribeHandler();

auth.setNext(role).setNext(sub);

console.log('Chain: Auth > Role > Subscribe');
clientCode(auth);
console.log('');

console.log('Chain: Role > Subscribe');
clientCode(role);




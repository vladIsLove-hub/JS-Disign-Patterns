interface IServer {
  getAccessToMusic: () => string;
  removeAccessToMusic: () => string;
}

class Server implements IServer {
  public getAccessToMusic(): string {
    return 'Access is allowed';
  }

  public removeAccessToMusic(): string {
    return 'Access was removed';
  }
}

class ServerProxy implements Server{
  private server: IServer;

  constructor(server: IServer) {
    this.server = server;
  }

  public getAccessToMusic(): string {
    if (this.isAuth() && this.isSubscribe()) {
      return this.server.getAccessToMusic();
    } else {
      return 'Something went wrong';
    }
  }

  public removeAccessToMusic(): string {
    if (this.isAuth()) {
      return this.server.removeAccessToMusic();
    } else {
      return 'Something went wrong';
    }
  }

  private isAuth(): boolean {
    console.log('Cheching auth...')
    return true;
  }

  private isSubscribe(): boolean {
    console.log('Checking subscribe...');
    return true;
  } 
}

const clientCode = (server: IServer) => {
  console.log(server.getAccessToMusic())
}

const server = new Server();
const serverProxy = new ServerProxy(server);

clientCode(serverProxy)
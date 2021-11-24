class GUI {
  protected api: IAPIRequester;

  constructor(api: IAPIRequester) {
    this.api = api;
  }

  public getPosts(): string {
    const result = this.api.postOperation();
    return result;
  }
}

interface IAPIRequester {
  postOperation: () => string;
}

class APIRequester implements IAPIRequester {
  public postOperation(): string {
    console.log('Doing request...');
    console.log('Get response');
    console.log('Handle response');
    return JSON.stringify({
      name: 'Jake',
      age: 22,
    })
  }
}

const main = () => {
  const apiRequester = new APIRequester();
  const gui = new GUI(apiRequester);
  console.log(gui.getPosts());
}

main();
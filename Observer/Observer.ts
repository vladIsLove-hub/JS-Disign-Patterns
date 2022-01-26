interface ISubscriber {
  update(observer: IObserver): void;
}

interface IObserver {
  attach(subscriber: ISubscriber): void;
  detach(subscriber: ISubscriber): void;
  notify(): void;
}

class Observer implements IObserver {
  public initialState = { x: 10, y: 40 };
  private subscribers: ISubscriber[] = [];

  public attach(subscriber: ISubscriber): void {
    const isExist = this.subscribers.includes(subscriber);
    if (isExist) console.log("Subscriber already attached");

    this.subscribers.push(subscriber);
  }

  public detach(subscriber: ISubscriber): void {
    const idx = this.subscribers.indexOf(subscriber);
    if (idx === -1) console.log("Subcriber does not exist");

    this.subscribers.splice(idx, 1);
  }

  public notify(): void {
    this.subscribers.forEach((sub) => sub.update(this));
  }

  public someLogic(x: number, y: number) {
    this.initialState.x = this.initialState.x + x;
    this.initialState.y = this.initialState.y + y;

    console.log(this.initialState);

    this.notify();
  }
}

class SubscriberA implements ISubscriber {
  public update(observer: IObserver): void {
    if (observer instanceof Observer && observer.initialState.x > 15) {
      console.log("Subscriber A updated");
    }
  }
}

class SubscriberB implements ISubscriber {
  public update(observer: IObserver): void {
    if (observer instanceof Observer && observer.initialState.y < 50) {
      console.log("Subscriber B updated");
    }
  }
}

const observer = new Observer();

const subscriberA = new SubscriberA();
const subscriberB = new SubscriberB();

observer.attach(subscriberA);
observer.attach(subscriberB);

observer.someLogic(10, -5);

observer.detach(subscriberB);

observer.someLogic(10, 11);

observer.detach(subscriberB);

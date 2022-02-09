interface IStrategy {
  someSort(ints: number[]): number[];
}

class Context {
  private strategy: IStrategy;

  constructor(strategy: IStrategy){
    this.strategy = strategy;
  }

  public setStrategy(strategy: IStrategy) {
    this.strategy = strategy;
  }

  public makeSort(ints: number[]) {
    const sortedArr = this.strategy.someSort(ints);
    console.log(`Array was sorted, result:`, sortedArr);
  }
}

class ASCSortStrategy implements IStrategy {
  public someSort(ints: number[]): number[] {
    return [...ints].sort((a, b) => a - b);
  }
}

class DESCSortStrategy implements IStrategy {
  public someSort(ints: number[]): number[] {
    return [...ints].sort((a, b) => b - a);
  }
}

const asc = new ASCSortStrategy();
const desc = new DESCSortStrategy();
const ctxt = new Context(asc);

ctxt.makeSort([1,3,4,11]);

ctxt.setStrategy(desc);

ctxt.makeSort([1,3,4,11]);

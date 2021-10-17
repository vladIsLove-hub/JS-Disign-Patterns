// Example SINGLETON pattern on the example Stack data structure

class Stack {
    static getInsctance() {
        if (!Stack.instance) {
            Stack.instance = new Stack();
        }
        return Stack.instance;
    }

    constructor() {
        this.instance = Stack;
        this.last = null;
    }

    push(item) {
        const prev = this.last;
        const elem = {item, prev};
        this.last = elem;
    }

    pop() {
        const { prev } = this.last;
        if (!prev) return null;
        this.last = prev;
    }
}

const main = () => {
    const foo = Stack.getInsctance();
    foo.push('Chill');
    foo.push('Hero');
    const bar = Stack.getInsctance();
    console.log(bar);
}

console.log(main());
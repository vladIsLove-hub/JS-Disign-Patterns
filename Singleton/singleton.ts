// Example SINGLETON pattern on the example Stack data structure (TS)


class Stack {
	private static instance: Stack;
	private last = null;
	private construcor() {};

	public static getInstance() {
		if (!Stack.instance) {
			Stack.instance = new Stack();
		}

		return Stack.instance;
	}

	public data() {
		return this.last;
	}

	public push(item) {
		const prev = this.last;
		const elem = {prev, item};
		this.last = elem;
	}

	public pop() {
		const elem = this.last;
		if (!elem) return null;
		this.last = elem.prev;
		return elem.item;
	}
}

const main = () => {
	const foo = Stack.getInstance();
	foo.push({data: 1})
	foo.push({data: 1})
	const bar = Stack.getInstance();
	console.log(bar.data());
}

console.log(main())
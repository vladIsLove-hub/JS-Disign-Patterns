var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Context = /** @class */ (function () {
    function Context(strategy) {
        this.strategy = strategy;
    }
    Context.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    Context.prototype.makeSort = function (ints) {
        var sortedArr = this.strategy.someSort(ints);
        console.log("Array was sorted, result:", sortedArr);
    };
    return Context;
}());
var ASCSortStrategy = /** @class */ (function () {
    function ASCSortStrategy() {
    }
    ASCSortStrategy.prototype.someSort = function (ints) {
        return __spreadArray([], ints, true).sort(function (a, b) { return a - b; });
    };
    return ASCSortStrategy;
}());
var DESCSortStrategy = /** @class */ (function () {
    function DESCSortStrategy() {
    }
    DESCSortStrategy.prototype.someSort = function (ints) {
        return __spreadArray([], ints, true).sort(function (a, b) { return b - a; });
    };
    return DESCSortStrategy;
}());
var asc = new ASCSortStrategy();
var desc = new DESCSortStrategy();
var ctxt = new Context(asc);
ctxt.makeSort([1, 3, 4, 11]);
ctxt.setStrategy(desc);
ctxt.makeSort([1, 3, 4, 11]);

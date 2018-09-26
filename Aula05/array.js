Array.prototype.first = function(predicate) {
    for(var i = 0; i < this.length; ++i) {
        if(predicate(this[i]))
            return this[i];
    }
}

var a = [1,2,3,4,5]

console.log(a.first(e => e%2 == 0));


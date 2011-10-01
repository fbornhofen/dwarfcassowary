
var ClSymbolicWeight = new Class({
  initialize: function(w1, w2, w3) {
    this._values = new Array(w1, w2, w3);
  },
  times: function(n) {
    return new ClSymbolicWeight(this._values[0]*n,
                                this._values[1]*n,
                                this._values[2]*n);
  },
  divideBy: function(n) {
    return new ClSymbolicWeight(this._values[0]/n,
                                this._values[1]/n,
                                this._values[2]/n);
  },
  add: function(c) {
    return new ClSymbolicWeight(this._values[0]+c._values[0],
                                this._values[1]+c._values[1],
                                this._values[2]+c._values[2]);
  },

  subtract: function(c) {
    return new ClSymbolicWeight(this._values[0]-c._values[0],
                                this._values[1]-c._values[1],
                                this._values[2]-c._values[2]);
  },

  lessThan: function(c) {
    for (i = 0; i < this._values.length; ++i) {
      if (this._values[i] < c._values[i]) {
        return true;
      } else if (this._values[i] > c._values[i]) {
        return false;
      }
    }
    return false; // equal
  },
    
  lessThanOrEqual: function(c) {
    for (i = 0; i < this._values.length; ++i) {
      if (this._values[i] < c._values[i]) {
        return true;
      } else if (this._values[i] > c._values[i]) {
        return false;
      }
    }
    return true; // equal
  },

  equal: function(c) {
    for (i = 0; i < this._values.length; ++i) {
      if (this._values[i] != c._values[i]) {
        return false;
      }
    }
    return true;
  },

  greaterThan: function(c) {
    return !this.lessThanOrEqual(c);
  },

  greaterThanOrEqual: function(c) {
    return !this.lessThan(c);
  },

  isNegative: function() {
    return this.lessThan(ClSymbolicWeight.clsZero);
  },

  toDouble: function() {
    sum  =  0;
    factor = 1;
    multiplier = 1000;
    for (i = this._values.length - 1; i >= 0; --i) {
      sum += this._values[i] * factor;
      factor *= multiplier;
    }
    return sum;
  },

  toString: function() {
    return '[' + this._values[0] + ','
      + this._values[1] + ','
      + this._values[2] + ']';
  },

  cLevels: function() { return 3; }

});

ClSymbolicWeight.clsZero = new ClSymbolicWeight(0, 0, 0);

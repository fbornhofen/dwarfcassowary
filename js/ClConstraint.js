// FILE: EDU.Washington.grad.gjb.cassowary
// package EDU.Washington.grad.gjb.cassowary;
// Has ClConstraint <- ClEditOrStayConstraint
// and     ClEditConstraint, ClStayConstraint
// Linear constraints are in ClLinearConstraint.js


Object.subclass('ClConstraint', 'default category', {
  /* FIELDS:
    var _strength
    var _weight
    var _attachedObject
    var _times_added
 */
  initialize: function(strength /*ClStrength*/, weight /*double*/) {
    this.hash_code = ClConstraint.iConstraintNumber++;
    this._strength = strength || ClStrength.required;
    this._weight = weight || 1.0;
    this._times_added = 0;
  },
  // abstract expression() 

  hashCode: function() {
    return this.hash_code;
  },

  isEditConstraint: function() {
    return false;
  },

  isInequality: function() {
    return false;
  },

  isRequired: function() {
    return this._strength.isRequired();
  },

  isStayConstraint: function() {
    return false;
  },

  strength: function() {
    return this._strength;
  },

  weight: function() {
    return this._weight;
  },

  toString: function() {
    // this is abstract -- it intentionally leaves the parens unbalanced for
    // the subclasses to complete (e.g., with ' = 0', etc.
    return this._strength + ' {' + this._weight + '} (' + this.expression() +')';
  },

  setAttachedObject: function(o /*Object*/) {
    this._attachedObject = o;
  },

  getAttachedObject: function() {
    return this._attachedObject;
  },

  changeStrength: function(strength /*ClStrength*/) {
    if (this._times_added == 0) {
      this.setStrength(strength);
    } else {
      throw new ExCLTooDifficult();
    }
  },

  addedTo: function(solver /*ClSimplexSolver*/) {
    ++this._times_added;
  },

  removedFrom: function(solver /*ClSimplexSolver*/) {
    --this._times_added;
  },

  setStrength: function(strength /*ClStrength*/) {
    this._strength = strength;
  },

  setWeight: function(weight /*double*/) {
    this._weight = weight;
  },
});


ClConstraint.subclass('ClEditOrStayConstraint', 'default category', {
  //Extends: ClConstraint,
  /* FIELDS:
     var _variable
     var _expression
 */
  initialize: function($super, clv /*ClVariable*/, strength /*ClStrength*/, weight /*double*/) {
    $super(strength, weight);
    this._variable = clv;
    this._expression = new ClLinearExpression(this._variable, -1.0, 
                                              this._variable.value());
  },

  variable: function() {
    return this._variable;
  },

  expression: function() {
    return this._expression;
  },

  setVariable: function(v /*ClVariable*/) {
    this._variable = v;
  },
});


ClEditOrStayConstraint.subclass('ClEditConstraint', 'default category', {
  //Extends: ClEditOrStayConstraint,

  initialize: function($super, clv /*ClVariable*/, strength /*ClStrength*/, weight /*double*/) {
    $super(clv, strength, weight);
  },

  isEditConstraint: function() {
    return true;
  },
  
  toString: function() {
    return "edit" + $super();
  },
});

ClEditOrStayConstraint.subclass('ClStayConstraint', 'default category', {
  //Extends: ClEditOrStayConstraint,
  
  initialize: function($super, clv /*ClVariable*/, strength /*ClStrength*/, weight /*double*/) {
    $super(clv, strength || ClStrength.weak, weight);
  },

  isStayConstraint: function() {
    return true;
  },

  toString: function() {
    return "stay " + $super();
  },
});

ClConstraint.iConstraintNumber = 1;

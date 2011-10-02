
// ABSTRACT
ClConstraint.subclass('ClLinearConstraint', 'default category', {
  //Extends: ClConstraint,
  /* FIELDS:
     var _expression
   */
  initialize: function($super, cle /*ClLinearExpression*/, strength /*ClStrength*/, weight /*double*/) {
    $super(strength, weight);
    this._expression = cle;
  },

  expression: function() {
    return this._expression;
  },

  setExpression: function(expr /*ClLinearExpression*/) {
    this._expression = expr;
  },
});


ClLinearConstraint.subclass('ClLinearInequality', 'default category', {
  // Extends: ClLinearConstraint,

  initialize: function($super, a1, a2, a3, a4, a5) {
    if (a1 instanceof ClLinearExpression &&
        a3 instanceof ClAbstractVariable) {
      var cle = a1, op = a2, clv = a3, strength = a4, weight = a5;
      $super(cle.clone(), strength, weight);
      if (op == CL.LEQ) {
        this._expression.multiplyMe(-1);
        this._expression.addVariable(clv);
      } else if (op == CL.GEQ) {
        this._expression.addVariable(clv, -1);
      } else {
        throw new ExCLInternalError("Invalid operator in ClLinearInequality constructor");
      }
    } else if (a1 instanceof ClLinearExpression) {
      return $super(a1, a2, a3);
    } else if (a2 == CL.GEQ) {
      $super(new ClLinearExpression(a3), a4, a5);
      this._expression.multiplyMe(-1.0);
      this._expression.addVariable(a1);
    } else if (a2 == CL.LEQ) {
      $super(new ClLinearExpression(a3), a4, a5);
      this._expression.addVariable(a1,-1.0);
    } else {
      throw new ExCLInternalError("Invalid operator in ClLinearInequality constructor");
    }
  },

  isInequality: function() {
    return true;
  },

  toString: function($super) {
    return $super() + " >= 0 )";
  },
});


ClLinearConstraint.subclass('ClLinearEquation', 'default category', {
  //Extends: ClLinearConstraint,

  initialize: function($super, a1, a2, a3, a4) {
    if (a1 instanceof ClLinearExpression && !a2 || a2 instanceof ClStrength) {
      $super(a1, a2, a3);
    } else if ((a1 instanceof ClAbstractVariable) &&
               (a2 instanceof ClLinearExpression)) {
      var clv = a1, cle = a2, strength = a3, weight = a4;
      $super(cle, strength, weight);
      this._expression.addVariable(clv, -1);
    } else if ((a1 instanceof ClAbstractVariable) &&
               (typeof(a2) == 'number')) {
      var clv = a1, val = a2, strength = a3, weight = a4;
      $super(new ClLinearExpression(val), strength, weight);
      this._expression.addVariable(clv, -1);
    } else if ((a1 instanceof ClLinearExpression) &&
               (a2 instanceof ClAbstractVariable)) {
      var cle = a1, clv = a2, strength = a3, weight = a4;
      $super(cle.clone(), strength, weight);
      this._expression.addVariable(clv, -1);
    } else if (((a1 instanceof ClLinearExpression) || (a1 instanceof ClAbstractVariable) ||
                (typeof(a1) == 'number')) &&
               ((a2 instanceof ClLinearExpression) || (a2 instanceof ClAbstractVariable) ||
                (typeof(a2) == 'number'))) {
      if (a1 instanceof ClLinearExpression) {
        a1 = a1.clone();
      } else {
        a1 = new ClLinearExpression(a1);
      }
      if (a2 instanceof ClLinearExpression) {
        a2 = a2.clone();
      } else {
        a2 = new ClLinearExpression(a2);
      }
      $super(a1, a3, a4);
      this._expression.addExpression(a2, -1);
    } else {
      throw "Bad initializer to ClLinearEquation";
    }
    CL.Assert(this._strength instanceof ClStrength, "_strength not set");
  },

  toString: function() {
    return $super() + " = 0 )";
  },
});

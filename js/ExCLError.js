// FILE: EDU.Washington.grad.gjb.cassowary
// package EDU.Washington.grad.gjb.cassowary;

Object.subclass('ExCLError', 'default category', {
  description: function() {
    return "(ExCLError) An error has occured in CL";
  },
  toString : function() {
    return this.description();
  }
});

ExCLError.subclass('ExCLConstraintNotFound', 'default category', {
  //Extends: ExCLError,
  description: function() {
    return "(ExCLConstraintNotFound) Tried to remove a constraint never added to the tableu";
  },
});


ExCLError.subclass('ExCLInternalError', 'default category', {
  //Extends: ExCLError,
  /* FIELDS:
     private String description_
 */
  initialize: function(s /*String*/) {
    description_ = s;
  },
  description: function() {
    return "(ExCLInternalError) " + description_;
  },
});

ExCLError.subclass('ExCLNonlinearExpression', 'default category', {
  //Extends: ExCLError,
  description: function() {
    return "(ExCLNonlinearExpression) The resulting expression would be nonlinear";
  },
});

ExCLError.subclass('ExCLNotEnoughStays', 'default category', {
  //Extends: ExCLError,
  description: function() {
    return "(ExCLNotEnoughStays) There are not enough stays to give specific values to every variable";
  },
});

ExCLError.subclass('ExCLRequiredFailure', 'default category', {
  //Extends: ExCLError,
  description: function() {
    return "(ExCLRequiredFailure) A required constraint cannot be satisfied";
  },
});

ExCLError.subclass('ExCLTooDifficult', 'default category', {
  //Extends: ExCLError,
  description: function() {
    return "(ExCLTooDifficult) The constraints are too difficult to solve";
  },
});



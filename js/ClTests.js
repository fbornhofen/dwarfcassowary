
Object.subclass('ClTests', 'default category', {
  initialize: function() {
  },

  InitializeRandoms: function() {
  },

  simple1: function() {
    var fOkResult = true;
    var x = new ClVariable(167);
    var y = new ClVariable(2);
    var solver = new ClSimplexSolver();
    var eq = new ClLinearEquation(x, new ClLinearExpression(y));
    solver.addConstraint(eq);
    fOkResult = (x.value() == y.value());
    print("x == " + x.value());
    print("y == " + y.value());
    return (fOkResult);
  },

  justStay1: function() {
    var fOkResult = true;
    var x = new ClVariable(5);
    var y = new ClVariable(10);
    var solver = new ClSimplexSolver();
    solver.addStay(x);
    solver.addStay(y);
    fOkResult = fOkResult && CL.approx(x, 5);
    fOkResult = fOkResult && CL.approx(y, 10);
    print("x == " + x.value());
    print("y == " + y.value());
    return (fOkResult);
  },

  addDelete1: function() {
    var fOkResult = true;
    var x = new ClVariable("x");
    var solver = new ClSimplexSolver();
    solver.addConstraint(new ClLinearEquation(x, 100, ClStrength.weak));
    var c10 = new ClLinearInequality(x, CL.LEQ, 10.0);
    var c20 = new ClLinearInequality(x, CL.LEQ, 20.0);
    solver.addConstraint(c10).addConstraint(c20);
    fOkResult = fOkResult && CL.approx(x, 10.0);
    print("x == " + x.value());
    solver.removeConstraint(c10);
    fOkResult = fOkResult && CL.approx(x, 20.0);
    print("x == " + x.value());
    solver.removeConstraint(c20);
    fOkResult = fOkResult && CL.approx(x, 100.0);
    print("x == " + x.value());
    var c10again = new ClLinearInequality(x, CL.LEQ, 10.0);
    solver.addConstraint(c10).addConstraint(c10again);
    fOkResult = fOkResult && CL.approx(x, 10.0);
    print("x == " + x.value());
    solver.removeConstraint(c10);
    fOkResult = fOkResult && CL.approx(x, 10.0);
    print("x == " + x.value());
    solver.removeConstraint(c10again);
    fOkResult = fOkResult && CL.approx(x, 100.0);
    print("x == " + x.value());
    return (fOkResult);
  },
  addDelete2: function() {
    var fOkResult = true;
    var x = new ClVariable("x");
    var y = new ClVariable("y");
    var solver = new ClSimplexSolver();
    solver.addConstraint(new ClLinearEquation(x, 100.0, ClStrength.weak)).addConstraint(new ClLinearEquation(y, 120.0, ClStrength.strong));
    var c10 = new ClLinearInequality(x, CL.LEQ, 10.0);
    var c20 = new ClLinearInequality(x, CL.LEQ, 20.0);
    solver.addConstraint(c10).addConstraint(c20);
    fOkResult = fOkResult && CL.approx(x, 10.0) && CL.approx(y, 120.0);
    print("x == " + x.value() + ", y == " + y.value());
    solver.removeConstraint(c10);
    fOkResult = fOkResult && CL.approx(x, 20.0) && CL.approx(y, 120.0);
    print("x == " + x.value() + ", y == " + y.value());
    var cxy = new ClLinearEquation(CL.Times(2.0, x), y);
    solver.addConstraint(cxy);
    fOkResult = fOkResult && CL.approx(x, 20.0) && CL.approx(y, 40.0);
    print("x == " + x.value() + ", y == " + y.value());
    solver.removeConstraint(c20);
    fOkResult = fOkResult && CL.approx(x, 60.0) && CL.approx(y, 120.0);
    print("x == " + x.value() + ", y == " + y.value());
    solver.removeConstraint(cxy);
    fOkResult = fOkResult && CL.approx(x, 100.0) && CL.approx(y, 120.0);
    print("x == " + x.value() + ", y == " + y.value());
    return (fOkResult);
  },

  casso1: function() {
    var fOkResult = true;
    var x = new ClVariable("x");
    var y = new ClVariable("y");
    var solver = new ClSimplexSolver();
    solver.addConstraint(new ClLinearInequality(x, CL.LEQ, y)).addConstraint(new ClLinearEquation(y, CL.Plus(x, 3.0))).addConstraint(new ClLinearEquation(x, 10.0, ClStrength.weak)).addConstraint(new ClLinearEquation(y, 10.0, ClStrength.weak));
    fOkResult = fOkResult && (CL.approx(x, 10.0) && CL.approx(y, 13.0) || CL.approx(x, 7.0) && CL.approx(y, 10.0));
    print("x == " + x.value() + ", y == " + y.value());
    return (fOkResult);
  },
  inconsistent1: function() {
    try {
      var x = new ClVariable("x");
      var solver = new ClSimplexSolver();
      solver.addConstraint(new ClLinearEquation(x, 10.0))
            .addConstraint(new ClLinearEquation(x, 5.0));
      return false;
    }
    catch (err /*ExCLRequiredFailure*/){
      print("Success -- got the exception");
      return (true);
    }
  },
  inconsistent2: function() {
    try {
      var x = new ClVariable("x");
      var solver = new ClSimplexSolver();
      solver.addConstraint(new ClLinearInequality(x, CL.GEQ, 10.0)).addConstraint(new ClLinearInequality(x, CL.LEQ, 5.0));
      return false;
    }
    catch (err /*ExCLRequiredFailure*/){
      print("Success -- got the exception");
      return (true);
    }
  },
  multiedit: function() {
    try {
      var fOkResult = true;
      var x = new ClVariable("x");
      var y = new ClVariable("y");
      var w = new ClVariable("w");
      var h = new ClVariable("h");
      var solver = new ClSimplexSolver();
      solver.addStay(x).addStay(y).addStay(w).addStay(h);
      solver.addEditVar(x).addEditVar(y).beginEdit();
      solver.suggestValue(x, 10).suggestValue(y, 20).resolve();
      print("x = " + x.value() + "; y = " + y.value());
      print("w = " + w.value() + "; h = " + h.value());
      fOkResult = fOkResult && CL.approx(x, 10) && CL.approx(y, 20) && CL.approx(w, 0) && CL.approx(h, 0);
      solver.addEditVar(w).addEditVar(h).beginEdit();
      solver.suggestValue(w, 30).suggestValue(h, 40).endEdit();
      print("x = " + x.value() + "; y = " + y.value());
      print("w = " + w.value() + "; h = " + h.value());
      fOkResult = fOkResult && CL.approx(x, 10) && CL.approx(y, 20) && CL.approx(w, 30) && CL.approx(h, 40);
      solver.suggestValue(x, 50).suggestValue(y, 60).endEdit();
      print("x = " + x.value() + "; y = " + y.value());
      print("w = " + w.value() + "; h = " + h.value());
      fOkResult = fOkResult && CL.approx(x, 50) && CL.approx(y, 60) && CL.approx(w, 30) && CL.approx(h, 40);
      return (fOkResult);
    }
    catch (err /*ExCLRequiredFailure*/){
      print("Success -- got the exception");
      return (true);
    }
  },
  inconsistent3: function() {
    try {
      var w = new ClVariable("w");
      var x = new ClVariable("x");
      var y = new ClVariable("y");
      var z = new ClVariable("z");
      var solver = new ClSimplexSolver();
      solver.addConstraint(new ClLinearInequality(w, CL.GEQ, 10.0)).addConstraint(new ClLinearInequality(x, CL.GEQ, w)).addConstraint(new ClLinearInequality(y, CL.GEQ, x)).addConstraint(new ClLinearInequality(z, CL.GEQ, y)).addConstraint(new ClLinearInequality(z, CL.GEQ, 8.0)).addConstraint(new ClLinearInequality(z, CL.LEQ, 4.0));
      return false;
    }
    catch (err /*ExCLRequiredFailure*/){
      print("Success -- got the exception");
      return true;
    }
  },
  addDel: function(nCns /*int*/, nVars /*int*/, nResolves /*int*/) {
    var timer = new Timer();
    var ineqProb = 0.12;
    var maxVars = 3;
    this.InitializeRandoms();
    print("starting timing test. nCns = " + nCns + ", nVars = " + nVars + ", nResolves = " + nResolves);
    timer.Start();
    var solver = new ClSimplexSolver();
    solver.setAutosolve(false);
    var rgpclv = new ClVariable[nVars];
    for (var i = 0; i < nVars; i++)
    {
      rgpclv[i] = new ClVariable(i, "x");
      solver.addStay(rgpclv[i]);
    }
    var nCnsMade = nCns * 2;
    var rgpcns = new ClConstraint[nCnsMade];
    var rgpcnsAdded = new ClConstraint[nCns];
    var nvs = 0;
    var k;
    var j;
    var coeff;
    for (j = 0; j < nCnsMade; ++j)
    {
      nvs = this.RandomInRange(1, maxVars);
      if (this.fTraceOn) this.traceprint("Using nvs = " + nvs);
      var expr = new ClLinearExpression(this.UniformRandomDiscretized() * 20.0 - 10.0);
      for (k = 0; k < nvs; k++)
      {
        coeff = this.UniformRandomDiscretized() * 10 - 5;
        var iclv = this.RandomInRange(0, nVars);
        expr.addExpression(CL.Times(rgpclv[iclv], coeff));
      }
      if (this.UniformRandomDiscretized() < ineqProb) {
        rgpcns[j] = new ClLinearInequality(expr);
      }
      else {
        rgpcns[j] = new ClLinearEquation(expr);
      }
      if (this.fTraceOn) this.traceprint("Constraint " + j + " is " + rgpcns[j]);
    }
    timer.Stop();
    print("done building data structures");
    print("time = " + timer.ElapsedTime());
    timer.Reset();
    timer.Start();
    var cExceptions = 0;
    var cCns = 0;
    for (j = 0; j < nCnsMade && cCns < nCns; j++)
    {
      try {
        solver.addConstraint(rgpcns[j]);
        rgpcnsAdded[cCns++] = rgpcns[j];
        if (this.fTraceAdded) this.traceprint("Added cn: " + rgpcns[j]);
      }
      catch (err /*ExCLRequiredFailure*/){
        cExceptions++;
        if (this.fTraceOn) this.traceprint("got exception adding " + rgpcns[j]);
        if (this.fTraceAdded) this.traceprint("got exception adding " + rgpcns[j]);
        rgpcns[j] = null;
      }
    }
    solver.solve();
    timer.Stop();
    print("done adding " + cCns + " constraints [" + j + " attempted, " + cExceptions + " exceptions]");
    print("time = " + timer.ElapsedTime() + "\n");
    print("time per Add cn = " + timer.ElapsedTime() / cCns);
    var e1Index = this.RandomInRange(0, nVars);
    var e2Index = this.RandomInRange(0, nVars);
    print("Editing vars with indices " + e1Index + ", " + e2Index);
    var edit1 = new ClEditConstraint(rgpclv[e1Index], ClStrength.strong);
    var edit2 = new ClEditConstraint(rgpclv[e2Index], ClStrength.strong);
    print("about to start resolves");
    timer.Reset();
    timer.Start();
    solver.addConstraint(edit1).addConstraint(edit2);
    timer.Stop();
    for (var m = 0; m < nResolves; m++)
    {
      solver.resolvePair(rgpclv[e1Index].value() * 1.001, 
                         rgpclv[e2Index].value() * 1.001);
    }
    solver.removeConstraint(edit1);
    solver.removeConstraint(edit2);
    timer.Stop();
    print("done resolves -- now removing constraints");
    print("time = " + timer.ElapsedTime() + "\n");
    print("time per Resolve = " + timer.ElapsedTime() / nResolves);
    timer.Reset();
    timer.Start();
    for (j = 0; j < cCns; j++)
    {
      solver.removeConstraint(rgpcnsAdded[j]);
    }
    timer.Stop();
    print("done removing constraints and addDel timing test");
    print("time = " + timer.ElapsedTime() + "\n");
    print("time per Remove cn = " + timer.ElapsedTime() / cCns);
    return true;
  },

  UniformRandomDiscretized: function() {
    return Math.random();
  },

  GrainedUniformRandom: function() {
    var grain = 1.0e-4;
    var n = this.UniformRandomDiscretized();
    var answer = (/* int */(n / grain)) * grain;
    return answer;
  },

  RandomInRange: function(low /*int*/, high /*int*/) {
    return Math.floor((this.UniformRandomDiscretized() * (high - low + 1)) + low);
  },

  addDelSolvers: function(nCns /*int*/, nResolves /*int*/, nSolvers /*int*/, testNum /*int*/) {
    var timer = new Timer();
    var tmAddvar, tmEditvar, tmResolvevar, tmEndEdit;
    var ineqProb = 0.12;
    var maxVars = 3;
    var nVars = nCns;
    this.InitializeRandoms();
    print("starting timing test. nCns = " + nCns + ", nSolvers = " + nSolvers + ", nResolves = " + nResolves);
    timer.Start();
    var rgsolvers = new Array(nSolvers+1);
    for (var is = 0; is < nSolvers + 1; ++is)
    {
      rgsolvers[is] = new ClSimplexSolver();
      rgsolvers[is].setAutosolve(false);
    }
    var rgpclv = new Array(nVars+1);
    for (var i = 0; i < nVars + 1; ++i)
    {
      rgpclv[i] = new ClVariable(i, "x");
      for (var is = 0; is < nSolvers + 1; ++is)
      {
        rgsolvers[is].addStay(rgpclv[i]);
      }
    }
    var nCnsMade = nCns * 5;
    var rgpcns = new Array(nCnsMade); // ClConstraints
    var rgpcnsAdded = new Array(nCns); // ClConstraint
    var nvs = 0;
    var k;
    var j;
    var coeff;
    for (j = 0; j < nCnsMade; ++j)
    {
      nvs = this.RandomInRange(1, maxVars);
      if (this.fTraceOn) this.traceprint("Using nvs = " + nvs);
      var expr = new ClLinearExpression(this.GrainedUniformRandom() * 20.0 - 10.0);
      for (k = 0; k < nvs; k++)
      {
        coeff = this.GrainedUniformRandom() * 10 - 5;
        var iclv = this.RandomInRange(0, nVars);
        expr.addExpression(CL.Times(rgpclv[iclv], coeff));
      }
      if (this.UniformRandomDiscretized() < ineqProb) {
        rgpcns[j] = new ClLinearInequality(expr);
      } else {
        rgpcns[j] = new ClLinearEquation(expr);
      }
      if (this.fTraceOn) this.traceprint("Constraint " + j + " is " + rgpcns[j]);
    }
    timer.Stop();
    print("done building data structures");
    for (var is = 0; is < nSolvers; ++is)
    {
      var cCns = 0;
      var cExceptions = 0;
      var solver = rgsolvers[nSolvers];
      cExceptions = 0;
      for (j = 0; j < nCnsMade && cCns < nCns; j++)
      {
        try {
          if (null != rgpcns[j]) {
            solver.addConstraint(rgpcns[j]);
            ++cCns;
          }
        }
        catch (err /*ExCLRequiredFailure*/){
          cExceptions++;
          rgpcns[j] = null;
        }
      }
    }
    timer.Reset();
    timer.Start();
    for (var is = 0; is < nSolvers; ++is)
    {
      var cCns = 0;
      var cExceptions = 0;
      var solver = rgsolvers[is];
      cExceptions = 0;
      for (j = 0; j < nCnsMade && cCns < nCns; j++)
      {
        try {
          if (null != rgpcns[j]) {
            solver.addConstraint(rgpcns[j]);
            ++cCns;
          }
        }
        catch (err /*ExCLRequiredFailure*/){
          cExceptions++;
          rgpcns[j] = null;
        }
      }
      print("done adding " + cCns + " constraints [" + j + " attempted, " + cExceptions + " exceptions]");
      solver.solve();
    }
    timer.Stop();
    tmAdd = timer.ElapsedTime();
    var e1Index = this.RandomInRange(0, nVars);
    var e2Index = this.RandomInRange(0, nVars);
    print("Editing vars with indices " + e1Index + ", " + e2Index);
    var edit1 = new ClEditConstraint(rgpclv[e1Index], ClStrength.strong);
    var edit2 = new ClEditConstraint(rgpclv[e2Index], ClStrength.strong);
    print("about to start resolves");
    timer.Reset();
    timer.Start();
    for (var is = 0; is < nSolvers; ++is)
    {
      rgsolvers[is].addConstraint(edit1).addConstraint(edit2);
    }
    timer.Stop();
    tmEdit = timer.ElapsedTime();
    timer.Reset();
    timer.Start();
    for (var is = 0; is < nSolvers; ++is)
    {
      var solver = rgsolvers[is];
      for (var m = 0; m < nResolves; m++)
      {
        solver.resolvePair(rgpclv[e1Index].value() * 1.001, rgpclv[e2Index].value() * 1.001);
      }
    }
    timer.Stop();
    tmResolve = timer.ElapsedTime();
    print("done resolves -- now ending edits");
    timer.Reset();
    timer.Start();
    for (var is = 0; is < nSolvers; ++is)
    {
      rgsolvers[is].removeConstraint(edit1).removeConstraint(edit2);
    }
    timer.Stop();
    tmEndEdit = timer.ElapsedTime();
    var mspersec = 1000;
    print(nCns + "," + nSolvers + "," + nResolves + "," + testNum + "," + tmAdd * mspersec + "," + tmEdit * mspersec + "," + tmResolve * mspersec + "," + tmEndEdit * mspersec + "," + tmAdd / nCns / nSolvers * mspersec + "," + tmEdit / nSolvers / 2 * mspersec + "," + tmResolve / nResolves / nSolvers * mspersec + "," + tmEndEdit / nSolvers / 2 * mspersec);
    return true;
  },

  main: function(args /*String[]*/) {
    var clt = new ClTests();
    var fAllOkResult = true;
    var fResult;
    if (true) {
      print("simple1:");
      fResult = this.simple1();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());

      print("\n\n\njustStay1:");
      fResult = this.justStay1();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());

      print("\n\n\naddDelete1:");
      fResult = this.addDelete1();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());

      print("\n\n\naddDelete2:");
      fResult = this.addDelete2();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());

      print("\n\n\ncasso1:");
      fResult = this.casso1();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());

      print("\n\n\ninconsistent1:");
      fResult = this.inconsistent1();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());

      print("\n\n\ninconsistent2:");
      fResult = this.inconsistent2();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());

      print("\n\n\ninconsistent3:");
      fResult = this.inconsistent3();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());

      print("\n\n\nmultiedit:");
      fResult = this.multiedit();
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());
    }

    print("\n\n\naddDel:");
    var testNum = 1;
    var cns = 900;
    var resolves = 100;
    var solvers = 10;

    if (args.length > 0) testNum = args[0];
    if (args.length > 1) cns = args[1];
    if (args.length > 2) solvers = args[2];
    if (args.length > 3) resolves = args[3];
    if (false) {
      fResult = this.addDel(cns, cns, resolves);
      fAllOkResult = fResult;
      if (!fResult) print("Failed!");
      if (CL.fGC) print("Num vars = " + ClAbstractVariable.numCreated());
    }
    this.addDelSolvers(cns, resolves, solvers, testNum);
  },
});

/* private static  */
ClTests.iRandom = 0;
/* private static  */
ClTests.cRandom = 0;
/* private static  */
ClTests.vRandom;

clt = new ClTests();
clt.main(new Array(1,100,10,50));
//clt.main(new Array());

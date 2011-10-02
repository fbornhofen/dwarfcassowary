print = function () {};

(function (urlPrefix) {

  var load = function (jsFile) {
    var el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.setAttribute('src', urlPrefix + '/' + jsFile);
    document.body.appendChild(el);
  }

  // no more mootools. requires Object extensions from lively/Base.js instead
  //load("mootools-core-1.3.2-server.js");
  load('jshashtable-2.1-gjb.js');
  load('jshashset-gjb.js');
  load('ExCLError.js')
  load('ClSymbolicWeight.js')
  load('ClStrength.js')
  load('ClVariable.js')
  load('ClPoint.js')
  load('ClLinearExpression.js')
  load('ClConstraint.js')
  load('ClLinearConstraint.js')
  load('ClEditInfo.js')
  load('ClTableau.js')
  load('ClSimplexSolver.js')
  load('CL.js')

  load('Timer.js')
  load('ClTests.js')


}) ('/dwarfcassowary/js');


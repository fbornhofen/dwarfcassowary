print = function () {};

var urlPrefix = '/dwarfcassowary/js/';

// no more mootools. requires Object extensions from lively/Base.js instead
//load("mootools-core-1.3.2-server.js");
['jshashtable-2.1-gjb.js',
'jshashset-gjb.js',
'ExCLError.js',
'ClSymbolicWeight.js',
'ClStrength.js',
'ClVariable.js',
'ClPoint.js',
'ClLinearExpression.js',
'ClConstraint.js',
'ClLinearConstraint.js',
'ClEditInfo.js',
'ClTableau.js',
'ClSimplexSolver.js',
'CL.js',
'Timer.js',
'ClTests.js'].forEach (function (file) {
  JSLoader.loadJs(urlPrefix + file);
})




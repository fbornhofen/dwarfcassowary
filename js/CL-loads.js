print = function () {};

//var urlPrefix = Config.codeBase.match(/http.?:\/\/[^\/]*(.*)/)[1] + 'apps/dwarfcassowary/js/';
var urlPrefix = Config.codeBase  + 'apps/dwarfcassowary/js/';

// no more mootools. requires Object extensions from lively/Base.js instead
[
'jshashtable-2.1-lk-fbo.js',
'jshashset-lk-fbo.js',
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
//'ClTests.js'
].forEach (function (file) {
  JSLoader.loadJs(urlPrefix + file); //, function(){}, true);
  
})




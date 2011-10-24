#!/bin/sh

MOD_NAME=DwarfCassowary
MOD_PATH='apps.dwarfcassowary.js'
HASH_MODULE='apps.dwarfcassowary.js.HashSet'

echo "module('$MOD_PATH.$MOD_NAME').requires('$HASH_MODULE').toRun(function() {" > $MOD_NAME.js

cat ExCLError.js ClSymbolicWeight.js ClStrength.js ClVariable.js ClPoint.js ClLinearExpression.js ClConstraint.js ClLinearConstraint.js ClEditInfo.js ClTableau.js ClSimplexSolver.js CL.js Timer.js >> $MOD_NAME.js

echo "});" >> $MOD_NAME.js

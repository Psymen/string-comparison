levenshtein-distance
====================

This tiny project is just meant to demonstrate the calculation of the Levenshtein Distance, which is one of the ways to define an *edit distance* between two strings. Here we define the edit distance to be the minimum number of operations (deletion, insertion, substitution).

More precisely, each operation is weighted, and the minimum of the sum of these weighted operations determined the optimum path.

For more information on what the Levenshtein Distance is, check out [the wikipedia article](http://en.wikipedia.org/wiki/Levenshtein_distance).

Note: We use a dynamic programming implementation, not recursion.

Install it: `npm install` `bower install`

Run It: `grunt serve`
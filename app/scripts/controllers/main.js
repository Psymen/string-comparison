'use strict';

/**
 * @ngdoc function
 * @name stringcomparison.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stringcomparison
 */
 angular.module('stringcomparison')
 .controller('MainCtrl', function ($scope) {

	$scope.stringASanitized = '';
	$scope.stringBSanitized = '';
	$scope.insignificantCharacters = null;
	$scope.significantCharacters = null;

	$scope.getAllCommonStringsScopeBind = function(str1, str2){
		$scope.stringASanitized = $scope.sanitizeArbitrationInput(str1, $scope.insignificantCharacters, $scope.significantCharacters);
		$scope.stringBSanitized = $scope.sanitizeArbitrationInput(str2, $scope.insignificantCharacters, $scope.significantCharacters);
		var returnObj = $scope.getAllCommonStrings($scope.stringASanitized, $scope.stringBSanitized);

		$scope.lengthLong = returnObj.length;
		$scope.sequenceLong = returnObj.sequence;
		$scope.offset1Long = returnObj.offset1;
		$scope.offset2Long = returnObj.offset2;
	};

	/**
	 * This function accepts a string to be normalized with the appropriate parameters (both insignificant
	 * and significant characters).
	 * 
	 * @param  (String) str                     The string for normalization
	 * @param  (String) insignificantCharacters A series of insigificant characters, no delimiter
	 * @param  (String) significantCharacters   A series of sigificant characters, no delimiter
	 * @return (String)                         The normalized string
	 */
	$scope.sanitizeArbitrationInput = function(str, _insignificantCharacters, _significantCharacters){
   
	    // Note: a project can have insignificant characters or significant characters but not both

	    var alphaNumericRegex = /^[a-z0-9]+$/i;
	    var returnStr = str.split('');
	    var insignificantCharacters = (_insignificantCharacters)? _insignificantCharacters.split('') : [];
	    var significantCharacters = (_significantCharacters)? _significantCharacters.split('') : [];
	   	
	    for(var i=0; i<returnStr.length; i++){
	    	if(!alphaNumericRegex.test(returnStr[i])){
	    		// is not a letter or number
	    		if(insignificantCharacters && _.contains(insignificantCharacters, returnStr[i])){
	    			returnStr[i] = ' ';
	    		}
	    		else if(significantCharacters && _.contains(significantCharacters, returnStr[i])){
	    			returnStr[i] = ' ';
	    		}
	    		else if(!insignificantCharacters || !_significantCharacters){
	    			returnStr[i] = ' ';
	    		}
	    	}
	    }

	    returnStr = returnStr.join('');
		returnStr = returnStr.replace(/ +(?= )/g,''); // get rid of multiple spaces

	    return returnStr;
	};

	$scope.getAllCommonStrings = function(str1, str2){
		var lengthLong = [],
			sequenceLong = [],
			offset1Long = [],
			offset2Long = [];

		var returnObject = $scope.longestCommonSubstring(str1,str2);

		lengthLong.push(returnObject.length);
		sequenceLong.push(returnObject.sequence);
		offset1Long.push(returnObject.offset1);
		offset2Long.push(returnObject.offset2);

		var newString1 = str1;
		var newString2 = str2;

		while(lengthLong[lengthLong.length - 1] > 1){

			var latestSequence = sequenceLong[sequenceLong.length-1];
			var fillString1 = new Array(latestSequence.length + 1).join('>');
			var fillString2 = new Array(latestSequence.length + 1).join('<');

			var replaceRegex = new RegExp(latestSequence, 'gi');
			var newString1 = newString1.replace(replaceRegex, fillString1);
			var newString2 = newString2.replace(replaceRegex, fillString2);

			returnObject = $scope.longestCommonSubstring(newString1,newString2);

			if(returnObject.length > 1){ 
				lengthLong.push(returnObject.length);
				sequenceLong.push(returnObject.sequence);
				offset1Long.push(returnObject.offset1);
				offset2Long.push(returnObject.offset2);
			}
			else{
				break;
			}

			console.log("Current Length: " + lengthLong[lengthLong.length - 1]);
		}

		return {
			length: lengthLong,
			sequence: sequenceLong,
			offset1: offset1Long,
			offset2: offset2Long
		};
	};

	$scope.longestCommonSubstring = function longestCommonSubstring(str1, str2){

		if (!str1 || !str2){ // special case for falsy inputs
			return {
				length: 0,
				sequence: '',
				offset: 0
			};
		}

		var sequence = '',
			str1Length = str1.length,
			str2Length = str2.length,
			num = new Array(str1Length),
			maxlen = 0,
			lastSubsBegin = 0;

		for (var i = 0; i < str1Length; i++) {
			var subArray = new Array(str2Length);
			for (var j = 0; j < str2Length; j++){
				subArray[j] = 0;
			}
			num[i] = subArray;
		}

		var thisSubsBegin1 = null;
		var thisSubsBegin2 = null;
		
		for (var i = 0; i < str1Length; i++)
		{
			for (var j = 0; j < str2Length; j++)
			{
				if (str1[i] !== str2[j]){
					num[i][j] = 0;
				}
				else
				{
					if ((i === 0) || (j === 0)){
						num[i][j] = 1;
					}
					else{
						num[i][j] = 1 + num[i - 1][j - 1];
					}

					if (num[i][j] > maxlen)
					{
						maxlen = num[i][j];
						thisSubsBegin1 = i - num[i][j] + 1;
						thisSubsBegin2 = j - num[i][j] + 1;

						if (lastSubsBegin === thisSubsBegin1)
						{ //if the current LCS is the same as the last time this block ran
							sequence += str1[i];
						}
						else //this block resets the string builder if a different LCS is found
						{
							lastSubsBegin = thisSubsBegin1;
							sequence= ''; //clear it
							sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
						}
					}
				}
			}
		}

		var printNum =  num[0].map(function(col, i) { 
			return num.map(function(row) { 
				return row[i];
			});
		});

		// console.log(JSON.stringify(num));
		// console.log(JSON.stringify(printNum));

		for(var print = 0; print < str2Length; print++){
			console.log(printNum[print]);
		}

		return {
			length: maxlen,
			sequence: sequence,
			offset1: thisSubsBegin1,
			offset2: thisSubsBegin2
		};
	};

});

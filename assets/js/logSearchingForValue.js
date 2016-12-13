var walked = [];

var searchHaystack = function(haystack, needle, path, exactEquals) {

  //dumb truthiness handling
  exactEquals = exactEquals ? true : false;

  if(typeof haystack != "object") {
    console.warn("non-object haystack at " + path.join("."));
    return [false, null];
  }

  if (walked.indexOf(haystack) > -1) {
    return [false, null];
  }
  walked.push(haystack);

  for(var key in haystack) {
    if(!haystack.hasOwnProperty(key))
      continue;

    var matches;
    //might be good to have a "JSON-equivalent" option too...
    if(exactEquals)
      matches = haystack[key] === needle;
    else
      matches = haystack[key] == needle;

    if(matches) {
      path.push(key);
      return [true, path];
    }

    if(typeof haystack[key] == "object") {
      var pCopy = path.slice();
      pCopy.push(key);
      var deeper = searchHaystack(haystack[key], needle, pCopy, exactEquals);
      if(deeper[0]) {
        return deeper;
      }
    }
  }
  return [false, null];
}

var pathToIndexExpression = function(path) {
  var prefix = path[0];
  path = path.slice(1);
  for(var i = 0; i < path.length; i++) {
    if(typeof path[i] == "string")
      path[i] = "\"" + path[i] + "\"";
  }
  return prefix + "[" + path.join("][") + "]"
}

var searchForValue = function(haystack, needle) {
  walked = [];
  var result = searchHaystack(haystack, needle, ["<haystack>"], true);
  if(result[0]) {
    console.log("============================================== Found it! ===================================================");
    console.log(pathToIndexExpression(result[1]));
  }
  else {
    console.log("didn't find it");
  }
};    
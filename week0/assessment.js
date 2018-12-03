//  Blockgeeks - Assessment 0
//  Chris McDaniel  ( ChrisMcD )


//  Task 1: Repeating Numbers

var repeatNumbers = function(data) {
  
    var results = "";
    for ( var x in data ) {

        if ( x != 0 ) {
            results += ", ";
        }

        var set = data[x];
        for ( var y = 0; y < set[1]; y++ ) {
            results += set[0];
        }
    }

    return results;

};

console.log(repeatNumbers([[1, 10]]));
console.log(repeatNumbers([[1, 2], [2, 3]]));
console.log(repeatNumbers([[10, 4], [34, 6], [92, 2]]));







//  Task 2: Conditional Sums

var conditionalSum = function(values, condition) {

    function isEven(num) {
        return num % 2 === 0;
    }

    var results = 0;

    for (var x in values) {

        if (isEven(values[x])) {

            if (condition == "even") {
                results = results + values[x];
            } 
    
        } else {

            if (condition == "odd") {
                results = results + values[x];
            } 
    
        }

    }

    return results;

};
  
console.log(conditionalSum([1, 2, 3, 4, 5], "even"));
console.log(conditionalSum([1, 2, 3, 4, 5], "odd"));
console.log(conditionalSum([13, 88, 12, 44, 99], "even"));
console.log(conditionalSum([], "odd"));





//  Task 3: Talking Calendar

var talkingCalendar = function(date) {

    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    var daySuffix = ["st", "nd", "rd", "th"];
    
    var test = new Date(date);
    var y = test.getFullYear();
    var m = test.getMonth();
    var d = test.getDate(); 
    if (d > 3 ) { 
        d = d + daySuffix[3];
    } else {
        d = d + daySuffix[d-1];
    }

    return monthNames[m] + " " + d + ", " + y;

};
  
console.log(talkingCalendar("2017/12/02"));
console.log(talkingCalendar("2007/11/11"));
console.log(talkingCalendar("1987/08/24"));





//  Task 4: Challenge Calculator

var calculateChange = function(total, cash) {
    
    // Reset and calcualte change
    var distribution = [1, 5, 10, 25, 100, 200, 500, 1000, 2000];
    var distributionText = ["penny", "nickel", "dime", "quarter", "one", "twoDollar", "five", "ten", "twenty"];
    var x = distribution.length - 1;
    var result = {};
    var change = cash - total;

    // Determine distribution 
    while (change >= distribution[0]) {  

      if (change >= distribution[x]) {  

        var count = 1;
        if (!isNaN(result[distributionText[x]])) {  // distribution already exists?
          count = result[distributionText[x]];  
          ++count;  
        }
        result[distributionText[x]] = count;  // reset distribution count
        change = change - distribution[x];  // subtract distribution amount from change

      } else {
          x--;  
      }

    }

    return JSON.stringify(result);

};
  
  console.log(calculateChange(1787, 2000));
  console.log(calculateChange(2623, 4000));
  console.log(calculateChange(501, 1000));

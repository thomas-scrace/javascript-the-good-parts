//JavaScript: The Good Parts, Chapter 3: Objects, p.20

var empty_object = {};

var stooge = {
    'first_name': "Jerome",
    'last_name': "Howard"
};

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};
document.writeln(flight.departure.IATA); // SYD
document.writeln(flight.departure.seat_number); // undefined

var status = flight.status || "unknown";
document.writeln(status); // unknown

try {
    // this will throw a TypeError. We are tying to get a value from undefined.
    // we are jumping ahead a bit here with the try/catch keywords. See p.32
    var row = flight.departure.seat_number.row;
} catch (exception) {
    document.writeln(exception.name + ': ' + exception.message);
}

// guard against this using the && operator
var row = flight.departure.seat_number && flight.departure.seat_number.row;
document.writeln(row);

stooge.first_name = "Larry" // overwrite the existing stooge.first_name value
flight.airline = "BA"       // create a new property name 'airline' and assign
                            // to it the value 'BA'

var ref = stooge;
stooge.nickname = "Curly";
var nick = ref.nickname;
document.writeln(nick); // Curly (ref and stooge reference the same object)

var a = {}, b = {}, c = {}; // a, b, c each refer to a different empty object
a = b = c = {}; // a, b, c all refer to the same empty object.

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.create(stooge);
another_stooge.nickname = "Moe";

document.writeln(stooge.nickname); // Curly
document.writeln(another_stooge.nickname); // Moe

stooge.profession = "Actor";
document.writeln(another_stooge.profession); // Actor

num_property = flight.hasOwnProperty('number')
constructor_property = flight.hasOwnProperty('constructor')

document.writeln(num_property) // true
document.writeln(constructor_property) // false (hasOwnProperty does not look
                                       // at the prototype chain).

var name;
for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') {
        document.writeln(name + ': ' + another_stooge[name]);
    }
}

var i;
var properties = [
    'first_name',
    'last_name',
    'nickname',
    'profession'
];
for (i = 0; i < properties.length; i += 1) {
    document.writeln(properties[i] + ': ' + 
        another_stooge[properties[i]]);
}

document.writeln(another_stooge.nickname); // Moe
delete another_stooge.nickname
document.writeln(another_stooge.nickname); // Curly

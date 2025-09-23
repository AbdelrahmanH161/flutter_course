import { Database, Code, Play, Coffee, Box, Layers } from 'lucide-react';

export const sessionsDay1 = [
  {
    id: 1,
    title: 'What is Dart and Why?',
    duration: '10 Minutes',
    icon: <Database className='w-6 h-6' />,
    content: {
      description:
        "Dart is a programming language developed by Google. Its main purpose is to build beautiful, high-quality applications for mobile, web, and desktop. It's often called a 'client-optimized' language because it's designed specifically to create great user interfaces (UIs) and perform well on devices.",
      topics: [
        'Fast Performance: Compiles to native machine code (AOT).',
        'Hot Reload: Just-in-time (JIT) compilation for instant feedback.',
        'Cross-Platform: Single language for iOS, Android, and web with Flutter.',
        'Easy to Learn: Familiar syntax for developers from other languages.',
      ],
    },
  },
  {
    id: 2,
    title: 'Variable Data Types',
    duration: '20 minutes',
    icon: <Code className='w-6 h-6' />,
    content: {
      description:
        'Every program needs to store information, and in Dart, we do that using variables. A variable is like a container with a label that holds a specific type of data.',
      topics: [
        'int: For whole numbers.',
        'double: For decimal numbers.',
        'String: For text.',
        'bool: For true/false values.',
        'dynamic: A flexible type for any data.',
        'var: Type inference based on the initial value.',
        'Understanding var, final, const, and late.',
      ],
      detailedTopics: {
        int: {
          title: 'Integer (int)',
          code: `int age = 25;\nint year = 2024;`,
        },
        double: {
          title: 'Double (double)',
          code: `double pi = 3.14159;\ndouble temperature = -1.5;`,
        },
        String: {
          title: 'String',
          code: `String name = 'Alice';\nString message = "Hello, world!";`,
        },
        bool: {
          title: 'Boolean (bool)',
          code: `bool isStudent = true;\nbool hasFinished = false;`,
        },
        dynamic: {
          title: 'Dynamic',
          code: `dynamic value = 10;\nvalue = 'Hello';\nvalue = true;`,
        },
        var: {
          title: 'Var',
          code: `var count = 5; // Inferred as int\nvar greeting = 'Hi'; // Inferred as String`,
        },
        varFinalConstLate: {
          title: 'var vs final vs const vs late',
          code: `// 'var' can be reassigned.
var myVariable = 'Initial Value';
myVariable = 'New Value';

// 'final' can only be set once.
final finalVariable = 'You can only set me once.';
// finalVariable = 'Error!'; // This would cause an error.

// 'const' is a compile-time constant.
const constVariable = 100;
// constVariable = 200; // Error!

// 'late' is for variables initialized after declaration.
late String description;
description = 'Initialized later!';
print(description);`,
        },
      },
    },
  },
  {
    id: 3,
    title: 'Operators',
    duration: '10 minutes',
    icon: <Code className='w-6 h-6' />,
    content: {
      description:
        'Operators in Dart are special symbols that perform operations on one or more operands. They help you perform calculations, comparisons, and logical operations in your code.',
      topics: [
        'Arithmetic operators (+, -, *, /, ~/, %)',
        'Increment/Decrement operators (++, --)',
        'Equality and Relational operators (==, !=, >, <, >=, <=)',
        'Type test operators (is, is!)',
        'Assignment operators (=, +=, -=, etc.)',
        'Logical operators (&&, ||, !)',
        'Conditional expressions (?:, ??)',
      ],
      detailedTopics: {
        arithmetic: {
          title: 'Arithmetic Operators',
          code: `// Basic arithmetic
assert(2 + 3 == 5);
assert(2 - 3 == -1);
assert(2 * 3 == 6);
assert(5 / 2 == 2.5); // Result is double
assert(5 ~/ 2 == 2);  // Integer division
assert(5 % 2 == 1);   // Modulo/remainder`,
        },
        incrementDecrement: {
          title: 'Increment/Decrement',
          code: `int a = 0;
int b = ++a;    // Increment a before
assert(a == b); // 1 == 1

a = 0;
b = a++;        // Increment a after
assert(a != b); // 1 != 0`,
        },
        equality: {
          title: 'Equality and Relational',
          code: `assert(2 == 2);
assert(2 != 3);
assert(3 > 2);
assert(2 < 3);
assert(3 >= 3);
assert(2 <= 3);`,
        },
        typeTest: {
          title: 'Type Test Operators',
          code: `Object obj = 'Hello';
if (obj is String) {
  // Type check
  print(obj.length);
}

// Type cast
String str = obj as String;`,
        },
        assignment: {
          title: 'Assignment Operators',
          code: `int a = 2;    // Basic assignment
a += 3;         // Add and assign
assert(a == 5);

String? name;
name ??= 'Guest'; // Assign if null`,
        },
        logical: {
          title: 'Logical Operators',
          code: `bool done = false;
int col = 0;

if (!done && (col == 0 || col == 3)) {
  print('Condition met');
}`,
        },
        conditional: {
          title: 'Conditional Expressions',
          code: `// Ternary operator
bool isPublic = true;
String visibility = isPublic ? 'public' : 'private';

// Null-coalescing operator
String? name;
String displayName = name ?? 'Guest';`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Control Statements',
    duration: '20 minutes',
    icon: <Play className='w-6 h-6' />,
    content: {
      description:
        'Control statements allow you to control the flow of your program based on conditions. They make your programs "smarter" by allowing them to make decisions.',
      topics: [
        'if, else if, else: Conditional execution.',
        'switch: Handling multiple conditions for a single value.',
        'for loops: Repeating code a specific number of times.',
        'while loop: Repeating code as long as a condition is true.',
        'break and continue: Controlling loop execution.',
      ],
      detailedTopics: {
        ifElse: {
          title: 'if, else if, else',
          code: `int score = 85;\nif (score > 90) {\n  print('A+');\n} else if (score > 80) {\n  print('A');\n} else {\n  print('B');\n}`,
        },
        switch: {
          title: 'switch',
          code: `String day = 'Monday';\nswitch (day) {\n  case 'Monday':\n    print('Start of the week.');\n    break;\n  case 'Friday':\n    print('End of the week!');\n    break;\n  default:\n    print('Just another day.');\n}`,
        },
        forLoop: {
          title: 'for loop',
          code: `for (int i = 0; i < 3; i++) {\n  print('Loop number $i');\n}`,
        },
        whileLoop: {
          title: 'while loop',
          code: `int count = 0;\nwhile (count < 5) {\n  print(count);\n  count++;\n}`,
        },
      },
    },
  },
  {
    id: 5,
    title: 'Functions',
    duration: '30 minutes',
    icon: <Coffee className='w-6 h-6' />,
    content: {
      description:
        'A function is a block of organized, reusable code that performs a single, specific task.',
      topics: [
        'Defining a function with `void`.',
        'Returning a value from a function.',
        'Using arrow functions for concise syntax.',
        'Named parameters for clarity.',
        'Optional positional parameters for flexibility.',
      ],
      detailedTopics: {
        defining: {
          title: 'Defining a function',
          code: `void greet(String name) {\n  print('Hello, $name!');\n}\ngreet('Bob');`,
        },
        returning: {
          title: 'Returning a value',
          code: `int addNumbers(int a, int b) {\n  return a + b;\n}\nint sum = addNumbers(5, 3);\nprint(sum); // Output: 8`,
        },
        arrow: {
          title: 'Arrow functions',
          code: `int multiply(int a, int b) => a * b;\nint product = multiply(4, 5);\nprint(product); // Output: 20`,
        },
        namedParams: {
          title: 'Named Parameters',
          code: `// Use { } to specify named parameters.
void enableFlags({bool bold = false, bool hidden = false}) {
  // ...
}

// Call the function using paramName: value
enableFlags(hidden: true, bold: false);`,
        },
        optionalParams: {
          title: 'Optional Positional Parameters',
          code: `// Use [ ] to specify optional positional parameters.
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}

// Call without the optional parameter.
say('Bob', 'Howdy');

// Call with the optional parameter.
say('Bob', 'Howdy', 'smoke signal');`,
        },
      },
    },
  },
  {
    id: 6,
    title: 'Data Structures and Collections',
    duration: '1 hour',
    icon: <Database className='w-6 h-6' />,
    content: {
      description:
        'Collections are objects that can hold multiple values. Dart ships with a core collections API, which includes classes for lists, sets, and maps. For more details, check out the official documentation on [Collections](https://dart.dev/language/collections) and the [dart:core library](https://dart.dev/libraries/dart-core#collections).',
      topics: [
        'Lists: Ordered collections, accessible by index.',
        'Sets: Unordered collections of unique items.',
        'Maps: Unordered collections of key-value pairs.',
        'Common Methods: Powerful tools like `forEach`, `map`, and `where`.',
      ],
      detailedTopics: {
        listCreation: {
          title: 'Lists: Creation and Manipulation',
          code: `// Create an empty list of strings.
var grains = <String>[];
assert(grains.isEmpty);

// Create a list using a list literal.
var fruits = ['apples', 'oranges'];

// Add to a list.
fruits.add('kiwis');

// Add multiple items to a list.
fruits.addAll(['grapes', 'bananas']);
assert(fruits.length == 5);

// Remove a single item.
var appleIndex = fruits.indexOf('apples');
fruits.removeAt(appleIndex);
assert(fruits.length == 4);

// Remove all elements from a list.
fruits.clear();
assert(fruits.isEmpty);`,
        },
        listSorting: {
          title: 'Lists: Sorting',
          code: `var fruits = ['bananas', 'apples', 'oranges'];

// Sort a list.
fruits.sort((a, b) => a.compareTo(b));
assert(fruits[0] == 'apples');`,
        },
        set: {
          title: 'Sets: Unordered & Unique',
          code: `// Create an empty set of strings.
var ingredients = <String>{};

// Add new items to it.
ingredients.addAll(['gold', 'titanium', 'xenon']);
assert(ingredients.length == 3);

// Adding a duplicate item has no effect.
ingredients.add('gold');
assert(ingredients.length == 3);

// Remove an item from a set.
ingredients.remove('gold');
assert(ingredients.length == 2);

// Check for an item.
assert(ingredients.contains('titanium'));`,
        },
        map: {
          title: 'Maps: Key-Value Pairs',
          code: `// Maps often use strings as keys.
var hawaiianBeaches = {
  'Oahu': ['Waikiki', 'Kailua', 'Waimanalo'],
  'Big Island': ['Wailea Bay', 'Pololu Beach'],
  'Kauai': ['Hanalei', 'Poipu'],
};

// Retrieve a value with a key.
assert(hawaiianBeaches['Oahu'].contains('Waikiki'));

// Check whether a map contains a key.
assert(hawaiianBeaches.containsKey('Oahu'));

// Use putIfAbsent() to add a key-value pair if the key isn't already there.
var teamAssignments = <String, String>{};
teamAssignments.putIfAbsent('Catcher', () => 'John');
assert(teamAssignments['Catcher'] != null);`,
        },
        commonMethods: {
          title: 'Common Collection Methods',
          code: `var teas = ['green', 'black', 'chamomile', 'earl grey'];

// Use forEach to apply a function to each item.
teas.forEach((tea) => print('I drink $tea'));

// Use map() to transform each item.
var loudTeas = teas.map((tea) => tea.toUpperCase()).toList();

// Use where() to filter items.
var decaffeinatedTeas = teas.where((tea) => tea == 'chamomile');

// Use any() to check if at least one item satisfies a condition.
assert(teas.any((tea) => tea == 'chamomile'));

// Use every() to check if all items satisfy a condition.
assert(!teas.every((tea) => tea == 'chamomile'));`,
        },
      },
    },
  },
];

export const sessionsDay2 = [
  {
    id: 1,
    title: 'Introduction to OOP',
    duration: '40 minutes',
    icon: <Box className='w-6 h-6' />,
    content: {
      description:
        'Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects," which can contain data and code.',
      topics: [
        'Classes: Blueprints for creating objects.',
        'Objects: Instances of a class.',
        'Generative Constructors: The standard way to create an object.',
        'Named Constructors: Provide multiple, clear ways to create objects.',
        'Constant Constructors: For creating compile-time constant objects.',
        'Default Constructors: The constructor used when no other is defined.',
      ],
      detailedTopics: {
        class: {
          title: 'Classes and Objects',
          code: `class Car {
  String color;
  String model;

  Car(this.color, this.model); // Constructor

  void drive() {
    print('The $color $model is driving.');
  }
}

void main() {
    Car myCar = Car('red', 'Tesla');
    myCar.drive(); // Output: The red Tesla is driving.
}`,
        },
        generativeConstructor: {
          title: 'Generative Constructor',
          code: `// A generative constructor with initializing formal parameters.
class Point {
  double x, y;
  Point(this.x, this.y);
}

// A generative constructor with a body.
class Logger {
  final String name;
  bool mute = false;

  // The constructor body runs after all instance variables are initialized.
  Logger(this.name) {
    print('Logger created: $name');
  }
}

void main() {
  var p = Point(1, 2);
  var log = Logger('MyLogger');
}`,
        },
        namedConstructor: {
          title: 'Named Constructor',
          code: `class Point {
  final double x, y;

  // Main constructor
  Point(this.x, this.y);

  // Named constructor with an initializer list
  Point.origin()
      : x = 0,
        y = 0;

  // Named constructor that redirects to the main constructor
  Point.alongXAxis(double x) : this(x, 0);
}

void main() {
  var p1 = Point(2, 3);
  var p2 = Point.origin();
  var p3 = Point.alongXAxis(5);
  print('p1: (\${p1.x}, \${p1.y})');      // p1: (2, 3)
  print('p2 (origin): (\${p2.x}, \${p2.y})'); // p2 (origin): (0, 0)
  print('p3 (alongX): (\${p3.x}, \${p3.y})'); // p3 (alongX): (5, 0)
}`,
        },
        constantConstructor: {
          title: 'Constant Constructor',
          code: `class ImmutablePoint {
  static const ImmutablePoint origin = ImmutablePoint(0, 0);

  final double x, y;

  const ImmutablePoint(this.x, this.y);
}

void main() {
  // These two instances are the same object because of 'const'.
  var a = const ImmutablePoint(1, 1);
  var b = const ImmutablePoint(1, 1);
  assert(identical(a, b)); // They are the same instance!

  // Without 'const', they would be two different instances.
  var c = ImmutablePoint(1, 1);
  var d = ImmutablePoint(1, 1);
  assert(!identical(c, d)); // They are NOT the same instance.
}`,
        },
        defaultConstructor: {
          title: 'Default Constructor',
          code: `// If you don't declare a constructor, a default one is provided.
// It has no arguments and invokes the no-argument constructor
// in the superclass.
class MySimpleClass {}

var myObject = MySimpleClass(); // Uses the default constructor.`,
        },
      },
    },
  },
  {
    id: 2,
    title: 'OOP - Inheritance & Polymorphism',
    duration: '40 minutes',
    icon: <Layers className='w-6 h-6' />,
    content: {
      description:
        'Inheritance is a mechanism where a new class (child or subclass) can inherit properties and methods from an existing class (parent or superclass). Polymorphism is the ability of an object to take on many forms.',
      topics: [
        'Understanding inheritance and parent-child relationships',
        'Using the extends keyword and super constructor',
        'Method overriding with @override',
        'Abstract classes and interfaces',
      ],
      detailedTopics: {
        inheritance: {
          title: 'Inheritance Example',
          code: `class ElectricCar extends Car {
  int batteryLevel;

  ElectricCar(String color, String model, this.batteryLevel) : super(color, model);
  // The super() keyword calls the parent constructor.

  void charge() {
    print('The electric car is charging.');
  }
}`,
        },
        polymorphism: {
          title: 'Polymorphism Example',
          code: `@override
void drive() {
  print('The electric car is driving silently.');
}`,
        },
      },
    },
  },
  {
    id: 3,
    title: 'Encapsulation, Abstraction & Static Members',
    duration: '40 minutes',
    icon: <Box className='w-6 h-6' />,
    content: {
      description:
        'Encapsulation is the bundling of data and methods that operate on that data within a single unit. Abstraction is the concept of hiding complex implementation details and showing only necessary features.',
      topics: [
        'Private members using underscore (_) prefix',
        'Getters and setters for controlled access',
        'Abstract classes and methods',
        'Static members and their uses',
        'Understanding encapsulation principles',
      ],
      detailedTopics: {
        encapsulation: {
          title: 'Encapsulation with Private Members',
          code: `class BankAccount {
  // Private member (starts with underscore)
  double _balance = 0.0;
  
  // Public getter
  double get balance => _balance;
  
  // Public setter with validation
  set balance(double value) {
    if (value >= 0) {
      _balance = value;
    }
  }
  
  void deposit(double amount) {
    if (amount > 0) {
      _balance += amount;
    }
  }
  
  bool withdraw(double amount) {
    if (amount > 0 && amount <= _balance) {
      _balance -= amount;
      return true;
    }
    return false;
  }
}`,
        },
        abstraction: {
          title: 'Abstraction with Abstract Classes',
          code: `// Abstract class - cannot be instantiated
abstract class Shape {
  // Abstract method - must be implemented by subclasses
  double calculateArea();
  double calculatePerimeter();
  
  // Concrete method - has implementation
  void displayInfo() {
    print('Area: \${calculateArea()}');
    print('Perimeter: \${calculatePerimeter()}');
  }
}

class Circle extends Shape {
  double radius;
  
  Circle(this.radius);
  
  @override
  double calculateArea() => 3.14159 * radius * radius;
  
  @override
  double calculatePerimeter() => 2 * 3.14159 * radius;
}`,
        },
        staticMembers: {
          title: 'Static Members',
          code: `class MathUtils {
  // Static constant
  static const double pi = 3.14159;
  
  // Static method
  static int add(int a, int b) => a + b;
  static int multiply(int a, int b) => a * b;
  
  // Static getter
  static String get description => 'Utility class for mathematical operations';
}

void main() {
  // Access static members without creating an instance
  print(MathUtils.pi); // 3.14159
  print(MathUtils.add(5, 3)); // 8
  print(MathUtils.description); // Utility class for mathematical operations
}`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'More on OOP',
    duration: '40 minutes',
    icon: <Box className='w-6 h-6' />,
    content: {
      description:
        'We explore advanced OOP concepts in Dart including mixins and enums. These features provide powerful ways to organize and structure your code.',
      topics: [
        'Mixins for code reuse across multiple class hierarchies',
        'Enums for defining sets of named constants',
        'Abstract Classes vs Interfaces for defining contracts',
        'Best practices in OOP design',
      ],
      detailedTopics: {
        mixins: {
          title: 'Mixins Example',
          code: `mixin CanFly {
  void fly() {
    print('I can fly!');
  }
}

class Bird with CanFly {
  // The Bird class now has the fly() method.
}`,
        },
        enums: {
          title: 'Enums',
          code: `enum Status {
  pending,
  inProgress,
  completed,
}

enum Color {
  red,
  green,
  blue,
}

void main() {
  var currentStatus = Status.inProgress;
  print(currentStatus); // Output: Status.inProgress
}`,
        },
        abstractClasses: {
          title: 'Abstract Classes vs Interfaces',
          code: `// Abstract Class - can have implementation
abstract class Vehicle {
  void start(); // Abstract method
  
  void stop() {
    print('Vehicle stopped');
  }
}

class Car extends Vehicle {
  @override
  void start() {
    print('Car started with engine');
  }
}

// Interface - only method signatures
class Logger {
  void log(String message) => print(message);
}

class ConsoleLogger implements Logger {
  @override
  void log(String message) {
    print('[CONSOLE] $message');
  }
}`,
        },
        mixinsDetailed: {
          title: 'Advanced Mixins',
          code: `mixin LoggerMixin {
  void log(String message) {
    print('[LOG] $ {DateTime.now()}: $message');
  }
}

mixin JsonConverterMixin {
  String toJson() {
    return '{}';
  }
}

class User with LoggerMixin, JsonConverterMixin {
  String name;
  int age;
  
  User(this.name, this.age);
  
  void displayInfo() {
    log('Displaying user info');
    print('Name: $name, Age: $age');
  }
  
  @override
  String toJson() {
    return '{"name": "$name", "age": $age}';
  }
}`,
        },
        enumsAdvanced: {
          title: 'Advanced Enums with Values',
          code: `enum Status {
  pending('Pending'),
  approved('Approved'),
  rejected('Rejected');
  
  final String displayName;
  const Status(this.displayName);
}

enum Day {
  saturday,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday
}

void main() {
  Status myStatus = Status.approved;
  print(myStatus.displayName); // Output: Approved
  
  Day today = Day.monday;
  print(today.index); // Output: 2 (zero-based)
  
  // Iterate through all enum values
  for (var day in Day.values) {
    print(day);
  }
}`,
        },
        extendsVsImplements: {
          title: 'Extends vs Implements',
          code: `// Using extends (Inheritance)
class Animal {
  String name;
  int age;
  
  Animal(this.name, this.age);
  
  void eat() {
    print('$name is eating');
  }
}

class Dog extends Animal {
  String breed;
  
  Dog(String name, int age, this.breed) : super(name, age);
  
  @override
  void eat() {
    print('$name (a $breed) is eating quickly!');
    super.eat(); // Can access parent class methods
  }
}

// Using implements (Interface implementation)
class Logger {
  void log(String message) => print(message);
}

class ConsoleLogger implements Logger {
  @override
  void log(String message) {
    print('[CONSOLE] $message');
  }
  // Must implement ALL methods from Logger
}

class FileLogger implements Logger {
  @override
  void log(String message) {
    print('[FILE] $message');
  }
}

void main() {
  // Inheritance example
  Dog myDog = Dog('Rex', 3, 'Golden Retriever');
  myDog.eat(); // Can use parent class methods
  
  // Interface implementation example
  Logger logger1 = ConsoleLogger();
  Logger logger2 = FileLogger();
  
  logger1.log('Test message'); // [CONSOLE] Test message
  logger2.log('Another message'); // [FILE] Another message
}`,
        },
        comparisonTable: {
          title: 'Key Differences: Extends vs Implements',
          code: `/*
EXTENDS vs IMPLEMENTS Comparison:

EXTENDS (Inheritance):
✓ Inherits implementation from parent class
✓ Can use 'super' to access parent members
✓ Can inherit from only ONE class
✓ Creates "is-a" relationship
✓ Can override methods optionally

IMPLEMENTS (Interface):
✗ Must implement ALL inherited members
✗ Cannot use 'super' keyword
✓ Can implement MULTIPLE interfaces
✓ Creates "can-do" relationship
✓ Must override all methods

Example Usage:
class MyClass extends ParentClass { ... }     // Single inheritance
class MyClass implements Interface1, Interface2 { ... }  // Multiple interfaces
*/`,
        },
      },
    },
  },
];
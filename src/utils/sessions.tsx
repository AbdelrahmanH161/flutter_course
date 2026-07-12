import { Database, Code, Play, Coffee, Box, Layers, Terminal } from 'lucide-react';

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
    title: 'Installing Dart SDK',
    duration: '15 Minutes',
    icon: <Terminal className='w-6 h-6' />,
    content: {
      description:
        'Learn how to set up your local development environment by installing the Dart SDK on Windows using the Chocolatey package manager, matching the official curriculum steps.',
      topics: [
        'Open PowerShell as Administrator.',
        'Install Chocolatey Package Manager.',
        'Verify Chocolatey installation.',
        'Install the Dart SDK.',
        'Verify the Dart installation.',
      ],
      detailedTopics: {
        powershell: {
          title: '1. Open PowerShell as Administrator',
          code: `// Search for PowerShell in Windows, right-click, and select "Run as Administrator"`,
        },
        installChoco: {
          title: '2. Install Chocolatey Package Manager',
          code: `Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`,
        },
        verifyChoco: {
          title: '3. Verify Chocolatey Installation',
          code: `choco -v`,
        },
        installDart: {
          title: '4. Install Dart SDK',
          code: `choco install dart-sdk`,
        },
        verifyDart: {
          title: '5. Verify Dart SDK Installation',
          code: `dart --version`,
        },
      },
    },
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
          code: `for (int i = 0; i < 3; i++) {\n  print('Loop number \$i');\n}`,
        },
        whileLoop: {
          title: 'while loop',
          code: `int count = 0;\nwhile (count < 5) {\n  print(count);\n  count++;\n}`,
        },
      },
    },
  },
];

// ─────────────────────────────────────────────────────────────
// DAY 2: Functions, Collections, Error Handling & Null Safety
// ─────────────────────────────────────────────────────────────
export const sessionsDay2 = [
  {
    id: 1,


    title: 'Functions — Foundation to Advanced',
    duration: '45 minutes',
    icon: <Coffee className='w-6 h-6' />,
    content: {
      description:
        'Functions are reusable blocks of code that perform a specific task. We start from the basics — defining and calling functions — then progress to flexible parameter styles, arrow syntax, and using functions as values.',
      topics: [
        'Defining a function: void, return types, and parameters.',
        'Arrow syntax (=>): single-expression shorthand.',
        'Optional Positional Parameters []: can be omitted with a default.',
        'Named Parameters {}: passed by name, order doesn\'t matter.',
        'required keyword: forces a named parameter to be provided.',
        'map() and where(): using functions as arguments (practical HOF).',
      ],
      detailedTopics: {
        basics: {
          title: 'Defining Functions & Returning Values',
          code: `// void — the function returns nothing
void greet(String name) {
  print('Hello, \$name!');
}

// int — the function returns an integer
int add(int a, int b) {
  return a + b;
}

void main() {
  greet('Alice');          // Hello, Alice!
  print(add(5, 3));        // 8
}`,
        },
        arrow: {
          title: 'Arrow Syntax (=>)',
          code: `// Arrow syntax = shorthand for a function with one expression
// Great for small, focused functions

int square(int n) => n * n;
String shout(String text) => text.toUpperCase();
bool isEven(int n) => n % 2 == 0;

void main() {
  print(square(4));       // 16
  print(shout('hello'));  // HELLO
  print(isEven(7));       // false
}`,
        },
        optionalPositional: {
          title: 'Optional Positional Parameters [ ]',
          code: `// Wrap optional parameters in square brackets []
// They must have a default value or be nullable
String formatName(String first, [String last = '']) {
  if (last.isEmpty) return first;
  return '\$first \$last';
}

void main() {
  print(formatName('Alice'));          // Alice
  print(formatName('Alice', 'Smith')); // Alice Smith
}`,
        },
        namedParams: {
          title: 'Named Parameters { } and required',
          code: `// Named parameters go in curly braces {}
// They can be called in any order by name
void createUser({required String name, int age = 0, String role = 'user'}) {
  print('Created: \$name, age \$age, role \$role');
}

void main() {
  createUser(name: 'Alice');                        // Created: Alice, age 0, role user
  createUser(name: 'Bob', age: 25, role: 'admin'); // Created: Bob, age 25, role admin
  // createUser(); // ERROR: name is required
}`,
        },
        functionsAsValues: {
          title: 'Functions as Values — map() and where()',
          code: `void main() {
  var numbers = [1, 2, 3, 4, 5, 6];

  // map() — transforms each element
  var doubled = numbers.map((n) => n * 2).toList();
  print(doubled); // [2, 4, 6, 8, 10, 12]

  // where() — keeps only elements that pass the test
  var evens = numbers.where((n) => n % 2 == 0).toList();
  print(evens); // [2, 4, 6]

  // Chaining: filter then transform
  var doubledEvens = numbers
      .where((n) => n % 2 == 0)
      .map((n) => n * 2)
      .toList();
  print(doubledEvens); // [4, 8, 12]
}`,
        },
      },
    },
  },
  {
    id: 2,
    title: 'Collections — Foundation to Advanced',
    duration: '40 minutes',
    icon: <Database className='w-6 h-6' />,
    content: {
      description:
        'Collections store groups of values. Dart has three main types: List (ordered), Set (unique), and Map (key-value). Once you know the basics, powerful operators like spread and collection-if let you build collections in a clean, declarative style.',
      topics: [
        'List: ordered, indexed, allows duplicates.',
        'Set: unordered, all items are unique.',
        'Map: key-value pairs, like a dictionary.',
        'forEach, map(), where(): essential collection methods.',
        'Spread (...): merge collections in one line.',
        'Collection if: add items conditionally.',
        'Collection for: generate items with a loop.',
      ],
      detailedTopics: {
        lists: {
          title: 'Lists — Ordered Collections',
          code: `void main() {
  // Create a list
  var fruits = ['apple', 'banana', 'cherry'];

  // Access by index
  print(fruits[0]); // apple

  // Add items
  fruits.add('date');
  fruits.addAll(['elderberry', 'fig']);

  // Remove items
  fruits.remove('banana');

  // Check length and emptiness
  print(fruits.length);   // 5
  print(fruits.isEmpty);  // false

  // Loop through
  for (var fruit in fruits) {
    print(fruit);
  }
}`,
        },
        setsAndMaps: {
          title: 'Sets & Maps',
          code: `void main() {
  // Set — no duplicates
  var colors = {'red', 'green', 'blue'};
  colors.add('red'); // Ignored — already exists
  print(colors.length); // 3
  print(colors.contains('green')); // true

  // Map — key-value pairs
  var scores = {
    'Alice': 95,
    'Bob': 87,
    'Carol': 92,
  };

  print(scores['Alice']); // 95
  scores['Dave'] = 78;    // Add new entry

  // Loop through a Map
  scores.forEach((name, score) {
    print('\$name scored \$score');
  });
}`,
        },
        methods: {
          title: 'Essential Collection Methods',
          code: `void main() {
  var numbers = [3, 1, 4, 1, 5, 9, 2, 6];

  // map() — transform each item
  var squared = numbers.map((n) => n * n).toList();
  print(squared); // [9, 1, 16, 1, 25, 81, 4, 36]

  // where() — keep items that pass the test
  var bigNums = numbers.where((n) => n > 4).toList();
  print(bigNums); // [5, 9, 6]

  // sort a list
  numbers.sort();
  print(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

  // any() and every()
  print(numbers.any((n) => n > 8));   // true  (9 exists)
  print(numbers.every((n) => n > 0)); // true  (all positive)
}`,
        },
        spreadOperator: {
          title: 'Spread Operator (...) and Null-Aware Spread (...?)',
          code: `void main() {
  var veggies = ['carrot', 'pea'];
  var fruits = ['apple', 'mango'];

  // Merge two lists in one line
  var groceries = [...veggies, ...fruits, 'bread'];
  print(groceries); // [carrot, pea, apple, mango, bread]

  // Null-aware spread — safe when the list might be null
  List<String>? extras = null;
  var cart = ['milk', ...?extras]; // extras is null, so nothing added
  print(cart); // [milk]

  extras = ['butter', 'eggs'];
  var fullCart = ['milk', ...?extras];
  print(fullCart); // [milk, butter, eggs]
}`,
        },
        collectionIfFor: {
          title: 'Collection if & Collection for',
          code: `void main() {
  bool isLoggedIn = true;

  // collection if — add an item only when a condition is true
  var menu = [
    'Home',
    'Shop',
    if (isLoggedIn) 'My Account', // included
    if (!isLoggedIn) 'Login',     // skipped
    'Contact',
  ];
  print(menu); // [Home, Shop, My Account, Contact]

  // collection for — generate items from a loop
  var squares = [for (int i = 1; i <= 5; i++) i * i];
  print(squares); // [1, 4, 9, 16, 25]

  // Combining both in one literal
  var tags = ['dart', 'flutter'];
  var labels = [
    'all',
    for (var tag in tags) '#\$tag',
    if (isLoggedIn) 'mine',
  ];
  print(labels); // [all, #dart, #flutter, mine]
}`,
        },
      },
    },
  },
  {
    id: 3,
    title: 'Error Handling',
    duration: '30 minutes',
    icon: <Code className='w-6 h-6' />,
    content: {
      description:
        'Handling exceptions prevents your application from crashing during unexpected runtime faults. Dart provides a structured try/on/catch/finally system and allows you to create custom exception types.',
      topics: [
        'throw: Triggers an exception manually.',
        'try: Wraps code that might throw an exception.',
        'on TypeName: Catches a specific type of exception.',
        'catch (e, stackTrace): Captures the exception object and its stack trace.',
        'finally: Always runs, regardless of exception — good for cleanup.',
        'Custom Exception classes: Implement Exception for domain-specific errors.',
        'rethrow: Pass a caught exception up the call stack.',
      ],
      detailedTopics: {
        basicTryCatch: {
          title: 'Basic try / catch / finally',
          code: `void main() {
  try {
    int result = 12 ~/ 0; // Integer division by zero
    print(result);
  } catch (e) {
    print('Caught an error: \$e');
  } finally {
    print('This always runs — good for cleanup.');
  }
}`,
        },
        onKeyword: {
          title: 'Catching Specific Types with on',
          code: `void parseInput(String input) {
  try {
    int value = int.parse(input);
    print('Parsed: \$value');
  } on FormatException catch (e) {
    // Only catches FormatException
    print('Bad format: \${e.message}');
  } on RangeError {
    print('Number out of range');
  } catch (e, stackTrace) {
    // Catches anything else
    print('Unknown error: \$e');
    print('Stack: \$stackTrace');
  } finally {
    print('Parsing attempt complete.');
  }
}

void main() {
  parseInput('42');    // Parsed: 42
  parseInput('hello'); // Bad format: ...
}`,
        },
        throwCustom: {
          title: 'throw and Custom Exceptions',
          code: `// Custom Exception class
class InsufficientFundsException implements Exception {
  final double amount;
  final double balance;

  InsufficientFundsException({required this.amount, required this.balance});

  @override
  String toString() =>
      'InsufficientFunds: Tried to withdraw \$amount but only \$balance available.';
}

void withdraw(double balance, double amount) {
  if (amount > balance) {
    throw InsufficientFundsException(amount: amount, balance: balance);
  }
  print('Withdrew \$amount. Remaining: \${balance - amount}');
}

void main() {
  try {
    withdraw(100.0, 150.0);
  } on InsufficientFundsException catch (e) {
    print(e);
  }
}`,
        },
        rethrow: {
          title: 'Rethrowing Exceptions',
          code: `void processData(String data) {
  try {
    if (data.isEmpty) throw FormatException('Data is empty');
    print('Processing: \$data');
  } catch (e) {
    print('Logging error: \$e');
    rethrow; // Pass the exception up the call stack
  }
}

void main() {
  try {
    processData('');
  } catch (e) {
    print('Main caught: \$e');
  }
}`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Null Safety (Deep Dive)',
    duration: '35 minutes',
    icon: <Play className='w-6 h-6' />,
    content: {
      description:
        "Null safety is one of Dart's most powerful features. It prevents null reference errors at compile time by requiring you to explicitly declare whether a variable can hold null. This results in safer, more predictable code.",
      topics: [
        '? (Nullable Type): Appended to a type to allow null values.',
        '! (Null Assertion): Casts away nullability — crashes if actually null.',
        '?? (If-Null Operator): Returns right-hand value when left is null.',
        '??= (If-Null Assignment): Only assigns if the variable is currently null.',
        '?. (Null-Aware Access): Safely calls a method when object may be null.',
        'late: Non-nullable variable initialized after its declaration.',
        'Practical null safety patterns in real code.',
      ],
      detailedTopics: {
        nullableTypes: {
          title: 'Nullable Types with ?',
          code: `void main() {
  // Non-nullable — MUST be initialized, can never be null
  String nonNullable = 'Hello';

  // Nullable — CAN be null
  String? nullableString;
  print(nullableString); // null

  // Dart compiler enforces this at compile time:
  // String willError; // ERROR: Must be assigned before use
  // nonNullable = null; // ERROR: can't assign null to non-nullable
}`,
        },
        nullCoalescing: {
          title: 'Null Operators: ??, ??=, ?.',
          code: `void main() {
  String? username;

  // ?? — if-null operator: use right side when left is null
  String displayName = username ?? 'Guest';
  print(displayName); // Guest

  // ??= — only assigns if the variable is null
  username ??= 'defaultUser';
  print(username); // defaultUser

  // Now username is non-null, so ??= won't change it
  username ??= 'anotherUser';
  print(username); // defaultUser (unchanged)

  // ?. — null-aware access
  String? city;
  int? length = city?.length; // Safe — doesn't crash
  print(length); // null
}`,
        },
        nullAssertion: {
          title: 'Null Assertion Operator !',
          code: `void main() {
  String? maybeNull = fetchData();

  // Use ! to assert the value is definitely not null
  // If it IS null at runtime → throws LateInitializationError!
  String guaranteed = maybeNull!;
  print(guaranteed.toUpperCase());
}

String? fetchData() {
  return 'some data'; // Simulated data fetch
}

// Best practice: check before asserting
void safe(String? value) {
  if (value != null) {
    print(value.length); // Compiler knows it's non-null here
  }
}`,
        },
        lateKeyword: {
          title: 'late Initialization',
          code: `class DatabaseService {
  // Initialized after the constructor — guaranteed before first use
  late String connectionString;

  void connect(String host) {
    connectionString = 'DB://\$host/mydb';
    print('Connected: \$connectionString');
  }

  void query() {
    // If connectionString is accessed before connect() is called,
    // it throws a LateInitializationError at runtime
    print('Querying \$connectionString');
  }
}

void main() {
  var db = DatabaseService();
  db.connect('localhost');
  db.query();
}`,
        },
        practicalPatterns: {
          title: 'Null Safety Practical Patterns',
          code: `// Pattern 1: Nullable parameter with ?? default
void greet({String? name}) {
  print('Hello, \${name ?? 'Stranger'}!');
}

// Pattern 2: Null-safe method chaining
String? getEmail() => 'alice@email.com';

void main() {
  greet();              // Hello, Stranger!
  greet(name: 'Bob');   // Hello, Bob!

  // Chained null-aware calls
  String? email = getEmail();
  String? domain = email?.split('@').last;
  print(domain?.toUpperCase()); // EMAIL.COM

  // Pattern 3: Guard clause pattern
  String? score;
  if (score == null) return;
  print('Score: \$score'); // Only runs if score is not null
}`,
        },
      },
    },
  },
];

// ─────────────────────────────────────────────────────────
// DAY 3: Object-Oriented Programming in Dart
// ─────────────────────────────────────────────────────────
export const sessionsDay3 = [
  {
    id: 1,
    title: 'Classes & Objects',
    duration: '35 minutes',
    icon: <Box className='w-6 h-6' />,
    content: {
      description:
        'Object-Oriented Programming (OOP) is the backbone of Dart. Everything in Dart is an object. A Class is a blueprint for creating objects — it defines what data (properties) and behavior (methods) objects of that type will have.',
      topics: [
        'Class: A blueprint or template for creating objects.',
        'Object: A concrete instance of a class with real data.',
        'Properties (Instance Variables): Data stored inside a class.',
        'Methods: Functions that belong to a class and operate on its data.',
        'this keyword: Refers to the current instance.',
        'toString() override: Custom string representation of a class.',
      ],
      detailedTopics: {
        classBasics: {
          title: 'Defining a Class and Creating Objects',
          code: `class Person {
  // Properties (instance variables)
  String name;
  int age;

  // Constructor
  Person(this.name, this.age);

  // Method
  void introduce() {
    print('Hi, I am \$name and I am \$age years old.');
  }

  // Override toString for a readable representation
  @override
  String toString() => 'Person(name: \$name, age: \$age)';
}

void main() {
  // Creating objects (instances)
  Person p1 = Person('Alice', 30);
  Person p2 = Person('Bob', 25);

  p1.introduce(); // Hi, I am Alice and I am 30 years old.
  p2.introduce(); // Hi, I am Bob and I am 25 years old.

  print(p1); // Person(name: Alice, age: 30)
}`,
        },
        methods: {
          title: 'Instance Methods and this',
          code: `class Counter {
  int _count = 0; // Private property

  void increment() {
    _count++; // Access via this implicitly
  }

  void incrementBy(int amount) {
    this._count += amount; // Explicit this
  }

  void reset() => _count = 0;

  int get value => _count; // Getter
}

void main() {
  var counter = Counter();
  counter.increment();
  counter.incrementBy(5);
  print(counter.value); // 6
  counter.reset();
  print(counter.value); // 0
}`,
        },
      },
    },
  },
  {
    id: 2,
    title: 'Constructors (All Types)',
    duration: '40 minutes',
    icon: <Layers className='w-6 h-6' />,
    content: {
      description:
        'Dart supports several types of constructors to give you maximum flexibility when creating objects. From simple generative constructors to powerful factory constructors for implementing design patterns.',
      topics: [
        'Generative Constructor: Standard way to instantiate a class.',
        'Shorthand (this.field): Cleaner syntax for initializing properties.',
        'Named Constructor: Multiple ways to create objects — e.g., fromJson().',
        'Constant Constructor: Creates compile-time constant objects.',
        'Factory Constructor: May return cached instances or subtypes.',
        'Initializer List: Initialize properties before the constructor body runs.',
      ],
      detailedTopics: {
        generative: {
          title: 'Generative & Shorthand Constructors',
          code: `class Point {
  double x;
  double y;

  // Standard constructor with body
  Point(double x, double y) {
    this.x = x;
    this.y = y;
  }
}

// Shorthand — same result, less code
class PointShort {
  double x;
  double y;

  // Initializing formal parameters — automatically sets x and y
  PointShort(this.x, this.y);
}

void main() {
  var p = PointShort(3.0, 4.0);
  print('\${p.x}, \${p.y}'); // 3.0, 4.0
}`,
        },
        namedConstructor: {
          title: 'Named Constructors',
          code: `class Temperature {
  double celsius;

  // Standard constructor
  Temperature(this.celsius);

  // Named constructor — create from Fahrenheit
  Temperature.fromFahrenheit(double f) : celsius = (f - 32) / 1.8;

  // Named constructor — absolute zero
  Temperature.absoluteZero() : celsius = -273.15;

  @override
  String toString() => '\${celsius.toStringAsFixed(2)}°C';
}

void main() {
  var t1 = Temperature(100);
  var t2 = Temperature.fromFahrenheit(212);
  var t3 = Temperature.absoluteZero();

  print(t1); // 100.00°C
  print(t2); // 100.00°C
  print(t3); // -273.15°C
}`,
        },
        factoryConstructor: {
          title: 'Factory Constructor (Singleton Pattern)',
          code: `class AppConfig {
  static final AppConfig _instance = AppConfig._internal();

  String theme = 'light';
  String language = 'en';

  // Private generative constructor
  AppConfig._internal();

  // Factory returns the same instance every time
  factory AppConfig() {
    return _instance;
  }
}

void main() {
  var config1 = AppConfig();
  var config2 = AppConfig();

  config1.theme = 'dark';

  // Both variables point to the exact same object
  print(config2.theme); // dark
  print(identical(config1, config2)); // true
}`,
        },
        initializerList: {
          title: 'Initializer List',
          code: `class Circle {
  final double radius;
  final double area;

  // Initializer list runs BEFORE the constructor body
  // Great for final fields that need computation
  Circle(double r)
      : radius = r,
        area = 3.14159 * r * r {
    // Validation in constructor body
    if (radius <= 0) throw ArgumentError('Radius must be positive');
  }
}

void main() {
  var c = Circle(5);
  print('Radius: \${c.radius}, Area: \${c.area.toStringAsFixed(2)}');
  // Radius: 5.0, Area: 78.54
}`,
        },
      },
    },
  },
  {
    id: 3,
    title: 'Inheritance & Polymorphism',
    duration: '40 minutes',
    icon: <Layers className='w-6 h-6' />,
    content: {
      description:
        'Inheritance lets a class acquire properties and behavior from another class, promoting reuse. Polymorphism allows objects of different types to be treated through a shared interface, with each type responding differently.',
      topics: [
        'extends: Creates a subclass that inherits from a superclass.',
        'super(): Calls the parent class constructor.',
        'super.method(): Calls a parent class method.',
        "@override: Marks that a method overrides the parent's version.",
        'Polymorphism: Treating subclass instances as their parent type.',
        'abstract class as a base for polymorphic hierarchies.',
      ],
      detailedTopics: {
        inheritance: {
          title: 'extends and super',
          code: `class Animal {
  String name;

  Animal(this.name);

  void breathe() => print('\$name is breathing...');

  void makeSound() => print('\$name makes a sound.');
}

class Dog extends Animal {
  String breed;

  // Call parent constructor via super()
  Dog(String name, this.breed) : super(name);

  // Override parent method
  @override
  void makeSound() => print('\$name barks: Woof!');

  void fetch() => print('\$name fetches the ball!');
}

void main() {
  var dog = Dog('Rex', 'Labrador');
  dog.breathe();    // Rex is breathing... (inherited)
  dog.makeSound();  // Rex barks: Woof! (overridden)
  dog.fetch();      // Rex fetches the ball! (own method)
}`,
        },
        polymorphism: {
          title: 'Polymorphism in Action',
          code: `abstract class Shape {
  double area();
  void describe() =>
      print('I am a \$runtimeType with area \${area().toStringAsFixed(2)}');
}

class Circle extends Shape {
  double radius;
  Circle(this.radius);

  @override
  double area() => 3.14159 * radius * radius;
}

class Rectangle extends Shape {
  double width, height;
  Rectangle(this.width, this.height);

  @override
  double area() => width * height;
}

void main() {
  // Polymorphism — one list holds different subtypes
  List<Shape> shapes = [Circle(5), Rectangle(4, 6)];

  for (var shape in shapes) {
    shape.describe(); // Each calls its own area()
  }
  // I am a Circle with area 78.54
  // I am a Rectangle with area 24.00
}`,
        },
        superMethod: {
          title: 'Calling super Methods',
          code: `class Vehicle {
  String brand;
  Vehicle(this.brand);

  void start() => print('\$brand engine starts...');
}

class ElectricCar extends Vehicle {
  int batteryLevel;

  ElectricCar(String brand, this.batteryLevel) : super(brand);

  @override
  void start() {
    super.start(); // Call parent's start()
    print('Electric motor activates silently. Battery: \$batteryLevel%');
  }
}

void main() {
  var tesla = ElectricCar('Tesla', 90);
  tesla.start();
  // Tesla engine starts...
  // Electric motor activates silently. Battery: 90%
}`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Encapsulation & Abstraction',
    duration: '35 minutes',
    icon: <Box className='w-6 h-6' />,
    content: {
      description:
        "Encapsulation hides internal data and exposes only what's necessary through a controlled interface. Abstraction hides complex implementation details, showing only essential functionality through abstract classes and interfaces.",
      topics: [
        'Private members (_prefix): Restrict access to within the library.',
        'Getters (get): Computed or read-only property access.',
        'Setters (set): Controlled write access with validation logic.',
        'abstract class: Cannot be instantiated — defines a contract.',
        'Abstract methods: Must be implemented by every concrete subclass.',
        'implements: A class must implement ALL methods of the interface.',
        'Concrete methods in abstract classes: Shared default implementation.',
      ],
      detailedTopics: {
        encapsulation: {
          title: 'Private Members, Getters & Setters',
          code: `class BankAccount {
  final String owner;
  double _balance = 0.0; // Private — prefix _

  BankAccount(this.owner);

  // Getter — controlled read access
  double get balance => _balance;

  // Setter — with validation
  set balance(double value) {
    if (value < 0) throw ArgumentError('Balance cannot be negative');
    _balance = value;
  }

  void deposit(double amount) {
    if (amount <= 0) throw ArgumentError('Deposit must be positive');
    _balance += amount;
    print('Deposited \$amount. New balance: \$_balance');
  }

  bool withdraw(double amount) {
    if (amount > _balance) {
      print('Insufficient funds!');
      return false;
    }
    _balance -= amount;
    return true;
  }
}

void main() {
  var account = BankAccount('Alice');
  account.deposit(500);
  account.withdraw(200);
  print('Balance: \${account.balance}'); // 300.0
  // account._balance = 9999; // ERROR: private
}`,
        },
        abstractClass: {
          title: 'Abstract Classes',
          code: `abstract class Drawable {
  // Abstract method — no body, must be overridden
  void draw();

  // Concrete method — shared default implementation
  void resize(double factor) {
    print('Resizing by factor \$factor');
  }
}

class Circle extends Drawable {
  double radius;
  Circle(this.radius);

  @override
  void draw() => print('Drawing circle with radius \$radius');
}

class Square extends Drawable {
  double side;
  Square(this.side);

  @override
  void draw() => print('Drawing square with side \$side');
}

void main() {
  // var d = Drawable(); // ERROR: Cannot instantiate abstract class
  List<Drawable> shapes = [Circle(3), Square(5)];
  for (var s in shapes) {
    s.draw();
    s.resize(2.0);
  }
}`,
        },
        implements: {
          title: 'implements (Interface)',
          code: `// Any class can act as an interface in Dart
class Logger {
  void log(String message) => print('[LOG] \$message');
}

class Serializable {
  String toJson() => '{}';
}

// implements requires implementing ALL methods from every interface
class User implements Logger, Serializable {
  String name;
  User(this.name);

  @override
  void log(String message) {
    print('[USER LOG] \$message');
  }

  @override
  String toJson() => '{"name": "\$name"}';
}

void main() {
  var user = User('Alice');
  user.log('Logged in');         // [USER LOG] Logged in
  print(user.toJson());          // {"name": "Alice"}
}`,
        },
      },
    },
  },
  {
    id: 5,
    title: 'Mixins & Enums',
    duration: '35 minutes',
    icon: <Layers className='w-6 h-6' />,
    content: {
      description:
        'Mixins allow you to reuse code across multiple class hierarchies without traditional inheritance. Enums define a fixed set of named constant values — great for state machines, categories, and status fields.',
      topics: [
        'mixin keyword: Defines reusable behavior without a full class.',
        'with keyword: Applies one or more mixins to a class.',
        'Multiple mixins: A class can apply multiple mixins simultaneously.',
        'on keyword: Restricts which classes a mixin can be applied to.',
        'Enums: A fixed set of named constants with index and name.',
        'Enhanced Enums (Dart 3): Enums with fields, methods, and constructors.',
      ],
      detailedTopics: {
        mixins: {
          title: 'Mixins with mixin and with',
          code: `mixin Swimmer {
  void swim() => print('\$runtimeType is swimming!');
}

mixin Flyer {
  void fly() => print('\$runtimeType is flying!');
}

mixin Runner {
  void run() => print('\$runtimeType is running!');
}

class Duck with Swimmer, Flyer, Runner {}
class Dog with Swimmer, Runner {}

abstract class Animal {
  String name;
  Animal(this.name);
}

class FlyingFish extends Animal with Swimmer, Flyer {
  FlyingFish(super.name);
}

void main() {
  var duck = Duck();
  duck.swim(); // Duck is swimming!
  duck.fly();  // Duck is flying!
  duck.run();  // Duck is running!

  var fish = FlyingFish('Nemo');
  fish.swim(); // FlyingFish is swimming!
  fish.fly();  // FlyingFish is flying!
}`,
        },
        basicEnums: {
          title: 'Basic Enums',
          code: `enum Direction { north, south, east, west }

enum Status {
  pending,
  inProgress,
  completed,
  cancelled,
}

void main() {
  var task = Status.inProgress;

  // switch with exhaustive pattern matching (Dart 3)
  switch (task) {
    case Status.pending:
      print('Not started yet');
    case Status.inProgress:
      print('Working on it!');
    case Status.completed:
      print('Done!');
    case Status.cancelled:
      print('Cancelled.');
  }

  // Enum built-in properties
  print(task.name);     // inProgress
  print(task.index);    // 1
  print(Status.values); // all values
}`,
        },
        enhancedEnums: {
          title: 'Enhanced Enums (Dart 3)',
          code: `enum HttpStatus {
  ok(200, 'OK'),
  notFound(404, 'Not Found'),
  serverError(500, 'Internal Server Error'),
  unauthorized(401, 'Unauthorized');

  final int code;
  final String message;

  // Const constructor for enum
  const HttpStatus(this.code, this.message);

  // Methods on enum
  bool get isSuccess => code >= 200 && code < 300;
  bool get isError => code >= 400;

  @override
  String toString() => '\$code \$message';
}

void main() {
  var response = HttpStatus.ok;
  print(response);           // 200 OK
  print(response.isSuccess); // true
  print(response.code);      // 200

  var error = HttpStatus.notFound;
  print(error.isError);      // true
  print(error.message);      // Not Found
}`,
        },
      },
    },
  },
];
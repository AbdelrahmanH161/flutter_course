import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Settings,
  Database,
  Smartphone,
  Package,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'Introduction to BLoC Pattern',
    duration: '1 Hour',
    icon: <Settings className='w-6 h-6' />,
    content: {
      description:
        'Learn the fundamentals of the BLoC (Business Logic Component) pattern. Understand how it separates business logic from UI, making your Flutter apps more testable, maintainable, and scalable.',
      topics: [
        'What is BLoC and why use it?',
        'Understanding Events, States, and Business Logic',
        'BLoC vs setState() and Provider',
        'Advantages and disadvantages of BLoC',
        'When to use BLoC vs other state management solutions',
      ],
      detailedTopics: {
        blocBasics: {
          title: 'What is BLoC?',
          code: `// BLoC = Business Logic Component
// It's a design pattern that separates business logic from UI

// Key Concepts:
// 1. Events: Inputs to the BLoC (user actions, system events)
// 2. States: Outputs from the BLoC (current app state)
// 3. Business Logic: Processing that happens between events and states

// Flow: UI → Event → BLoC → State → UI

// Example: Counter BLoC
abstract class CounterEvent {}
class CounterIncremented extends CounterEvent {}
class CounterDecremented extends CounterEvent {}

abstract class CounterState {}
class CounterInitial extends CounterState {}
class CounterLoaded extends CounterState {
  final int count;
  CounterLoaded(this.count);
}

class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterInitial()) {
    on<CounterIncremented>((event, emit) {
      // Business logic here
      if (state is CounterLoaded) {
        emit(CounterLoaded((state as CounterLoaded).count + 1));
      } else {
        emit(CounterLoaded(1));
      }
    });
    
    on<CounterDecremented>((event, emit) {
      if (state is CounterLoaded) {
        final currentCount = (state as CounterLoaded).count;
        if (currentCount > 0) {
          emit(CounterLoaded(currentCount - 1));
        }
      }
    });
  }
}`,
        },
        advantagesDisadvantages: {
          title: 'Advantages & Disadvantages',
          code: `// ADVANTAGES ✅

// 1. Separation of Concerns
// - Business logic is separate from UI
// - Easier to test business logic independently
// - UI becomes a pure function of state

// 2. Predictable State Management
// - Unidirectional data flow
// - State changes are traceable
// - Easy to debug and reason about

// 3. Testability
// - Business logic can be unit tested
// - No need for widget testing for logic
// - Mock states and events easily

// 4. Reusability
// - Same BLoC can be used across multiple screens
// - Business logic is platform agnostic
// - Easy to share between Flutter and Dart web

// 5. Performance
// - Only rebuilds widgets that depend on specific states
// - Efficient state management
// - Built-in debouncing and throttling

// DISADVANTAGES ❌

// 1. Boilerplate Code
// - Requires creating separate files for events, states, and BLoC
// - More files to manage
// - Steeper learning curve initially

// 2. Complexity for Simple Use Cases
// - Overkill for simple state management
// - setState() might be sufficient for basic apps
// - Provider might be simpler for moderate complexity

// 3. Learning Curve
// - New concepts to understand
// - Different mental model from setState()
// - Requires understanding streams and reactive programming

// 4. File Organization
// - Need to organize many files
// - Requires good project structure
// - Can become messy without proper organization

// WHEN TO USE BLoC 🤔

// Use BLoC when:
// - Complex business logic
// - Multiple screens sharing state
// - Need for testability
// - Building large, scalable apps
// - Team development (clear separation)

// Don't use BLoC when:
// - Simple counter or toggle
// - Single screen app
// - Prototype or MVP
// - Team unfamiliar with reactive programming`,
        },
      },
    },
  },
  {
    id: 2,
    title: 'Cubit: The Simpler BLoC',
    duration: '1 Hour',
    icon: <Database className='w-6 h-6' />,
    content: {
      description:
        'Explore Cubit, a simpler alternative to BLoC that eliminates the need for events. Learn when to use Cubit over BLoC and how to implement state management with less boilerplate.',
      topics: [
        'What is Cubit and how it differs from BLoC',
        'Cubit vs BLoC: When to use which',
        'Setting up flutter_bloc package',
        'Creating and using Cubits',
        'Best practices for Cubit implementation',
      ],
      detailedTopics: {
        cubitBasics: {
          title: 'What is Cubit?',
          code: `// Cubit is a simpler version of BLoC
// Instead of Events, it uses direct function calls
// Less boilerplate, easier to understand

// Key Differences:
// BLoC: UI → Event → BLoC → State → UI
// Cubit: UI → Function → Cubit → State → UI

// Example: Counter Cubit
class CounterCubit extends Cubit<int> {
  // Initial state is 0
  CounterCubit() : super(0);

  // Direct function calls (no events needed)
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
  void reset() => emit(0);
  
  // Can have more complex logic
  void incrementBy(int value) {
    if (value > 0) {
      emit(state + value);
    }
  }
}

// Usage in UI
class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocBuilder<CounterCubit, int>(
        builder: (context, count) {
          return Text('Count: $count');
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Direct function call - no events!
          context.read<CounterCubit>().increment();
        },
        child: Icon(Icons.add),
      ),
    );
  }
}`,
        },
        cubitVsBloc: {
          title: 'Cubit vs BLoC Comparison',
          code: `// CUBIT - Simpler Approach
class CounterCubit extends Cubit<int> {
  CounterCubit() : super(0);
  
  void increment() => emit(state + 1);
  void decrement() => emit(state - 1);
}

// Usage
context.read<CounterCubit>().increment();

// BLOC - More Structured Approach
abstract class CounterEvent {}
class CounterIncremented extends CounterEvent {}
class CounterDecremented extends CounterEvent {}

class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<CounterIncremented>((event, emit) => emit(state + 1));
    on<CounterDecremented>((event, emit) => emit(state - 1));
  }
}

// Usage
context.read<CounterBloc>().add(CounterIncremented());

// WHEN TO USE CUBIT ✅
// - Simple to moderate state management
// - Direct function calls are sufficient
// - Less boilerplate preferred
// - Team new to BLoC pattern
// - Prototyping or MVP

// WHEN TO USE BLOC ✅
// - Complex state machines
// - Need to track why state changed
// - Multiple events can lead to same state
// - Advanced debugging and logging
// - Large, complex applications

// PERFORMANCE
// Both have similar performance
// Cubit is slightly faster (no event processing)
// BLoC has better traceability
// Choose based on complexity, not performance`,
        },
      },
    },
  },
  {
    id: 3,
    title: 'Complete Counter Example with Cubit',
    duration: '1 Hour',
    icon: <Smartphone className='w-6 h-6' />,
    content: {
      description:
        'Build a complete counter application using Cubit. Learn the full implementation from setup to UI integration, including proper state management and error handling.',
      topics: [
        'Setting up flutter_bloc package',
        'Creating CounterCubit with proper state management',
        'Implementing UI with BlocBuilder and BlocListener',
        'Adding loading states and error handling',
        'Testing the counter functionality',
      ],
      detailedTopics: {
        counterSetup: {
          title: 'Project Setup',
          code: `# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5  # For value equality

dev_dependencies:
  flutter_test:
    sdk: flutter
  bloc_test: ^9.1.5  # For testing BLoCs/Cubits

# Run: flutter pub get`,
        },
        counterCubit: {
          title: 'Counter Cubit Implementation',
          code: `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

// State class for better type safety
class CounterState extends Equatable {
  final int count;
  final bool isLoading;
  final String? error;

  const CounterState({
    this.count = 0,
    this.isLoading = false,
    this.error,
  });

  // Copy with method for immutable updates
  CounterState copyWith({
    int? count,
    bool? isLoading,
    String? error,
  }) {
    return CounterState(
      count: count ?? this.count,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }

  @override
  List<Object?> get props => [count, isLoading, error];
}

// The Cubit
class CounterCubit extends Cubit<CounterState> {
  CounterCubit() : super(const CounterState());

  // Increment counter
  void increment() {
    emit(state.copyWith(isLoading: true, error: null));
    
    // Simulate some processing
    Future.delayed(Duration(milliseconds: 500), () {
      emit(state.copyWith(
        count: state.count + 1,
        isLoading: false,
      ));
    });
  }

  // Decrement counter
  void decrement() {
    if (state.count > 0) {
      emit(state.copyWith(isLoading: true, error: null));
      
      Future.delayed(Duration(milliseconds: 500), () {
        emit(state.copyWith(
          count: state.count - 1,
          isLoading: false,
        ));
      });
    }
  }

  // Reset counter
  void reset() {
    emit(state.copyWith(
      count: 0,
      isLoading: false,
      error: null,
    ));
  }

  // Increment by specific amount
  void incrementBy(int amount) {
    if (amount > 0) {
      emit(state.copyWith(isLoading: true, error: null));
      
      Future.delayed(Duration(milliseconds: 500), () {
        emit(state.copyWith(
          count: state.count + amount,
          isLoading: false,
        ));
      });
    } else {
      emit(state.copyWith(error: 'Amount must be positive'));
    }
  }
}`,
        },
        counterUI: {
          title: 'Counter UI Implementation',
          code: `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Counter with Cubit',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: BlocProvider(
        create: (context) => CounterCubit(),
        child: CounterPage(),
      ),
    );
  }
}

class CounterPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Counter with Cubit'),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Display current count
            BlocBuilder<CounterCubit, CounterState>(
              builder: (context, state) {
                return Column(
                  children: [
                    Text(
                      'Count',
                      style: Theme.of(context).textTheme.headlineSmall,
                    ),
                    SizedBox(height: 16),
                    Text(
                      '$ {state.count}',
                      style: Theme.of(context).textTheme.displayLarge?.copyWith(
                        color: Colors.blue,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 16),
                    // Loading indicator
                    if (state.isLoading)
                      CircularProgressIndicator()
                    else if (state.error != null)
                      Text(
                        state.error!,
                        style: TextStyle(color: Colors.red),
                      ),
                  ],
                );
              },
            ),
            SizedBox(height: 32),
            // Action buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                FloatingActionButton(
                  onPressed: () => context.read<CounterCubit>().decrement(),
                  child: Icon(Icons.remove),
                  heroTag: "decrement",
                ),
                FloatingActionButton(
                  onPressed: () => context.read<CounterCubit>().reset(),
                  child: Icon(Icons.refresh),
                  heroTag: "reset",
                ),
                FloatingActionButton(
                  onPressed: () => context.read<CounterCubit>().increment(),
                  child: Icon(Icons.add),
                  heroTag: "increment",
                ),
              ],
            ),
            SizedBox(height: 16),
            // Increment by 5 button
            ElevatedButton(
              onPressed: () => context.read<CounterCubit>().incrementBy(5),
              child: Text('Increment by 5'),
            ),
          ],
        ),
      ),
    );
  }
}`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Todo List with Cubit',
    duration: '1 Hour',
    icon: <Package className='w-6 h-6' />,
    content: {
      description:
        'Build a complete todo list application using Cubit. Learn to manage complex state with lists, implement CRUD operations, and handle different UI states effectively.',
      topics: [
        'Creating Todo model and state classes',
        'Implementing TodoCubit with CRUD operations',
        'Building responsive todo list UI',
        'Adding filtering and search functionality',
        'Implementing proper error handling and loading states',
      ],
      detailedTopics: {
        todoModel: {
          title: 'Todo Model and State',
          code: `import 'package:equatable/equatable.dart';

// Todo model
class Todo extends Equatable {
  final String id;
  final String title;
  final String description;
  final bool isCompleted;
  final DateTime createdAt;

  const Todo({
    required this.id,
    required this.title,
    required this.description,
    required this.isCompleted,
    required this.createdAt,
  });

  Todo copyWith({
    String? id,
    String? title,
    String? description,
    bool? isCompleted,
    DateTime? createdAt,
  }) {
    return Todo(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  List<Object?> get props => [id, title, description, isCompleted, createdAt];
}

// Filter enum
enum TodoFilter { all, completed, pending }

// Todo state
class TodoState extends Equatable {
  final List<Todo> todos;
  final TodoFilter filter;
  final bool isLoading;
  final String? error;

  const TodoState({
    this.todos = const [],
    this.filter = TodoFilter.all,
    this.isLoading = false,
    this.error,
  });

  TodoState copyWith({
    List<Todo>? todos,
    TodoFilter? filter,
    bool? isLoading,
    String? error,
  }) {
    return TodoState(
      todos: todos ?? this.todos,
      filter: filter ?? this.filter,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }

  // Computed properties
  List<Todo> get filteredTodos {
    switch (filter) {
      case TodoFilter.completed:
        return todos.where((todo) => todo.isCompleted).toList();
      case TodoFilter.pending:
        return todos.where((todo) => !todo.isCompleted).toList();
      case TodoFilter.all:
      default:
        return todos;
    }
  }

  int get completedCount => todos.where((todo) => todo.isCompleted).length;
  int get pendingCount => todos.where((todo) => !todo.isCompleted).length;

  @override
  List<Object?> get props => [todos, filter, isLoading, error];
}`,
        },
        todoCubit: {
          title: 'Todo Cubit Implementation',
          code: `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:uuid/uuid.dart';

class TodoCubit extends Cubit<TodoState> {
  TodoCubit() : super(const TodoState());

  // Add new todo
  void addTodo(String title, String description) {
    if (title.trim().isEmpty) {
      emit(state.copyWith(error: 'Title cannot be empty'));
      return;
    }

    final todo = Todo(
      id: const Uuid().v4(),
      title: title.trim(),
      description: description.trim(),
      isCompleted: false,
      createdAt: DateTime.now(),
    );

    emit(state.copyWith(
      todos: [...state.todos, todo],
      error: null,
    ));
  }

  // Update todo
  void updateTodo(String id, String title, String description) {
    if (title.trim().isEmpty) {
      emit(state.copyWith(error: 'Title cannot be empty'));
      return;
    }

    final updatedTodos = state.todos.map((todo) {
      if (todo.id == id) {
        return todo.copyWith(
          title: title.trim(),
          description: description.trim(),
        );
      }
      return todo;
    }).toList();

    emit(state.copyWith(
      todos: updatedTodos,
      error: null,
    ));
  }

  // Toggle todo completion
  void toggleTodo(String id) {
    final updatedTodos = state.todos.map((todo) {
      if (todo.id == id) {
        return todo.copyWith(isCompleted: !todo.isCompleted);
      }
      return todo;
    }).toList();

    emit(state.copyWith(todos: updatedTodos));
  }

  // Delete todo
  void deleteTodo(String id) {
    final updatedTodos = state.todos.where((todo) => todo.id != id).toList();
    emit(state.copyWith(todos: updatedTodos));
  }

  // Set filter
  void setFilter(TodoFilter filter) {
    emit(state.copyWith(filter: filter));
  }

  // Clear completed todos
  void clearCompleted() {
    final updatedTodos = state.todos.where((todo) => !todo.isCompleted).toList();
    emit(state.copyWith(todos: updatedTodos));
  }

  // Mark all as completed
  void markAllCompleted() {
    final updatedTodos = state.todos.map((todo) {
      return todo.copyWith(isCompleted: true);
    }).toList();

    emit(state.copyWith(todos: updatedTodos));
  }

  // Clear error
  void clearError() {
    emit(state.copyWith(error: null));
  }
}`,
        },
        todoUI: {
          title: 'Todo List UI Implementation',
          code: `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TodoPage extends StatefulWidget {
  @override
  _TodoPageState createState() => _TodoPageState();
}

class _TodoPageState extends State<TodoPage> {
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Todo List with Cubit'),
        centerTitle: true,
        actions: [
          PopupMenuButton<TodoFilter>(
            onSelected: (filter) {
              context.read<TodoCubit>().setFilter(filter);
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                value: TodoFilter.all,
                child: Text('All'),
              ),
              PopupMenuItem(
                value: TodoFilter.completed,
                child: Text('Completed'),
              ),
              PopupMenuItem(
                value: TodoFilter.pending,
                child: Text('Pending'),
              ),
            ],
          ),
        ],
      ),
      body: Column(
        children: [
          // Add todo form
          Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              children: [
                TextField(
                  controller: _titleController,
                  decoration: InputDecoration(
                    labelText: 'Todo Title',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 8),
                TextField(
                  controller: _descriptionController,
                  decoration: InputDecoration(
                    labelText: 'Description (optional)',
                    border: OutlineInputBorder(),
                  ),
                ),
                SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: _addTodo,
                        child: Text('Add Todo'),
                      ),
                    ),
                    SizedBox(width: 8),
                    ElevatedButton(
                      onPressed: () {
                        context.read<TodoCubit>().markAllCompleted();
                      },
                      child: Text('Mark All Done'),
                    ),
                  ],
                ),
              ],
            ),
          ),
          // Todo list
          Expanded(
            child: BlocBuilder<TodoCubit, TodoState>(
              builder: (context, state) {
                if (state.isLoading) {
                  return Center(child: CircularProgressIndicator());
                }

                if (state.error != null) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          state.error!,
                          style: TextStyle(color: Colors.red),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            context.read<TodoCubit>().clearError();
                          },
                          child: Text('Dismiss'),
                        ),
                      ],
                    ),
                  );
                }

                if (state.filteredTodos.isEmpty) {
                  return Center(
                    child: Text(
                      state.todos.isEmpty
                          ? 'No todos yet. Add one above!'
                          : 'No $ {state.filter.name} todos found.',
                      style: TextStyle(fontSize: 16),
                    ),
                  );
                }

                return ListView.builder(
                  itemCount: state.filteredTodos.length,
                  itemBuilder: (context, index) {
                    final todo = state.filteredTodos[index];
                    return TodoItem(todo: todo);
                  },
                );
              },
            ),
          ),
          // Stats
          BlocBuilder<TodoCubit, TodoState>(
            builder: (context, state) {
              return Container(
                padding: EdgeInsets.all(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Text('Total: $ {state.todos.length}'),
                    Text('Completed: $ {state.completedCount}'),
                    Text('Pending: $ {state.pendingCount}'),
                    if (state.completedCount > 0)
                      TextButton(
                        onPressed: () {
                          context.read<TodoCubit>().clearCompleted();
                        },
                        child: Text('Clear Completed'),
                      ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  void _addTodo() {
    final title = _titleController.text;
    final description = _descriptionController.text;
    
    context.read<TodoCubit>().addTodo(title, description);
    
    _titleController.clear();
    _descriptionController.clear();
  }
}

class TodoItem extends StatelessWidget {
  final Todo todo;

  const TodoItem({Key? key, required this.todo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: ListTile(
        leading: Checkbox(
          value: todo.isCompleted,
          onChanged: (_) {
            context.read<TodoCubit>().toggleTodo(todo.id);
          },
        ),
        title: Text(
          todo.title,
          style: TextStyle(
            decoration: todo.isCompleted
                ? TextDecoration.lineThrough
                : TextDecoration.none,
          ),
        ),
        subtitle: todo.description.isNotEmpty
            ? Text(todo.description)
            : null,
        trailing: IconButton(
          icon: Icon(Icons.delete, color: Colors.red),
          onPressed: () {
            context.read<TodoCubit>().deleteTodo(todo.id);
          },
        ),
        onTap: () {
          _showEditDialog(context);
        },
      ),
    );
  }

  void _showEditDialog(BuildContext context) {
    final titleController = TextEditingController(text: todo.title);
    final descriptionController = TextEditingController(text: todo.description);

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Edit Todo'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              decoration: InputDecoration(labelText: 'Title'),
            ),
            TextField(
              controller: descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              context.read<TodoCubit>().updateTodo(
                todo.id,
                titleController.text,
                descriptionController.text,
              );
              Navigator.pop(context);
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }
}`,
        },
      },
    },
  },
];

const Day8 = () => {
  const [activeSession, setActiveSession] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <main>
        <Suspense fallback={<Loading />}>
          {/* Hero Section */}
          <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            <div className='absolute inset-0 opacity-10'>
              <div className='absolute top-20 left-20 w-72 h-72 bg-[#02569B] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
              <div className='absolute top-40 right-20 w-72 h-72 bg-[#13B9FD] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
              <div className='absolute -bottom-8 left-40 w-72 h-72 bg-[#0175C2] rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
            </div>

            <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}>
                <h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
                  Day 8
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
                  BLoC & Flutter BLoC
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Master the BLoC pattern and Cubit for scalable state management in Flutter. 
                  Learn to build maintainable, testable applications with clean architecture.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#0175C2] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore BLoC & State Management
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown className='w-6 h-6 text-gray-400' />
            </motion.div>
          </section>

          {/* Main Content */}
          <section
            id='content'
            ref={contentRef}
            className='py-20 px-4'>
            <div className='max-w-6xl mx-auto'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center mb-16'>
                <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                  Today's Sessions
                </h3>
                <p className='text-gray-600 dark:text-gray-300 text-lg'>
                  4 hours to master BLoC pattern, Cubit, and advanced state management in Flutter.
                </p>
              </motion.div>

              <div className='space-y-8'>
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
                    <div
                      className='p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
                      onClick={() =>
                        setActiveSession(
                          activeSession === session.id ? null : session.id
                        )
                      }>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                          <div className='p-3 bg-[#02569B]/20 rounded-xl text-[#02569B]'>
                            {session.icon}
                          </div>
                          <div>
                            <h4 className='text-xl font-semibold text-gray-900 dark:text-white'>
                              {session.title}
                            </h4>
                            <div className='flex items-center gap-4 mt-1'>
                              <span className='flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm'>
                                <Clock className='w-4 h-4' />
                                {session.duration}
                              </span>
                              <span className='text-gray-500 dark:text-gray-400'>
                                Session {session.id}
                              </span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{
                            rotate: activeSession === session.id ? 180 : 0,
                          }}
                          transition={{ duration: 0.3 }}>
                          <ChevronDown className='w-6 h-6 text-gray-400' />
                        </motion.div>
                      </div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: activeSession === session.id ? 'auto' : 0,
                        opacity: activeSession === session.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden'>
                      <div className='px-6 pb-6 space-y-6'>
                        <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                          {session.content.description}
                        </p>

                        <div>
                          <h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                            Key Topics:
                          </h5>
                          <ul className='space-y-2'>
                            {session.content.topics.map((topic, topicIndex) => (
                              <li
                                key={topicIndex}
                                className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                                <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {session.content.detailedTopics && (
                          <div className='space-y-4 mt-6'>
                            {Object.values(session.content.detailedTopics).map(
                              (topic, index) => (
                                <div
                                  key={index}
                                  className='bg-gray-50 dark:bg-gray-700 rounded-xl p-4'>
                                  <h6 className='text-md font-semibold text-gray-900 dark:text-white mb-2'>
                                    {topic.title}
                                  </h6>
                                  <Suspense fallback={<Loading />}>
                                    <SyntaxHighlighter
                                      language='dart'
                                      style={tomorrow}
                                      customStyle={{
                                        background: 'transparent',
                                        fontSize: '14px',
                                        borderRadius: '8px',
                                      }}>
                                      {topic.code}
                                    </SyntaxHighlighter>
                                  </Suspense>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-12'>
                <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
                  Day 8 Summary
                </h3>
                <div className='grid md:grid-cols-2 gap-8'>
                  <div>
                    <h4 className='text-xl font-semibold text-[#02569B] mb-4'>
                      Key Takeaways
                    </h4>
                    <ul className='space-y-3'>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Master the BLoC pattern for clean separation of business logic and UI.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Use Cubit for simpler state management with less boilerplate code.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Build scalable, testable Flutter applications with proper state management.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Implement complex state management with lists, filtering, and error handling.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      You've mastered BLoC and state management! Next steps include advanced Flutter topics like 
                      custom animations, platform-specific features, Firebase integration, and building production-ready apps.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Continue Learning
                      <ArrowRight className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-8'>
                <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
                  📝 Hands-on Exercise
                </h3>

                {/* BLoC Shopping Cart Task */}
                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      🛒
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Task: Shopping Cart with BLoC/Cubit
                    </h5>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Objective
                    </h6>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Build a shopping cart application using BLoC/Cubit for state management. 
                      Implement product listing, cart management, and order processing with proper state handling.
                    </p>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
                      Requirements
                    </h6>

                    <div className='space-y-4'>
                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          1. Product Management
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• Create Product model (id, name, price, image, description)</li>
                          <li>• Implement ProductCubit to manage product list</li>
                          <li>• Add loading states and error handling</li>
                          <li>• Fetch products from API or use mock data</li>
                        </ul>
                      </div>

                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          2. Cart Management
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• Create CartItem model (product, quantity)</li>
                          <li>• Implement CartCubit with add/remove/update operations</li>
                          <li>• Calculate total price and item count</li>
                          <li>• Persist cart state with SharedPreferences</li>
                        </ul>
                      </div>

                      <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                        <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
                          3. UI Implementation
                        </h6>
                        <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                          <li>• Product list screen with search and filtering</li>
                          <li>• Cart screen with quantity controls</li>
                          <li>• Checkout screen with order summary</li>
                          <li>• Use BlocBuilder and BlocListener appropriately</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Example Flow
                    </h6>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• User opens app → ProductCubit loads products</li>
                        <li>• User taps "Add to Cart" → CartCubit adds item</li>
                        <li>• User views cart → See all items with quantities</li>
                        <li>• User proceeds to checkout → Order processing</li>
                        <li>• Cart persists between app sessions</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      👉 Bonus Challenge
                    </h6>
                    <div className='bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• Add product categories with filtering</li>
                        <li>• Implement wishlist functionality</li>
                        <li>• Add order history with BLoC</li>
                        <li>• Create admin panel for product management</li>
                        <li>• Add push notifications for order updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </Suspense>
      </main>
    </div>
  );
};

export default Day8;

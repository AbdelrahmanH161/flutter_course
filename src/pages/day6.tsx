import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle,
  Clock,
  Palette,
  MousePointerClick,
  List,
  LayoutGrid,
  ArrowRight,
} from 'lucide-react';

import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter'));

const Loading = () => <div>Loading...</div>;

const sessions = [
  {
    id: 1,
    title: 'ThemeData & Material Design',
    duration: '1 Hour',
    icon: <Palette className='w-6 h-6' />,
    content: {
      description:
        'Centralize your app look-and-feel with ThemeData: colorScheme, textTheme, and component themes so every screen stays consistent.',
      topics: [
        'ThemeData and MaterialApp theme',
        'ColorScheme and TextTheme',
        'Component themes (AppBar, InputDecoration, Buttons)',
        'Applying Theme.of(context) in widgets',
        'Light theme setup for the whole app',
      ],
      detailedTopics: {
        themeSetup: {
          title: 'ThemeData Configuration',
          code: `void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.indigo,
          brightness: Brightness.light,
        ),
        textTheme: TextTheme(
          headlineMedium: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
          bodyLarge: TextStyle(fontSize: 16),
        ),
        appBarTheme: AppBarTheme(
          centerTitle: true,
          elevation: 0,
        ),
        inputDecorationTheme: InputDecorationTheme(
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
        ),
      ),
      home: HomePage(),
    );
  }
}`,
        },
        usingTheme: {
          title: 'Using Theme in Widgets',
          code: `class ThemedCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colors = theme.colorScheme;

    return Card(
      color: colors.surface,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Featured Product',
              style: theme.textTheme.headlineMedium?.copyWith(
                color: colors.primary,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Styled with ThemeData — no hard-coded colors.',
              style: theme.textTheme.bodyLarge,
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {},
              child: Text('Shop Now'),
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
    id: 2,
    title: 'Buttons & Text Input',
    duration: '1 Hour',
    icon: <MousePointerClick className='w-6 h-6' />,
    content: {
      description:
        'Use the right button for each action priority, then collect user input with TextField and TextFormField — controllers, decoration, keyboard types, and validators.',
      topics: [
        'ElevatedButton, TextButton, OutlinedButton',
        'IconButton, FAB, DropdownButton',
        'TextField with controller and decoration',
        'TextFormField with validator',
        'keyboardType and onChanged',
      ],
      detailedTopics: {
        buttons: {
          title: 'Flutter Button Types',
          code: `class ButtonsDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Buttons')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.add),
      ),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Primary action
            ElevatedButton(
              onPressed: () {},
              child: Text('ElevatedButton — primary'),
            ),
            SizedBox(height: 12),

            // Secondary action
            OutlinedButton(
              onPressed: () {},
              child: Text('OutlinedButton — secondary'),
            ),
            SizedBox(height: 12),

            // Lowest emphasis
            TextButton(
              onPressed: () {},
              child: Text('TextButton — tertiary'),
            ),
            SizedBox(height: 12),

            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  icon: Icon(Icons.favorite),
                  onPressed: () {},
                ),
                DropdownButton<String>(
                  value: 'EGP',
                  items: ['EGP', 'USD', 'EUR']
                      .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                      .toList(),
                  onChanged: (v) {},
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/*
Priority guide:
  Elevated > Outlined > Text
  FAB for the single main page action
*/`,
        },
        textInput: {
          title: 'TextField & TextFormField',
          code: `class LoginFields extends StatefulWidget {
  @override
  _LoginFieldsState createState() => _LoginFieldsState();
}

class _LoginFieldsState extends State<LoginFields> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          // Plain TextField
          TextField(
            controller: emailController,
            keyboardType: TextInputType.emailAddress,
            decoration: InputDecoration(
              labelText: 'Email',
              hintText: 'you@example.com',
              prefixIcon: Icon(Icons.email),
            ),
            onChanged: (value) {
              print('Email: \$value');
            },
          ),
          SizedBox(height: 16),

          // TextFormField with validator
          TextFormField(
            controller: passwordController,
            obscureText: true,
            decoration: InputDecoration(
              labelText: 'Password',
              prefixIcon: Icon(Icons.lock),
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Password is required';
              }
              if (value.length < 6) {
                return 'At least 6 characters';
              }
              return null;
            },
            autovalidateMode: AutovalidateMode.onUserInteraction,
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
  {
    id: 3,
    title: 'Form Validation & ListView',
    duration: '1 Hour',
    icon: <List className='w-6 h-6' />,
    content: {
      description:
        'Wrap inputs in a Form with GlobalKey for validation, then display dynamic collections efficiently with ListView.builder and ListView.separated.',
      topics: [
        'Form + GlobalKey<FormState>',
        'Login / register validation patterns',
        'Password confirmation matching',
        'ListView, ListView.builder, ListView.separated',
        'scrollDirection, physics, shrinkWrap',
      ],
      detailedTopics: {
        formValidation: {
          title: 'Complete Form with Validation',
          code: `class RegisterForm extends StatefulWidget {
  @override
  _RegisterFormState createState() => _RegisterFormState();
}

class _RegisterFormState extends State<RegisterForm> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController();
  final _passCtrl = TextEditingController();
  final _confirmCtrl = TextEditingController();

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passCtrl.dispose();
    _confirmCtrl.dispose();
    super.dispose();
  }

  void _submit() {
    if (_formKey.currentState!.validate()) {
      // Form is valid — proceed
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Registered as \${_emailCtrl.text}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _emailCtrl,
            decoration: InputDecoration(labelText: 'Email'),
            validator: (v) {
              if (v == null || v.isEmpty) return 'Enter email';
              if (!RegExp(r'^[^@]+@[^@]+\\.[^@]+').hasMatch(v)) {
                return 'Invalid email';
              }
              return null;
            },
          ),
          SizedBox(height: 12),
          TextFormField(
            controller: _passCtrl,
            obscureText: true,
            decoration: InputDecoration(labelText: 'Password'),
            validator: (v) {
              if (v == null || v.length < 6) return 'Min 6 characters';
              return null;
            },
          ),
          SizedBox(height: 12),
          TextFormField(
            controller: _confirmCtrl,
            obscureText: true,
            decoration: InputDecoration(labelText: 'Confirm Password'),
            validator: (v) {
              if (v != _passCtrl.text) return 'Passwords do not match';
              return null;
            },
          ),
          SizedBox(height: 24),
          ElevatedButton(onPressed: _submit, child: Text('Register')),
        ],
      ),
    );
  }
}`,
        },
        listView: {
          title: 'ListView.builder & separated',
          code: `final products = [
  {'name': 'Laptop', 'price': 1200},
  {'name': 'Phone', 'price': 800},
  {'name': 'Headphones', 'price': 150},
  {'name': 'Keyboard', 'price': 90},
];

class ProductList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      // physics: AlwaysScrollableScrollPhysics(),
      // shrinkWrap: true, // when nested inside Column
      itemCount: products.length,
      separatorBuilder: (_, __) => Divider(height: 1),
      itemBuilder: (context, index) {
        final p = products[index];
        return ListTile(
          leading: CircleAvatar(child: Text('\${index + 1}')),
          title: Text(p['name'] as String),
          subtitle: Text('\\$\${p['price']}'),
          trailing: Icon(Icons.chevron_right),
          onTap: () {},
        );
      },
    );
  }
}

/*
ListView          → small fixed children list
ListView.builder  → large / dynamic lists (lazy)
ListView.separated → builder + divider between items
*/`,
        },
      },
    },
  },
  {
    id: 4,
    title: 'Practical Lab — GridView & Product Display',
    duration: '1 Hour',
    icon: <LayoutGrid className='w-6 h-6' />,
    content: {
      description:
        'Build a product catalog grid with images, titles, and prices. Compare GridView.count vs GridView.builder and know when to prefer ListView.',
      topics: [
        'GridView.count and GridView.builder',
        'SliverGridDelegateWithFixedCrossAxisCount',
        'childAspectRatio, spacing, crossAxisCount',
        'Product card UI (image + title + price)',
        'ListView vs GridView — when to use each',
      ],
      detailedTopics: {
        productGrid: {
          title: 'Product Grid Lab',
          code: `class Product {
  final String name;
  final double price;
  final String imageUrl;

  const Product(this.name, this.price, this.imageUrl);
}

const products = [
  Product('Laptop', 1200, 'https://picsum.photos/200?1'),
  Product('Phone', 800, 'https://picsum.photos/200?2'),
  Product('Watch', 250, 'https://picsum.photos/200?3'),
  Product('Headphones', 150, 'https://picsum.photos/200?4'),
  Product('Camera', 540, 'https://picsum.photos/200?5'),
  Product('Tablet', 400, 'https://picsum.photos/200?6'),
];

class ProductGridPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Products')),
      body: GridView.builder(
        padding: EdgeInsets.all(12),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 0.75, // taller cards
        ),
        itemCount: products.length,
        itemBuilder: (context, index) {
          final p = products[index];
          return Card(
            clipBehavior: Clip.antiAlias,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Expanded(
                  child: Image.network(p.imageUrl, fit: BoxFit.cover),
                ),
                Padding(
                  padding: EdgeInsets.all(8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        p.name,
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(height: 4),
                      Text(
                        '\\$\${p.price.toStringAsFixed(0)}',
                        style: TextStyle(color: Colors.green[700]),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

/*
Use GridView when items share a uniform card layout
Use ListView for rows of rich / varying content
*/`,
        },
      },
    },
  },
];

const Day6 = () => {
  const [activeSession, setActiveSession] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <main>
        <Suspense fallback={<Loading />}>
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
                  Day 6
                </h1>
                <h2 className='text-3xl md:text-5xl font-bold text-[#02569B] mb-8'>
                  Material Design, Forms & Data Display
                </h2>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
                  Theme your app with Material Design, collect input with
                  validated forms, and display data using ListView and GridView.
                </p>

                <motion.button
                  onClick={scrollToContent}
                  className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#024A87] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <ChevronDown className='w-5 h-5' />
                  Explore Forms & Data Display
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
                  4 hours: theming, buttons, forms, lists, and a product grid
                  lab.
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
                  Day 6 Summary
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
                          ThemeData keeps Material colors, text, and components
                          consistent across the app.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          Choose button emphasis wisely; use TextFormField + Form
                          for validated input.
                        </span>
                      </li>
                      <li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
                        <CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
                        <span>
                          ListView.builder is ideal for dynamic lists;
                          GridView.builder for uniform product cards.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
                      What's Next
                    </h4>
                    <p className='text-gray-600 dark:text-gray-300 mb-6'>
                      In Day 7, we'll connect screens with Navigator and Named
                      Routes, and give users feedback with Dialogs and SnackBars.
                    </p>
                    <button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
                      Next: Day 7
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
                  Hands-on Exercise
                </h3>

                <div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-l-4 border-blue-500'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                      📝
                    </div>
                    <h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
                      Task: Themed Product Catalog with Form + Grid
                    </h5>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      Objective
                    </h6>
                    <p className='text-gray-700 dark:text-gray-300'>
                      Apply ThemeData, build a validated form to add products,
                      and display them in a GridView product catalog.
                    </p>
                  </div>

                  <div className='mb-6'>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
                      Requirements
                    </h6>
                    <div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• Configure ThemeData (colorScheme + inputDecorationTheme)</li>
                        <li>• Form fields: name, price, image URL with validators</li>
                        <li>• On submit, add product to a list in state</li>
                        <li>• Show products in GridView.builder with Card UI</li>
                        <li>• Toggle between ListView and GridView (bonus)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
                      👉 Bonus Challenge
                    </h6>
                    <div className='bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700'>
                      <ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
                        <li>• Delete product with a confirmation flow (prep for Day 7)</li>
                        <li>• Empty-state message when no products exist</li>
                        <li>• Placeholder image when URL fails</li>
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

export default Day6;

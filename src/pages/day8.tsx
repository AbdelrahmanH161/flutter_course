import { useState, Suspense, lazy, useRef } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	CheckCircle,
	Clock,
	Database,
	Settings,
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
		title: 'Persisting Data with SharedPreferences',
		duration: '1 Hour',
		icon: <Database className='w-6 h-6' />,
		content: {
			description:
				'Learn to save and retrieve data locally using SharedPreferences. Perfect for storing user preferences, login tokens, and app settings that persist between app sessions.',
			topics: [
				'Understanding local data storage concepts',
				'Adding SharedPreferences dependency',
				'Saving data: strings, booleans, integers, lists',
				'Reading and retrieving stored data',
				'Removing data and clearing preferences',
			],
			detailedTopics: {
				sharedPreferencesSetup: {
					title: 'Setting up SharedPreferences',
					code: `# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  shared_preferences: ^2.2.2

# After adding, run: flutter pub get

# Import in your Dart file
import 'package:shared_preferences/shared_preferences.dart';`,
				},
				basicOperations: {
					title: 'Basic Save and Read Operations',
					code: `import 'package:shared_preferences/shared_preferences.dart';

class SharedPreferencesExample {
  // Save data
  Future<void> saveData() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Save different types of data
    await prefs.setString('username', 'Abdelrahman');
    await prefs.setInt('age', 25);
    await prefs.setBool('isLoggedIn', true);
    await prefs.setDouble('score', 95.5);
    await prefs.setStringList('hobbies', ['coding', 'reading', 'gaming']);
    
    print('Data saved successfully!');
  }
  
  // Read data
  Future<void> loadData() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Read with default values
    final username = prefs.getString('username') ?? 'Guest';
    final age = prefs.getInt('age') ?? 0;
    final isLoggedIn = prefs.getBool('isLoggedIn') ?? false;
    final score = prefs.getDouble('score') ?? 0.0;
    final hobbies = prefs.getStringList('hobbies') ?? [];
    
    print('Username: \$username');
    print('Age: \$age');
    print('Is Logged In: \$isLoggedIn');
    print('Score: \$score');
    print('Hobbies: \$hobbies');
  }
  
  // Remove specific data
  Future<void> removeData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('username');
    print('Username removed');
  }
  
  // Clear all data
  Future<void> clearAllData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    print('All data cleared');
  }
}`,
				},
				loginStateExample: {
					title: 'Login State Management Example',
					code: `class AuthService {
  static const String _isLoggedInKey = 'isLoggedIn';
  static const String _userTokenKey = 'userToken';
  static const String _userEmailKey = 'userEmail';
  
  // Save login state
  Future<void> saveLoginState(String token, String email) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_isLoggedInKey, true);
    await prefs.setString(_userTokenKey, token);
    await prefs.setString(_userEmailKey, email);
  }
  
  // Check if user is logged in
  Future<bool> isLoggedIn() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_isLoggedInKey) ?? false;
  }
  
  // Get stored user token
  Future<String?> getUserToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_userTokenKey);
  }
  
  // Get stored user email
  Future<String?> getUserEmail() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_userEmailKey);
  }
  
  // Logout - clear all auth data
  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_isLoggedInKey);
    await prefs.remove(_userTokenKey);
    await prefs.remove(_userEmailKey);
  }
}

// Usage in a widget
class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _authService = AuthService();
  
  Future<void> _login() async {
    // Simulate API call
    await Future.delayed(Duration(seconds: 1));
    
    // Save login state
    await _authService.saveLoginState('abc123token', _emailController.text);
    
    // Navigate to home screen
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => HomeScreen()),
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _emailController,
              decoration: InputDecoration(labelText: 'Email'),
            ),
            TextField(
              controller: _passwordController,
              decoration: InputDecoration(labelText: 'Password'),
              obscureText: true,
            ),
            ElevatedButton(
              onPressed: _login,
              child: Text('Login'),
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
		title: 'Introduction to State Management',
		duration: '1 Hour',
		icon: <Settings className='w-6 h-6' />,
		content: {
			description:
				'Learn why setState() becomes insufficient for larger apps and how Provider offers a clean solution for managing app-wide state. Understand the fundamentals of state management patterns.',
			topics: [
				'Why setState() has limitations in complex apps',
				'Understanding Provider pattern and ChangeNotifier',
				'Creating state classes with ChangeNotifier',
				'Wrapping app with ChangeNotifierProvider',
				'Accessing and updating state from anywhere',
			],
			detailedTopics: {
				providerSetup: {
					title: 'Setting up Provider',
					code: `# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  provider: ^6.0.5

# Import in your Dart file
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';`,
				},
				userProviderExample: {
					title: 'Creating a User Provider',
					code: `class UserProvider with ChangeNotifier {
  String _name = 'Guest';
  String _email = '';
  bool _isLoggedIn = false;
  
  // Getters
  String get name => _name;
  String get email => _email;
  bool get isLoggedIn => _isLoggedIn;
  
  // Update name
  void updateName(String newName) {
    _name = newName;
    notifyListeners(); // Notify all listeners
  }
  
  // Update email
  void updateEmail(String newEmail) {
    _email = newEmail;
    notifyListeners();
  }
  
  // Login
  void login(String name, String email) {
    _name = name;
    _email = email;
    _isLoggedIn = true;
    notifyListeners();
  }
  
  // Logout
  void logout() {
    _name = 'Guest';
    _email = '';
    _isLoggedIn = false;
    notifyListeners();
  }
  
  // Reset all data
  void reset() {
    _name = 'Guest';
    _email = '';
    _isLoggedIn = false;
    notifyListeners();
  }
}`,
				},
				providerUsage: {
					title: 'Using Provider in Widgets',
					code: `// Wrap your app with ChangeNotifierProvider
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => UserProvider(),
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Provider Example',
      home: HomeScreen(),
    );
  }
}

// Using Provider in a widget
class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Get the provider instance
    final userProvider = Provider.of<UserProvider>(context);
    
    return Scaffold(
      appBar: AppBar(title: Text("Profile")),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Text(
              "Hello, \${userProvider.name}",
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Text("Email: \${userProvider.email}"),
            SizedBox(height: 16),
            Text("Status: \${userProvider.isLoggedIn ? 'Logged In' : 'Guest'}"),
            SizedBox(height: 32),
            TextField(
              onChanged: (value) {
                userProvider.updateName(value);
              },
              decoration: InputDecoration(
                labelText: "Update Name",
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                userProvider.login('New User', 'newuser@example.com');
              },
              child: Text("Login"),
            ),
            ElevatedButton(
              onPressed: () {
                userProvider.logout();
              },
              child: Text("Logout"),
            ),
          ],
        ),
      ),
    );
  }
}

// Alternative way to access provider (Consumer)
class AnotherScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Another Screen")),
      body: Consumer<UserProvider>(
        builder: (context, userProvider, child) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Current user: \${userProvider.name}"),
                Text("Email: \${userProvider.email}"),
                ElevatedButton(
                  onPressed: () {
                    userProvider.updateName('Updated Name');
                  },
                  child: Text("Update Name"),
                ),
              ],
            ),
          );
        },
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
		title: 'Accessing Device Resources',
		duration: '1 Hour',
		icon: <Smartphone className='w-6 h-6' />,
		content: {
			description:
				'Learn to access device resources like camera, gallery, and other hardware features. Understand permission handling and how to integrate device capabilities into your Flutter apps.',
			topics: [
				'Image picker for camera and gallery access',
				'Permission handling for device resources',
				'Working with device files and storage',
				'Location services and GPS access',
				'Other device capabilities and sensors',
			],
			detailedTopics: {
				imagePickerSetup: {
					title: 'Setting up Image Picker',
					code: `# pubspec.yaml
dependencies:
  flutter:
    sdk: flutter
  image_picker: ^1.0.7

# For Android, add permissions in android/app/src/main/AndroidManifest.xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

# Import in your Dart file
import 'package:image_picker/image_picker.dart';
import 'dart:io';`,
				},
				imagePickerExample: {
					title: 'Image Picker Implementation',
					code: `class ImagePickerExample extends StatefulWidget {
  @override
  _ImagePickerExampleState createState() => _ImagePickerExampleState();
}

class _ImagePickerExampleState extends State<ImagePickerExample> {
  File? _image;
  final ImagePicker _picker = ImagePicker();
  
  // Pick image from camera
  Future<void> _pickImageFromCamera() async {
    try {
      final XFile? image = await _picker.pickImage(
        source: ImageSource.camera,
        maxWidth: 1800,
        maxHeight: 1800,
        imageQuality: 85,
      );
      
      if (image != null) {
        setState(() {
          _image = File(image.path);
        });
        print('Image path: \${_image!.path}');
      }
    } catch (e) {
      print('Error picking image from camera: \$e');
    }
  }
  
  // Pick image from gallery
  Future<void> _pickImageFromGallery() async {
    try {
      final XFile? image = await _picker.pickImage(
        source: ImageSource.gallery,
        maxWidth: 1800,
        maxHeight: 1800,
        imageQuality: 85,
      );
      
      if (image != null) {
        setState(() {
          _image = File(image.path);
        });
        print('Image path: \${_image!.path}');
      }
    } catch (e) {
      print('Error picking image from gallery: \$e');
    }
  }
  
  // Pick multiple images
  Future<void> _pickMultipleImages() async {
    try {
      final List<XFile> images = await _picker.pickMultiImage(
        maxWidth: 1800,
        maxHeight: 1800,
        imageQuality: 85,
      );
      
      if (images.isNotEmpty) {
        print('Selected \${images.length} images');
        for (var image in images) {
          print('Image: \${image.path}');
        }
      }
    } catch (e) {
      print('Error picking multiple images: \$e');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Image Picker Example')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            // Display selected image
            Container(
              height: 200,
              width: double.infinity,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(8),
              ),
              child: _image == null
                  ? Center(child: Text('No image selected'))
                  : Image.file(_image!, fit: BoxFit.cover),
            ),
            SizedBox(height: 20),
            
            // Action buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton.icon(
                  onPressed: _pickImageFromCamera,
                  icon: Icon(Icons.camera_alt),
                  label: Text('Camera'),
                ),
                ElevatedButton.icon(
                  onPressed: _pickImageFromGallery,
                  icon: Icon(Icons.photo_library),
                  label: Text('Gallery'),
                ),
              ],
            ),
            SizedBox(height: 10),
            ElevatedButton.icon(
              onPressed: _pickMultipleImages,
              icon: Icon(Icons.photo_library_outlined),
              label: Text('Multiple Images'),
            ),
          ],
        ),
      ),
    );
  }
}`,
				},
				permissionHandler: {
					title: 'Permission Handling',
					code: `# pubspec.yaml
dependencies:
  permission_handler: ^11.0.1

# Import
import 'package:permission_handler/permission_handler.dart';

class PermissionExample extends StatefulWidget {
  @override
  _PermissionExampleState createState() => _PermissionExampleState();
}

class _PermissionExampleState extends State<PermissionExample> {
  String _permissionStatus = 'Unknown';
  
  // Check camera permission
  Future<void> _checkCameraPermission() async {
    final status = await Permission.camera.status;
    setState(() {
      _permissionStatus = status.toString();
    });
  }
  
  // Request camera permission
  Future<void> _requestCameraPermission() async {
    final status = await Permission.camera.request();
    setState(() {
      _permissionStatus = status.toString();
    });
    
    if (status.isGranted) {
      print('Camera permission granted');
    } else if (status.isDenied) {
      print('Camera permission denied');
    } else if (status.isPermanentlyDenied) {
      print('Camera permission permanently denied');
      // Open app settings
      openAppSettings();
    }
  }
  
  // Check multiple permissions
  Future<void> _checkMultiplePermissions() async {
    Map<Permission, PermissionStatus> statuses = await [
      Permission.camera,
      Permission.storage,
      Permission.location,
    ].request();
    
    print('Camera: \${statuses[Permission.camera]}');
    print('Storage: \${statuses[Permission.storage]}');
    print('Location: \${statuses[Permission.location]}');
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Permission Example')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Text('Permission Status: \$_permissionStatus'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _checkCameraPermission,
              child: Text('Check Camera Permission'),
            ),
            ElevatedButton(
              onPressed: _requestCameraPermission,
              child: Text('Request Camera Permission'),
            ),
            ElevatedButton(
              onPressed: _checkMultiplePermissions,
              child: Text('Check Multiple Permissions'),
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
		title: 'Building & Releasing APK',
		duration: '1 Hour',
		icon: <Package className='w-6 h-6' />,
		content: {
			description:
				'Learn the complete process of building and releasing your Flutter app. From checking your environment to creating signed APKs and App Bundles for the Play Store.',
			topics: [
				'Checking Flutter environment with flutter doctor',
				'Building release APK for testing',
				'Creating App Bundle for Play Store',
				'Setting up app signing with keystore',
				'Testing and publishing your app',
			],
			detailedTopics: {
				flutterDoctor: {
					title: 'Checking Flutter Environment',
					code: `# Check Flutter installation and dependencies
flutter doctor

# Expected output should show:
# ✓ Flutter (Channel stable, version)
# ✓ Android toolchain - develop for Android devices
# ✓ Android Studio (version)
# ✓ VS Code (version)
# ✓ Connected device (if device connected)

# If any issues, follow the suggested fixes
# For example, if Android toolchain is missing:
flutter doctor --android-licenses

# Update Flutter to latest version
flutter upgrade

# Clean and get dependencies
flutter clean
flutter pub get`,
				},
				buildApk: {
					title: 'Building Release APK',
					code: `# Build APK for release
flutter build apk --release

# The APK will be created at:
# build/app/outputs/flutter-apk/app-release.apk

# Build APK for specific architecture (smaller size)
flutter build apk --release --target-platform android-arm64

# Build APK with specific flavor (if you have flavors)
flutter build apk --release --flavor production

# Build APK with specific build number
flutter build apk --release --build-number=2

# Build APK with specific version name
flutter build apk --release --build-name=1.0.1

# Install APK directly to connected device
flutter install --release

# Check APK size
flutter build apk --analyze-size`,
				},
				appSigning: {
					title: 'Setting up App Signing',
					code: `# 1. Create a keystore (run in terminal)
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload

# 2. Create android/key.properties file
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=upload
storeFile=../upload-keystore.jks

# 3. Update android/app/build.gradle
android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}

# 4. Load keystore properties
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}`,
				},
				appBundle: {
					title: 'Building App Bundle for Play Store',
					code: `# Build App Bundle (recommended for Play Store)
flutter build appbundle --release

# The AAB will be created at:
# build/app/outputs/bundle/release/app-release.aab

# Build App Bundle with specific configuration
flutter build appbundle --release --build-number=2 --build-name=1.0.1

# Build App Bundle for specific flavor
flutter build appbundle --release --flavor production

# Upload to Play Store using command line (optional)
# First, install Google Play Console API
# Then use:
# fastlane supply --aab app-release.aab --track production

# Test the App Bundle locally
# Convert AAB to APK for testing:
# bundletool build-apks --bundle=app-release.aab --output=app-release.apks
# bundletool install-apks --apks=app-release.apks`,
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
									Persistence, State Management & Device Access
								</h2>
								<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
									Master data persistence, state management, and device resource
									access. Learn to build and release your Flutter app to the
									world!
								</p>

								<motion.button
									onClick={scrollToContent}
									className='inline-flex items-center gap-2 bg-[#02569B] hover:bg-[#0175C2] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<ChevronDown className='w-5 h-5' />
									Explore Persistence & State Management
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
									4 hours to master data persistence, state management, and app
									deployment.
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
															(topic: any, index) => (
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
													Master data persistence with SharedPreferences for
													storing user preferences and app state.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Implement Provider pattern for clean, scalable state
													management across your app.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Access device resources like camera, gallery, and
													permissions for rich user experiences.
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#02569B] mt-0.5 flex-shrink-0' />
												<span>
													Build and release your app with proper signing and
													deployment to app stores.
												</span>
											</li>
										</ul>
									</div>
									<div>
										<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
											What's Next
										</h4>
										<p className='text-gray-600 dark:text-gray-300 mb-6'>
											Congratulations! You've completed the Flutter course. You
											now have the skills to build, deploy, and maintain Flutter
											applications. Continue exploring advanced topics like
											Firebase integration, custom animations, and
											platform-specific features.
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

								{/* Persisting Data & Global State with Provider Task */}
								<div className='bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-l-4 border-blue-500'>
									<div className='flex items-center gap-3 mb-4'>
										<div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
											🔄
										</div>
										<h5 className='text-xl font-semibold text-blue-700 dark:text-blue-300'>
											Task: Persisting Data & Global State with Provider
										</h5>
									</div>

									<div className='mb-6'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
											Objective
										</h6>
										<p className='text-gray-700 dark:text-gray-300'>
											Enhance the previous login & product catalog app by
											introducing persistent login with SharedPreferences and
											global state management with Provider + ChangeNotifier.
										</p>
									</div>

									<div className='mb-6'>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-3 text-lg'>
											Requirements
										</h6>

										<div className='space-y-4'>
											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													1. Splash Screen
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>
														• On app start, check if a valid token exists in
														SharedPreferences
													</li>
													<li>
														• If token exists → navigate directly to Home Page
													</li>
													<li>• If no token → navigate to Login Page</li>
												</ul>
											</div>

											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													2. State Management Setup
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>
														• Wrap the app with MultiProvider (or
														ChangeNotifierProvider) at the root
													</li>
													<li>
														• Create a AuthProvider (extends ChangeNotifier) to:
													</li>
													<li className='ml-4'>
														• Manage authentication state (token, user data,
														isLoggedIn)
													</li>
													<li className='ml-4'>
														• Provide methods: login(), logout(), autoLogin()
													</li>
													<li>
														• Create a ProductProvider (extends ChangeNotifier)
														to:
													</li>
													<li className='ml-4'>
														• Fetch and hold categories and products
													</li>
													<li className='ml-4'>
														• Handle selected category state
													</li>
												</ul>
											</div>

											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													3. Login Page
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>• On successful login:</li>
													<li className='ml-4'>
														• Store the token using SharedPreferences
													</li>
													<li className='ml-4'>• Update AuthProvider state</li>
													<li className='ml-4'>• Navigate to Home Page</li>
												</ul>
											</div>

											<div className='bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600'>
												<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 block'>
													4. Home Page
												</h6>
												<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
													<li>
														• Fetch categories and products using
														ProductProvider
													</li>
													<li>
														• Use Consumer or Selector to listen for state
														updates
													</li>
													<li>• Add Logout in Drawer:</li>
													<li className='ml-4'>• Clear SharedPreferences</li>
													<li className='ml-4'>• Reset AuthProvider state</li>
													<li className='ml-4'>• Navigate to Login Page</li>
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
												<li>
													• User opens app → Splash checks SharedPreferences
												</li>
												<li>
													• If token found → auto login via AuthProvider → Home
													Page
												</li>
												<li>• Else → Login Page</li>
												<li>
													• User logs in → token saved in SharedPreferences →
													navigates Home
												</li>
												<li>
													• User logs out → token removed → back to Login Page
												</li>
											</ul>
										</div>
									</div>

									<div>
										<h6 className='font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg'>
											👉 Bonus Challenge
										</h6>
										<div className='bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700'>
											<ul className='text-sm text-gray-600 dark:text-gray-300 space-y-1'>
												<li>
													• Add a rememberMe checkbox on login (store
													credentials in SharedPreferences if checked)
												</li>
												<li>
													• Persist selected category in SharedPreferences and
													auto-select it on next app start
												</li>
												<li>
													• Add a "Dark Mode" toggle in Settings (save
													preference in SharedPreferences + apply with
													ChangeNotifier)
												</li>
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

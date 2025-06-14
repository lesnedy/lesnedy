import React, { useState } from 'react';
import { Building2, Phone, Mail, MapPin, Bell, CreditCard, Users, Settings, Menu, X, Home, FileText, Wallet, Car, Trees, Wifi, Shield, Waves, Sun } from 'lucide-react';

type UserRole = 'customer' | 'admin' | null;
type Page = 'home' | 'login' | 'customer-dashboard' | 'admin-dashboard' | 'bills' | 'notifications' | 'payment';

interface Bill {
  id: string;
  apartmentNumber: string;
  month: string;
  year: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: Array<{
    description: string;
    amount: number;
  }>;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'general' | 'urgent' | 'maintenance' | 'payment';
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  // Sample data
  const sampleBills: Bill[] = [
    {
      id: '1',
      apartmentNumber: 'A101',
      month: 'January',
      year: 2025,
      amount: 450000,
      dueDate: '2025-01-31',
      status: 'pending',
      items: [
        { description: 'Rent', amount: 350000 },
        { description: 'Water', amount: 45000 },
        { description: 'Electricity', amount: 35000 },
        { description: 'Security', amount: 20000 }
      ]
    },
    {
      id: '2',
      apartmentNumber: 'A101',
      month: 'December',
      year: 2024,
      amount: 420000,
      dueDate: '2024-12-31',
      status: 'paid',
      items: [
        { description: 'Rent', amount: 350000 },
        { description: 'Water', amount: 35000 },
        { description: 'Electricity', amount: 25000 },
        { description: 'Security', amount: 20000 }
      ]
    }
  ];

  const sampleNotifications: Notification[] = [
    {
      id: '1',
      title: 'Monthly Bill Available',
      message: 'Your January 2025 bill is now available. Please pay by January 31st to avoid late fees.',
      date: '2025-01-01',
      read: false,
      type: 'payment'
    },
    {
      id: '2',
      title: 'Water Supply Maintenance',
      message: 'Water supply will be temporarily unavailable on January 15th from 9:00 AM to 2:00 PM for routine maintenance.',
      date: '2025-01-10',
      read: true,
      type: 'maintenance'
    },
    {
      id: '3',
      title: 'Welcome to LESNEDY APARTMENT',
      message: 'Welcome to our community! Please familiarize yourself with the apartment rules and regulations.',
      date: '2024-12-20',
      read: true,
      type: 'general'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const Header = () => (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 rounded-xl shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                LESNEDY APARTMENT
              </h1>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Kigamboni, Dar es Salaam
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {userRole === 'customer' && (
              <>
                <button
                  onClick={() => setCurrentPage('customer-dashboard')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-105"
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setCurrentPage('bills')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-105"
                >
                  <FileText className="h-4 w-4" />
                  <span>Bills</span>
                </button>
                <button
                  onClick={() => setCurrentPage('notifications')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-105"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </button>
              </>
            )}
            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => setCurrentPage('admin-dashboard')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-105"
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin</span>
                </button>
                <button
                  onClick={() => setCurrentPage('bills')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-105"
                >
                  <FileText className="h-4 w-4" />
                  <span>Manage Bills</span>
                </button>
              </>
            )}
            {userRole && (
              <button
                onClick={() => {
                  setUserRole(null);
                  setCurrentPage('home');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            )}
            {!userRole && (
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-all duration-300"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              {userRole === 'customer' && (
                <>
                  <button
                    onClick={() => {
                      setCurrentPage('customer-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 py-2 transition-all duration-300"
                  >
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('bills');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 py-2 transition-all duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Bills</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('notifications');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 py-2 transition-all duration-300"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </button>
                </>
              )}
              {userRole === 'admin' && (
                <>
                  <button
                    onClick={() => {
                      setCurrentPage('admin-dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 py-2 transition-all duration-300"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('bills');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 py-2 transition-all duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Manage Bills</span>
                  </button>
                </>
              )}
              {userRole && (
                <button
                  onClick={() => {
                    setUserRole(null);
                    setCurrentPage('home');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 text-left shadow-lg"
                >
                  Logout
                </button>
              )}
              {!userRole && (
                <button
                  onClick={() => {
                    setCurrentPage('login');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 text-left shadow-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section with Building Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="Modern Apartment Building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-blue-900/70 to-yellow-900/80"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 rounded-full shadow-2xl animate-pulse">
                <Building2 className="h-20 w-20 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 animate-gradient">
                LESNEDY APARTMENT
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto drop-shadow-lg leading-relaxed">
              Experience luxury living in the heart of Kigamboni, Dar es Salaam. Our modern apartment complex offers comfort, 
              convenience, and community in Tanzania's vibrant coastal paradise.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 text-white px-10 py-4 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-500 transform hover:scale-110 font-bold text-lg shadow-2xl hover:shadow-3xl"
              >
                Access Your Account
              </button>
              <a
                href="tel:+255755019307"
                className="bg-white/10 backdrop-blur-md text-white px-10 py-4 rounded-xl hover:bg-white/20 transition-all duration-500 transform hover:scale-110 font-bold text-lg shadow-2xl border border-white/20"
              >
                Contact Us Now
              </a>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 bg-yellow-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float-delayed">
          <div className="w-6 h-6 bg-green-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float">
          <div className="w-5 h-5 bg-blue-400 rounded-full opacity-80"></div>
        </div>
      </section>

      {/* Building Gallery Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Your Dream Home Awaits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the perfect blend of modern architecture and tropical paradise in Kigamboni
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Building Exterior */}
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="LESNEDY Apartment Building Exterior" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Modern Architecture</h3>
                <p className="text-white/90">Contemporary design meets African elegance</p>
              </div>
            </div>

            {/* Parking Area */}
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="Secure Parking Area" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Secure Parking</h3>
                <p className="text-white/90">24/7 monitored parking for your vehicles</p>
              </div>
            </div>

            {/* Garden/Environment */}
            <div className="group relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500">
              <img 
                src="https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="Beautiful Garden Environment" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Lush Gardens</h3>
                <p className="text-white/90">Tropical paradise at your doorstep</p>
              </div>
            </div>
          </div>

          {/* Large Feature Image */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/1396118/pexels-photo-1396118.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop" 
              alt="LESNEDY Apartment Complex Overview" 
              className="w-full h-96 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-transparent to-blue-900/70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                  LESNEDY APARTMENT
                </h3>
                <p className="text-xl md:text-2xl drop-shadow-lg">
                  Where Luxury Meets Comfort in Kigamboni
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Premium Amenities & Features
            </h2>
            <p className="text-xl text-gray-600">Experience the best of modern living in Dar es Salaam</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <CreditCard className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Easy Bill Payment</h3>
              <p className="text-gray-600 leading-relaxed">Pay your bills online with our secure payment system. M-Pesa, Tigo Pesa, and bank transfers supported.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Car className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Parking</h3>
              <p className="text-gray-600 leading-relaxed">24/7 monitored parking spaces for all residents. CCTV surveillance and security guards on duty.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Trees className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Beautiful Gardens</h3>
              <p className="text-gray-600 leading-relaxed">Lush tropical gardens and landscaped areas perfect for relaxation and family activities.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Security</h3>
              <p className="text-gray-600 leading-relaxed">Round-the-clock security with trained guards, CCTV monitoring, and controlled access systems.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:from-teal-100 hover:to-teal-200 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Wifi className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">High-Speed Internet</h3>
              <p className="text-gray-600 leading-relaxed">Fiber optic internet connection throughout the building for work and entertainment needs.</p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Waves className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Beach Access</h3>
              <p className="text-gray-600 leading-relaxed">Just minutes away from Kigamboni's beautiful beaches and the Indian Ocean coastline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Prime Kigamboni Location
            </h2>
            <p className="text-xl text-gray-600">Perfectly positioned in Dar es Salaam's most desirable coastal district</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Strategic Location</h3>
                  <p className="text-gray-600">Located in the heart of Kigamboni with easy access to Dar es Salaam city center via the Kigamboni Bridge.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg">
                  <Waves className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Coastal Living</h3>
                  <p className="text-gray-600">Enjoy the sea breeze and beautiful ocean views. Perfect for beach lovers and water sports enthusiasts.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg shadow-lg">
                  <Sun className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Year-Round Sunshine</h3>
                  <p className="text-gray-600">Enjoy Tanzania's tropical climate with warm temperatures and beautiful sunsets over the Indian Ocean.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop" 
                alt="Kigamboni Beach View" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Kigamboni Paradise</h3>
                <p className="text-white/90">Your gateway to coastal living</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 drop-shadow-2xl">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group flex flex-col items-center text-white transform hover:scale-110 transition-all duration-300">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-full mb-6 group-hover:bg-white/30 transition-all duration-300">
                <Phone className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Phone</h3>
              <a href="tel:+255755019307" className="text-xl hover:text-yellow-300 transition-colors duration-300 font-medium">
                +255 755 019 307
              </a>
            </div>
            <div className="group flex flex-col items-center text-white transform hover:scale-110 transition-all duration-300">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-full mb-6 group-hover:bg-white/30 transition-all duration-300">
                <Mail className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Email</h3>
              <a href="mailto:lesnedycharles@gmail.com" className="text-xl hover:text-yellow-300 transition-colors duration-300 font-medium">
                lesnedycharles@gmail.com
              </a>
            </div>
            <div className="group flex flex-col items-center text-white transform hover:scale-110 transition-all duration-300">
              <div className="p-4 bg-white/20 backdrop-blur-md rounded-full mb-6 group-hover:bg-white/30 transition-all duration-300">
                <MapPin className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="text-xl font-medium">Kigamboni, Dar es Salaam<br />Tanzania</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-400 rounded-full animate-pulse delay-2000"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 rounded-full shadow-2xl animate-bounce">
              <Building2 className="h-16 w-16 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Access Your Account
          </h2>
          <p className="mt-4 text-gray-600 text-lg">Choose your login type to continue</p>
        </div>
        
        <div className="space-y-6">
          <button
            onClick={() => {
              setUserRole('customer');
              setCurrentPage('customer-dashboard');
            }}
            className="group w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-6 px-8 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-500 transform hover:scale-105 font-bold text-xl shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-4"
          >
            <Users className="h-8 w-8 group-hover:animate-bounce" />
            <span>Customer Login</span>
          </button>
          
          <button
            onClick={() => {
              setUserRole('admin');
              setCurrentPage('admin-dashboard');
            }}
            className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-8 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-500 transform hover:scale-105 font-bold text-xl shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-4"
          >
            <Settings className="h-8 w-8 group-hover:animate-spin" />
            <span>Admin Login</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('home')}
            className="w-full bg-white/80 backdrop-blur-md text-gray-700 py-4 px-6 rounded-xl hover:bg-white transition-all duration-300 font-semibold border border-gray-200 shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const CustomerDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-lg">Apartment A101 - Manage your account and payments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Current Bill */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Current Bill</h3>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Pending
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {formatCurrency(450000)}
              </p>
              <p className="text-gray-600 text-lg">January 2025</p>
              <p className="text-sm text-gray-500">Due: January 31, 2025</p>
            </div>
            <button
              onClick={() => setCurrentPage('payment')}
              className="w-full bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 mt-6 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Pay Now
            </button>
          </div>

          {/* Notifications */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                1 New
              </div>
            </div>
            <div className="space-y-4">
              {sampleNotifications.slice(0, 2).map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                    <Bell className={`h-4 w-4 ${notification.read ? 'text-gray-500' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage('notifications')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 mt-4 font-semibold"
            >
              View All
            </button>
          </div>

          {/* Payment History */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Payment History</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-gray-900">December 2024</p>
                  <p className="text-xs text-gray-500">Paid on Dec 28, 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(420000)}</p>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Paid
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('bills')}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 mt-4 font-semibold"
            >
              View All Bills
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button
              onClick={() => setCurrentPage('payment')}
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Wallet className="h-10 w-10 text-green-600 mb-3 group-hover:animate-bounce" />
              <span className="text-sm font-bold text-gray-900">Pay Bill</span>
            </button>
            <button
              onClick={() => setCurrentPage('bills')}
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <FileText className="h-10 w-10 text-blue-600 mb-3 group-hover:animate-bounce" />
              <span className="text-sm font-bold text-gray-900">View Bills</span>
            </button>
            <button
              onClick={() => setCurrentPage('notifications')}
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Bell className="h-10 w-10 text-yellow-600 mb-3 group-hover:animate-bounce" />
              <span className="text-sm font-bold text-gray-900">Notifications</span>
            </button>
            <a
              href="tel:+255755019307"
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Phone className="h-10 w-10 text-purple-600 mb-3 group-hover:animate-bounce" />
              <span className="text-sm font-bold text-gray-900">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage LESNEDY APARTMENT operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">Total Apartments</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">Active Tenants</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">22</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">Pending Bills</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">18</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{formatCurrency(9800000)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Send Notification */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Notification</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="Enter notification title"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="Enter your message"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/50">
                  <option>General</option>
                  <option>Urgent</option>
                  <option>Maintenance</option>
                  <option>Payment</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Notification
              </button>
            </form>
          </div>

          {/* Recent Activities */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activities</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-200">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Payment received from A101</p>
                  <p className="text-xs text-gray-500">2 hours ago • {formatCurrency(450000)}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-200">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-lg">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Maintenance notification sent</p>
                  <p className="text-xs text-gray-500">5 hours ago • All tenants</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-all duration-200">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">January bills generated</p>
                  <p className="text-xs text-gray-500">1 day ago • 24 apartments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BillsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {userRole === 'admin' ? 'Manage Bills' : 'Your Bills'}
          </h1>
          <p className="text-gray-600 text-lg">
            {userRole === 'admin' ? 'Generate and manage apartment bills' : 'View and pay your apartment bills'}
          </p>
        </div>

        <div className="grid gap-8">
          {sampleBills.map((bill) => (
            <div key={bill.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-4 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {bill.month} {bill.year}
                    </h3>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                      bill.status === 'paid' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                        : bill.status === 'overdue'
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                        : 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                    }`}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg">Apartment {bill.apartmentNumber}</p>
                  <p className="text-sm text-gray-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {formatCurrency(bill.amount)}
                  </p>
                  {bill.status === 'pending' && userRole === 'customer' && (
                    <button
                      onClick={() => {
                        setSelectedBill(bill);
                        setCurrentPage('payment');
                      }}
                      className="mt-3 bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Bill Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bill.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 px-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-gray-100 hover:to-blue-100 transition-all duration-200">
                      <span className="text-gray-700 font-medium">{item.description}</span>
                      <span className="font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const NotificationsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-gray-600 text-lg">Stay updated with important announcements</p>
        </div>

        <div className="space-y-6">
          {sampleNotifications.map((notification) => (
            <div key={notification.id} className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02] ${
              notification.read ? 'border-gray-100' : 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-white/80'
            }`}>
              <div className="flex items-start space-x-6">
                <div className={`p-3 rounded-full shadow-lg ${
                  notification.type === 'urgent' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                  notification.type === 'maintenance' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  notification.type === 'payment' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  'bg-gradient-to-r from-blue-500 to-cyan-500'
                }`}>
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{notification.title}</h3>
                    <span className="text-sm text-gray-500 font-medium">{notification.date}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">{notification.message}</p>
                  {!notification.read && (
                    <div className="mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg animate-pulse">
                        New
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PaymentPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Pay Your Bill
          </h1>
          <p className="text-gray-600 text-lg">Secure payment for your apartment bill</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Bill Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
              <span className="text-gray-600 font-medium">Apartment</span>
              <span className="font-bold text-gray-900">A101</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
              <span className="text-gray-600 font-medium">Period</span>
              <span className="font-bold text-gray-900">January 2025</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
              <span className="text-gray-600 font-medium">Due Date</span>
              <span className="font-bold text-gray-900">January 31, 2025</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-2xl font-bold py-3 px-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <span>Total Amount</span>
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {formatCurrency(450000)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h3>
          <div className="space-y-4">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:bg-green-50 transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">M-PESA</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">M-Pesa</p>
                    <p className="text-sm text-gray-500">Pay with your mobile money</p>
                  </div>
                </div>
                <input type="radio" name="payment" className="text-green-600 w-5 h-5" />
              </div>
            </div>
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">TIGO</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Tigo Pesa</p>
                    <p className="text-sm text-gray-500">Pay with Tigo Pesa</p>
                  </div>
                </div>
                <input type="radio" name="payment" className="text-blue-600 w-5 h-5" />
              </div>
            </div>
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 cursor-pointer transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">BANK</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Bank Transfer</p>
                    <p className="text-sm text-gray-500">Pay via bank transfer</p>
                  </div>
                </div>
                <input type="radio" name="payment" className="text-purple-600 w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 text-white py-6 px-8 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105">
              Proceed to Payment
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setCurrentPage(userRole === 'admin' ? 'admin-dashboard' : 'customer-dashboard')}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300 font-medium text-lg"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'bills':
        return <BillsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'payment':
        return <PaymentPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderCurrentPage()}
    </div>
  );
}

export default App;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// export default function Header({ toggleSidebar }:any) {
//   return (
//     <header className="fixed top-0 left-0 right-0 bg-white text-black flex items-center justify-between px-4 lg:px-8 py-2 z-50">
//       <h1 className="text-xl font-semibold">Restaurent POS</h1>
//     </header>
//   );
// }

// components/Navbar.js
import { Clock, Globe, Heart, MapPin, ShoppingBag, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className="fixed z-50 top-0 left-0 right-0 w-full px-4 py-3 flex items-center justify-between border-b border-gray-200 bg-white">
      {/* Left section - Logo */}
      <Link href="/" className="flex items-center">
        <div className="relative w-8 h-12">
          <Image
            src="/images/res-logo.jpg"
            alt="Taba"
            layout="fill"
            objectFit="contain"
            className="cursor-pointer"
            // height={100}
            // width={100}
          />
        </div>
      </Link>

      {/* Middle section - Location and Time */}
      <div className="flex items-center space-x-6 flex-1 max-w-2xl ml-8">
        <div className="flex items-center space-x-2 text-gray-700">
          <MapPin className="w-5 h-5" />
          <span className="text-sm">your street Dhaka</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <Clock className="w-5 h-5" />
          <span className="text-sm">Time Standard (55 - 75 mins)</span>
        </div>
      </div>

      {/* Right section - User controls */}
      <div className="flex items-center space-x-6">
        {/* User dropdown */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <User2 className="w-5 h-5 text-gray-700" />
          <span className="text-sm text-gray-700">meherab</span>
        </div>

        {/* Language selector */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Globe className="w-5 h-5 text-gray-700" />
          <span className="text-sm text-gray-700">EN</span>
        </div>

        {/* Favorites */}
        <button className="text-gray-700">
          <Heart className="w-5 h-5" />
        </button>

        {/* Cart */}
        <button className="flex items-center space-x-1 bg-pink-50 px-3 py-1 rounded-full">
          <ShoppingBag className="w-5 h-5 text-pink-600" />
          <span className="text-pink-600 font-medium">2</span>
        </button>
      </div>
    </nav>
  );
};

export default Header;


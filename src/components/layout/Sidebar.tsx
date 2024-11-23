/* eslint-disable @typescript-eslint/no-explicit-any */
import { Home, Settings, Users } from "lucide-react";

export default function Sidebar({ isOpen }:any) {
  return (
    <aside
      className={`fixed top-14 left-0 h-full bg-white text-black w-64 p-4 transform ${
        isOpen ? "translate-x-0" : "-translate-x-64"
      } transition-transform duration-300 ease-in-out z-40`}
    >
      <nav>
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
              <Users className="w-5 h-5" />
              <span>Users</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center space-x-2 hover:text-gray-400">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
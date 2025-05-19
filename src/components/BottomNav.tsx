import { Link, useLocation } from "@remix-run/react";
import { User, Home, MessageSquare } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 border-t bg-black flex items-center justify-around z-50">
      <Link 
        to="/profile" 
        className={`flex flex-col items-center justify-center w-1/3 ${
          isActive('/profile') ? 'text-white' : 'text-gray-400'
        }`}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
      
      <Link 
        to="/" 
        className={`flex flex-col items-center justify-center w-1/3 ${
          isActive('/') ? 'text-white' : 'text-gray-400'
        }`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">For You</span>
      </Link>
      
      <Link 
        to="/messages" 
        className={`flex flex-col items-center justify-center w-1/3 ${
          isActive('/messages') ? 'text-white' : 'text-gray-400'
        }`}
      >
        <MessageSquare size={24} />
        <span className="text-xs mt-1">Messages</span>
      </Link>
    </div>
  );
}
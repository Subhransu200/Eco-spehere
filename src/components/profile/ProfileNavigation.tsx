
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Users, CalendarDays } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProfileNavigation = () => {
  const navItems = [
    { icon: <Bookmark className="h-5 w-5" />, label: "Saved items", path: "/saved" },
    { icon: <Users className="h-5 w-5" />, label: "Groups", path: "/groups" },
    { icon: <CalendarDays className="h-5 w-5" />, label: "Events", path: "/events" },
  ];

  return (
    <Card>
      <CardContent className="p-0">
        <ul>
          {navItems.map((item, index) => (
            <li key={item.label} className={index !== 0 ? "border-t" : ""}>
              <Link 
                to={item.path} 
                className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

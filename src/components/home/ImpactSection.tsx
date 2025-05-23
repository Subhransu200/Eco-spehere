
import React from 'react';
import { 
  TreePine, 
  Trash2, 
  Droplets, 
  Users, 
  ArrowUpRight,
  ChevronRight 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

// Mock data for impact statistics
const impactStats = [
  {
    id: 1,
    title: "Trees Planted",
    icon: <TreePine className="w-8 h-8 text-eco-green" />,
    value: 125876,
    goal: 200000,
    unit: "trees",
    progress: 62.9
  },
  {
    id: 2,
    title: "Waste Collected",
    icon: <Trash2 className="w-8 h-8 text-eco-green" />,
    value: 47258,
    goal: 100000,
    unit: "kg",
    progress: 47.3
  },
  {
    id: 3,
    title: "Water Saved",
    icon: <Droplets className="w-8 h-8 text-eco-green" />,
    value: 2845691,
    goal: 5000000,
    unit: "liters",
    progress: 56.9
  },
  {
    id: 4,
    title: "Active Members",
    icon: <Users className="w-8 h-8 text-eco-green" />,
    value: 28437,
    goal: 50000,
    unit: "people",
    progress: 56.9
  }
];

const ImpactCard = ({ stat }: { stat: typeof impactStats[0] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-eco-green/10 rounded-lg">
          {stat.icon}
        </div>
        <span className="text-xs font-medium text-eco-green bg-eco-green/10 px-2 py-1 rounded-full">
          {stat.progress}%
        </span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{stat.title}</h3>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold text-eco-green-dark">
          {stat.value.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">
          {stat.unit}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-700">
            {stat.value.toLocaleString()} / {stat.goal.toLocaleString()}
          </span>
        </div>
        <Progress value={stat.progress} className="h-2 bg-eco-green/20" />
      </div>
    </div>
  );
};

// Simplified compact version for the sidebar
const SimplifiedImpactCard = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Impact Progress</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {impactStats.map(stat => (
            <div key={stat.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-eco-green/10 rounded-md">
                    {React.cloneElement(stat.icon as React.ReactElement, { className: 'w-4 h-4 text-eco-green' })}
                  </div>
                  <span className="text-sm font-medium">{stat.title}</span>
                </div>
                <span className="text-xs font-medium text-eco-green">
                  {stat.progress}%
                </span>
              </div>
              <Progress value={stat.progress} className="h-1.5 bg-eco-green/20" />
            </div>
          ))}
          
          <Link to="/impact" className="flex items-center justify-center text-sm text-eco-green font-medium mt-2 hover:underline">
            View detailed impact <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

interface ImpactSectionProps {
  simplified?: boolean;
}

const ImpactSection = ({ simplified = false }: ImpactSectionProps) => {
  if (simplified) {
    return <SimplifiedImpactCard />;
  }
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-eco-green/5">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-eco-green-dark mb-4">Our Collective Impact</h2>
          <p className="text-gray-600">
            Together, we're making a measurable difference. Every action counts in our mission to create a more sustainable future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map(stat => (
            <ImpactCard key={stat.id} stat={stat} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/impact" 
            className="inline-flex items-center text-eco-green hover:text-eco-green-dark font-medium"
          >
            Learn how we calculate impact <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

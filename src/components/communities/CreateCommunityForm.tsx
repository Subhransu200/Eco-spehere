
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TreePine, Droplets, Trash2, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CreateCommunityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    image: ''
  });

  const categories = [
    { value: 'Plants', label: 'Plants & Trees', icon: <TreePine className="h-4 w-4" /> },
    { value: 'Water', label: 'Water & Oceans', icon: <Droplets className="h-4 w-4" /> },
    { value: 'Waste', label: 'Waste & Recycling', icon: <Trash2 className="h-4 w-4" /> },
    { value: 'City', label: 'Sustainable City', icon: <MapPin className="h-4 w-4" /> }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || !formData.category) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Community Created!",
      description: `${formData.name} has been created successfully.`
    });
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      location: '',
      image: ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-eco-green-dark">Create Your Community</CardTitle>
        <p className="text-gray-600">Start building your eco-friendly community today</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Community Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter community name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your community's mission and goals"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      {cat.icon}
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Community location (optional)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Community Image URL</label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="Image URL (optional)"
              type="url"
            />
          </div>
          
          <Button type="submit" className="w-full bg-eco-green hover:bg-eco-green-dark">
            Create Community
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateCommunityForm;

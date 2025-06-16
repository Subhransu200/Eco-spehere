
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, Plus, Edit, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  sales: number;
  image: string;
}

export const MarketplaceCatalog = () => {
  const [products] = React.useState<Product[]>([
    {
      id: 1,
      name: "Eco-Friendly Water Bottle",
      price: 24.99,
      status: "active",
      sales: 156,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8"
    },
    {
      id: 2,
      name: "Bamboo Phone Case",
      price: 18.99,
      status: "active",
      sales: 89,
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04"
    },
    {
      id: 3,
      name: "Solar Charger",
      price: 45.99,
      status: "out_of_stock",
      sales: 67,
      image: "https://images.unsplash.com/photo-1620634415912-42df3548d41f"
    }
  ]);

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-eco-green" />
            My Products ({products.length} products)
          </div>
          <Button className="bg-eco-green hover:bg-eco-green-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.sales} sales</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-semibold text-eco-green">${product.price}</p>
                <Badge className={getStatusColor(product.status)}>
                  {product.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

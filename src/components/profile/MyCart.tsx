
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendor: string;
}

export const MyCart = () => {
  const [cartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      price: 12.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
      vendor: "EcoBrush"
    },
    {
      id: 2,
      name: "Reusable Produce Bags",
      price: 15.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1610466896727-bd4cf6877cdb",
      vendor: "GreenShopper"
    }
  ]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-eco-green" />
          My Cart ({cartItems.length} items)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-500">By {item.vendor}</p>
              <p className="font-semibold text-eco-green">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total: ${total.toFixed(2)}</span>
          </div>
          <Button className="w-full bg-eco-green hover:bg-eco-green-dark">
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

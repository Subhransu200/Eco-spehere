
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Eye } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  items: number;
  trackingNumber?: string;
}

export const MyOrders = () => {
  const [orders] = React.useState<Order[]>([
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      total: 45.97,
      status: "delivered",
      items: 3,
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      total: 28.99,
      status: "shipped",
      items: 1,
      trackingNumber: "TRK987654321"
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-05",
      total: 67.95,
      status: "processing",
      items: 4
    }
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-eco-green" />
          My Orders ({orders.length} orders)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold">{order.id}</h4>
                <p className="text-sm text-gray-500">Ordered on {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">{order.items} item(s)</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-eco-green">${order.total.toFixed(2)}</p>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            {order.trackingNumber && (
              <p className="text-sm text-gray-600 mb-3">
                Tracking: {order.trackingNumber}
              </p>
            )}
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                View Details
              </Button>
              {order.status === 'delivered' && (
                <Button variant="outline" size="sm">
                  Reorder
                </Button>
              )}
              {order.trackingNumber && (
                <Button variant="outline" size="sm">
                  Track Package
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

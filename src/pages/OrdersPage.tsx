
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { Edit, X } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

// Define an interface for the order structure based on your table
interface Order {
  id: string;
  order_date: string;
  status: string;
  total_price: number;
  payment_method: string;
  shipping_location: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define a type for the raw order data from Supabase
interface RawOrder {
  id: string;
  order_date: string;
  status: string;
  total_price: number;
  payment_method: string | null;
  shipping_location: string;
  items: Json;
  user_id: string | null;
}

const statusColors: Record<string, string> = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Shipped': 'bg-purple-100 text-purple-800',
  'Delivered': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editStatus, setEditStatus] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('order_date', { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        // Transform raw data to match Order interface
        const transformedOrders: Order[] = (data as RawOrder[]).map(rawOrder => ({
          id: rawOrder.id,
          order_date: rawOrder.order_date,
          status: rawOrder.status,
          total_price: rawOrder.total_price,
          payment_method: rawOrder.payment_method || 'Credit Card',
          shipping_location: rawOrder.shipping_location,
          // Parse the items JSON into OrderItem[]
          items: Array.isArray(rawOrder.items) 
            ? rawOrder.items.map((item: any) => ({
                id: item.id || '',
                name: item.name || '',
                price: item.price || 0,
                quantity: item.quantity || 0
              }))
            : []
        }));

        setOrders(transformedOrders);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError(err.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'Cancelled' })
        .eq('id', orderId)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Update the local state
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'Cancelled' } 
          : order
      ));

      setIsDialogOpen(false);
      toast({
        title: "Order Cancelled",
        description: "Your order has been successfully cancelled.",
      });
    } catch (err: any) {
      console.error("Error cancelling order:", err);
      toast({
        title: "Error",
        description: "Failed to cancel your order. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: editStatus })
        .eq('id', selectedOrder.id)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Update the local state
      setOrders(orders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, status: editStatus } 
          : order
      ));

      setIsEditing(false);
      toast({
        title: "Order Updated",
        description: "Your order status has been successfully updated.",
      });
    } catch (err: any) {
      console.error("Error updating order:", err);
      toast({
        title: "Error",
        description: "Failed to update your order. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const canCancel = (status: string) => {
    return ['Pending', 'Processing'].includes(status);
  };

  const canEdit = (status: string) => {
    return !['Delivered', 'Cancelled'].includes(status);
  };

  return (
    <PageLayout requireAuth={true}>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Order History</h1>
          <p className="text-lg text-muted-foreground mb-6">Review and manage your past purchases.</p>
        </div>
      </section>

      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : orders.length === 0 ? (
              <p>You have no orders yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                      <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusColors[order.status] || ""}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{order.payment_method || "Credit Card"}</TableCell>
                      <TableCell className="text-right">${order.total_price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mr-2"
                          onClick={() => handleViewOrder(order)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.id.slice(0, 8)} placed on {selectedOrder && new Date(selectedOrder.order_date).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  {isEditing ? (
                    <select 
                      value={editStatus} 
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full mt-1 p-2 border rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <div className="flex items-center">
                      <Badge variant="outline" className={statusColors[selectedOrder.status] || ""}>
                        {selectedOrder.status}
                      </Badge>
                      {canEdit(selectedOrder.status) && (
                        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="ml-2 h-6 w-6">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <p className="capitalize">{selectedOrder.payment_method || "Credit Card"}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shipping Address</p>
                <p>{selectedOrder.shipping_location}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Order Items</p>
                <div className="border rounded-md p-2 mt-1">
                  {selectedOrder.items && selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 font-bold">
                    <p>Total</p>
                    <p>${selectedOrder.total_price.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex sm:justify-between">
                {isEditing ? (
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditStatus(selectedOrder.status);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateStatus}>Save Changes</Button>
                  </div>
                ) : (
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Close
                    </Button>
                    {canCancel(selectedOrder.status) && (
                      <Button 
                        variant="destructive"
                        onClick={() => handleCancelOrder(selectedOrder.id)}
                        className="ml-auto"
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default OrdersPage;

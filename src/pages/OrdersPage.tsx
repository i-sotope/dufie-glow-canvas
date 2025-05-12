import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client'; // Corrected path
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
import PageLayout from "@/components/PageLayout";

// Define an interface for the order structure based on your table
interface Order {
  id: string; // Assuming id is uuid, but represented as string here
  order_date: string; // Or Date object, depending on how you want to handle it
  status: string;
  total_price: number;
  // Add other fields if needed, e.g., shipping_location, items
}

// Remove the hardcoded orders array
// const orders = [
//   {
//     id: "ORD001",
//     date: "2024-05-15",
//     status: "Shipped",
//     total: "$120.50",
//   },
//   {
//     id: "ORD002",
//     date: "2024-05-10",
//     status: "Delivered",
//     total: "$85.00",
//   },
//   {
//     id: "ORD003",
//     date: "2024-04-28",
//     status: "Delivered",
//     total: "$210.75",
//   },
// ];

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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
        // Optionally handle the case where the user is not logged in yet
        // For a page requiring auth, you might redirect or show a message
        // For now, we just prevent fetching if no user.
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('orders') // Make sure 'orders' is your table name
          .select('id, order_date, status, total_price') // Select the columns you need
          .eq('user_id', user.id) // Filter by the logged-in user's ID
          .order('order_date', { ascending: false }); // Order by date, newest first

        if (fetchError) {
          throw fetchError;
        }

        // Map data to Order interface if necessary (adjust based on actual table structure)
        setOrders(data as Order[] || []);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError(err.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]); // Re-fetch orders when the user state changes

  return (
    <PageLayout requireAuth={true}>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Order History</h1>
          <p className="text-lg text-muted-foreground mb-6">Review your past purchases.</p>
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
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell className="text-right">${order.total_price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default OrdersPage; 
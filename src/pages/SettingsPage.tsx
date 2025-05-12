import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/PageLayout";

const SettingsPage: React.FC = () => {
  return (
    <PageLayout requireAuth={true}>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Settings</h1>
          <p className="text-lg text-muted-foreground mb-6">Manage your account settings and preferences.</p>
        </div>
      </section>

      <div className="container mx-auto py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Password Change Card */}
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          {/* Notification Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage your email notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-4">
                <Label htmlFor="newsletter" className="flex flex-col space-y-1">
                  <span>Newsletter</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive updates about new products and promotions.
                  </span>
                </Label>
                <Switch id="newsletter" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between space-x-4">
                <Label htmlFor="order-updates" className="flex flex-col space-y-1">
                  <span>Order Updates</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Get notified about your order status.
                  </span>
                </Label>
                <Switch id="order-updates" defaultChecked />
              </div>
              {/* Add more notification toggles here */}
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          {/* Address Management (Placeholder) */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Manage Addresses</CardTitle>
              <CardDescription>Add or update your shipping addresses.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for address list and add/edit forms */}
              <p className="text-muted-foreground">Address management functionality coming soon.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Add New Address</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage; 
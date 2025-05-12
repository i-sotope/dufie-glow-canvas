import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const ProfilePage: React.FC = () => {
  // Placeholder user data - replace with actual data fetching
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatarUrl: "https://github.com/shadcn.png", // Example avatar
  };

  return (
    <PageLayout requireAuth={true}>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Profile</h1>
          <p className="text-lg text-muted-foreground mb-6">View and update your account details.</p>
        </div>
      </section>

      <div className="container mx-auto py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            {/* Add more profile fields here as needed */}
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ProfilePage; 
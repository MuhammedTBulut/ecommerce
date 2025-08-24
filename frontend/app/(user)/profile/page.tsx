'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/stores/auth';
import { User, Edit, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleSave = () => {
    if (editedUser) {
      setUser(editedUser);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Please Login</h1>
          <p className="text-muted-foreground mb-8">
            You need to be logged in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={editedUser?.name || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                    />
                  ) : (
                    <p className="py-2">{user.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  {isEditing ? (
                    <Input
                      value={editedUser?.email || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, email: e.target.value} : null)}
                    />
                  ) : (
                    <p className="py-2">{user.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <p className="py-2 capitalize">{user.role}</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">Change your password</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground">Manage your email preferences</p>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground">Control your privacy options</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Addresses */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Home Address</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Default</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    123 Main Street<br />
                    Anytown, ST 12345<br />
                    United States
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Add New Address</Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-600">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
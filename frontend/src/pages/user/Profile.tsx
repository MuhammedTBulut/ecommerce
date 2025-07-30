import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { userService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import type { UserUpdateDTO } from '../../types/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';

const Profile: React.FC = () => {
  const queryClient = useQueryClient();
  const { user, setAuth } = useAuthStore();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserUpdateDTO>();

  React.useEffect(() => {
    if (profile) {
      reset(profile);
    }
  }, [profile, reset]);

  const updateProfileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (updatedUser) => {
      if (user) {
        setAuth({ ...user, ...updatedUser }, useAuthStore.getState().token!);
      }
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: userService.deleteAccount,
    onSuccess: () => {
      toast.success('Account deleted successfully');
      useAuthStore.getState().clearAuth();
      window.location.href = '/';
    },
    onError: () => {
      toast.error('Failed to delete account');
    },
  });

  const onSubmit = (data: UserUpdateDTO) => {
    updateProfileMutation.mutate(data);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      deleteAccountMutation.mutate();
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 rounded mb-6 w-1/3"></div>
          <div className="bg-gray-300 h-64 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Full name must be at least 2 characters',
              },
            })}
          />

          <Input
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                className="input-field"
                {...register('gender')}
              >
                <option value="">Select gender</option>
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
            </div>

            <Input
              id="birthDate"
              label="Birth Date"
              type="date"
              {...register('birthDate')}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="submit"
              isLoading={updateProfileMutation.isPending}
            >
              Update Profile
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 border-red-200">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button
          variant="danger"
          onClick={handleDeleteAccount}
          isLoading={deleteAccountMutation.isPending}
        >
          Delete Account
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
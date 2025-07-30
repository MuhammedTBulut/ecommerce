import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { PlusIcon, CalendarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { supportService } from '../../services/adminService';
import type { SupportTicketDTO, SupportTicketCreateDTO } from '../../types/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Support: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: tickets, isLoading } = useQuery({
    queryKey: ['support-tickets'],
    queryFn: supportService.getTickets,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupportTicketCreateDTO>();

  const createTicketMutation = useMutation({
    mutationFn: supportService.createTicket,
    onSuccess: () => {
      toast.success('Support ticket created successfully!');
      queryClient.invalidateQueries({ queryKey: ['support-tickets'] });
      setShowCreateForm(false);
      reset();
    },
    onError: () => {
      toast.error('Failed to create support ticket');
    },
  });

  const onSubmit = (data: SupportTicketCreateDTO) => {
    createTicketMutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600 mt-2">Get help with your questions and issues</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New Support Ticket</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="subject"
              label="Subject"
              placeholder="Brief description of your issue"
              error={errors.subject?.message}
              {...register('subject', {
                required: 'Subject is required',
                minLength: {
                  value: 5,
                  message: 'Subject must be at least 5 characters',
                },
              })}
            />

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="input-field"
                placeholder="Please provide detailed information about your issue..."
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 20,
                    message: 'Description must be at least 20 characters',
                  },
                })}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <Button
                type="submit"
                isLoading={createTicketMutation.isPending}
              >
                Create Ticket
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Tickets List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-24 rounded"></div>
            ))}
          </div>
        ) : !tickets || tickets.length === 0 ? (
          <Card className="p-8 text-center">
            <ExclamationTriangleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No support tickets</h3>
            <p className="text-gray-600 mb-4">You haven't created any support tickets yet.</p>
            <Button onClick={() => setShowCreateForm(true)}>
              Create your first ticket
            </Button>
          </Card>
        ) : (
          tickets.map((ticket: SupportTicketDTO) => (
            <Card key={ticket.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'Resolved'
                          ? 'bg-green-100 text-green-800'
                          : ticket.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                    {ticket.resolvedAt && (
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Resolved {new Date(ticket.resolvedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Support;
import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Calendar, User, Tag, AlertCircle } from 'lucide-react';

// Mock data - replace with your actual data
const mockUsers = [
  { id: '1', name: 'John Doe', avatar: 'JD' },
  { id: '2', name: 'Jane Smith', avatar: 'JS' },
  { id: '3', name: 'Mike Johnson', avatar: 'MJ' }
];

const mockLabels = [
  { id: '1', name: 'Bug', color: '#ef4444' },
  { id: '2', name: 'Feature', color: '#3b82f6' },
  { id: '3', name: 'Enhancement', color: '#10b981' },
  { id: '4', name: 'Documentation', color: '#f59e0b' }
];

const AddCardButton = ({ onAddCard, listId }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium',
    selectedLabels: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);

  // Focus on title when form opens
  useEffect(() => {
    if (showForm && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showForm]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCard = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        assignedTo: formData.assignedTo || null,
        dueDate: formData.dueDate || null,
        priority: formData.priority,
        labels: mockLabels.filter(label => formData.selectedLabels.includes(label.id)),
        listId,
        position: 0, // Will be handled by backend
        createdAt: new Date().toISOString()
      };

      onAddCard(newCard);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: '',
        priority: 'medium',
        selectedLabels: []
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating card:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      assignedTo: '',
      dueDate: '',
      priority: 'medium',
      selectedLabels: []
    });
    setShowForm(false);
  };

  const toggleLabel = (labelId) => {
    setFormData(prev => ({
      ...prev,
      selectedLabels: prev.selectedLabels.includes(labelId)
        ? prev.selectedLabels.filter(id => id !== labelId)
        : [...prev.selectedLabels, labelId]
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full p-2 text-left text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2 group"
      >
        <Plus className="w-4 h-4 group-hover:text-gray-700" />
        Add a card
      </button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="space-y-3">
        {/* Title Input */}
        <div>
          <textarea
            ref={textareaRef}
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter a title for this card..."
            className="w-full p-2 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
            required
          />
        </div>

        {/* Quick Actions Row */}
        <div className="flex gap-2 flex-wrap">
          {/* Assign User */}
          <select
            value={formData.assignedTo}
            onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
            className="px-3 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">👤 Assign</option>
            {mockUsers.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {/* Due Date */}
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            className="px-3 py-1 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Priority */}
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
            className={`px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getPriorityColor(formData.priority)}`}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Labels */}
        <div>
          <div className="text-xs text-gray-600 mb-1">Labels</div>
          <div className="flex gap-1 flex-wrap">
            {mockLabels.map(label => (
              <button
                key={label.id}
                type="button"
                onClick={() => toggleLabel(label.id)}
                className={`px-2 py-1 text-xs rounded-md border transition-all duration-200 ${
                  formData.selectedLabels.includes(label.id)
                    ? 'text-white border-transparent shadow-sm'
                    : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: formData.selectedLabels.includes(label.id) ? label.color : undefined
                }}
              >
                {label.name}
              </button>
            ))}
          </div>
        </div>

        {/* Description (Optional) */}
        <div>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Add a more detailed description..."
            className="w-full p-2 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            rows="3"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSubmit}
            disabled={!formData.title.trim() || isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors duration-200"
          >
            {isSubmitting ? 'Adding...' : 'Add Card'}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none text-sm transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage component
const KanbanList = () => {
  const [cards, setCards] = useState([
    {
      id: '1',
      title: 'Design new homepage',
      description: 'Create wireframes and mockups for the new homepage design',
      assignedTo: '1',
      dueDate: '2024-01-15',
      priority: 'high',
      labels: [{ id: '2', name: 'Feature', color: '#3b82f6' }],
      createdAt: '2024-01-10T10:00:00Z'
    }
  ]);

  const handleAddCard = (newCard) => {
    setCards(prev => [newCard, ...prev]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-80 bg-gray-100 rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">To Do</h3>
        <span className="text-sm text-gray-500">{cards.length}</span>
      </div>
      
      <div className="space-y-3">
        {/* Existing Cards */}
        {cards.map(card => {
          const assignedUser = mockUsers.find(user => user.id === card.assignedTo);
          
          return (
            <div key={card.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow duration-200">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">{card.title}</h4>
                
                {card.description && (
                  <p className="text-sm text-gray-600">{card.description}</p>
                )}
                
                {/* Labels */}
                {card.labels.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {card.labels.map(label => (
                      <span
                        key={label.id}
                        className="px-2 py-1 text-xs text-white rounded-md"
                        style={{ backgroundColor: label.color }}
                      >
                        {label.name}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Card Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Priority */}
                    <span className={`px-2 py-1 text-xs rounded-md ${getPriorityColor(card.priority)}`}>
                      {card.priority}
                    </span>
                    
                    {/* Due Date */}
                    {card.dueDate && (
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(card.dueDate)}
                      </span>
                    )}
                  </div>
                  
                  {/* Assigned User */}
                  {assignedUser && (
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                        {assignedUser.avatar}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Add Card Button */}
        <AddCardButton onAddCard={handleAddCard} listId="list-1" />
      </div>
    </div>
  );
};

export default KanbanList;
'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface MenuItem {
  id: number;
  title: string;
  description: string | null;
  price: number;
  category: string;
  isAvailable: boolean;
  titleDe: string;
  titleEn: string;
  descriptionDe: string | null;
  descriptionEn: string | null;
  categoryDe: string;
  categoryEn: string;
  allergens: string | null;
  imageUrl: string | null;
}

export default function MenuCRUD() {
  const t = useTranslations('admin');
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch menu items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/menu', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        setError(t('error_loading_menu'));
      }
    } catch (error) {
      setError(t('error_loading_menu'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(items.map(item => item.categoryDe))];

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.categoryDe === selectedCategory);

  // Delete item
  const handleDelete = async (id: number) => {
    if (!confirm(t('delete_item_confirm'))) return;
    
    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        setItems(items.filter(item => item.id !== id));
      } else {
        setError(t('error_deleting_item'));
      }
    } catch (error) {
      setError(t('error_deleting_item'));
    }
  };

  // Save item (create or update)
  const handleSaveItem = async (itemData: Omit<MenuItem, 'id'>) => {
    try {
      if (editingItem) {
        // Update existing item
        const response = await fetch(`/api/admin/menu/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
          credentials: 'include'
        });
        
        if (response.ok) {
          const updatedItem = await response.json();
          setItems(items.map(item => 
            item.id === editingItem.id ? { ...updatedItem, id: editingItem.id } : item
          ));
          setEditingItem(null);
        } else {
          setError(t('error_updating_item'));
        }
      } else {
        // Create new item
        const response = await fetch('/api/admin/menu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
          credentials: 'include'
        });
        
        if (response.ok) {
          const newItem = await response.json();
          setItems([...items, newItem]);
          setShowAddForm(false);
        } else {
          setError(t('error_creating_item'));
        }
      }
    } catch (error) {
      setError(editingItem ? t('error_updating_item') : t('error_creating_item'));
    }
  };

  // Toggle availability
  const toggleAvailability = async (id: number, currentAvailability: boolean) => {
    try {
      const response = await fetch(`/api/admin/menu/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isAvailable: !currentAvailability
        }),
        credentials: 'include'
      });
      
      if (response.ok) {
        setItems(items.map(item => 
          item.id === id 
            ? { ...item, isAvailable: !currentAvailability }
            : item
        ));
      } else {
        setError(t('error_updating_availability'));
      }
    } catch (error) {
      setError(t('error_updating_availability'));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-border rounded-md px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            data-testid="select-category-filter"
          >
            <option value="all">{t('all_categories')}</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <span className="text-muted-foreground">
            {filteredItems.length} {t('of')} {items.length} {t('items')}
          </span>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
          data-testid="button-add-item"
        >
          + {t('new_item')}
        </button>
      </div>

      {/* Menu Items Table */}
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('item')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t('category')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Preis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {item.titleDe}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.titleEn}
                      </div>
                      {item.descriptionDe && (
                        <div className="text-xs text-muted-foreground/80 mt-1 line-clamp-2">
                          {item.descriptionDe}
                        </div>
                      )}
                      {item.allergens && (
                        <div className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded mt-1 inline-block">
                          Allergene: {item.allergens}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {item.categoryDe}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    €{item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleAvailability(item.id, item.isAvailable)}
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        item.isAvailable 
                          ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                          : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                      }`}
                      data-testid={`button-toggle-availability-${item.id}`}
                    >
                      {item.isAvailable ? 'Verfügbar' : 'Nicht verfügbar'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-primary hover:text-primary/80 transition-colors"
                      data-testid={`button-edit-${item.id}`}
                    >
                      {t('edit')}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-destructive hover:text-destructive/80 transition-colors"
                      data-testid={`button-delete-${item.id}`}
                    >
                      {t('delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t('no_items_found')}
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddForm || editingItem) && (
        <MenuForm
          item={editingItem}
          onSave={handleSaveItem}
          onCancel={() => {
            setEditingItem(null);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
}

// Menu Form Component
interface MenuFormProps {
  item: MenuItem | null;
  onSave: (itemData: Omit<MenuItem, 'id'>) => void;
  onCancel: () => void;
}

function MenuForm({ item, onSave, onCancel }: MenuFormProps) {
  const t = useTranslations('admin');
  const [formData, setFormData] = useState({
    titleDe: item?.titleDe || '',
    titleEn: item?.titleEn || '',
    descriptionDe: item?.descriptionDe || '',
    descriptionEn: item?.descriptionEn || '',
    price: item?.price || 0,
    categoryDe: item?.categoryDe || '',
    categoryEn: item?.categoryEn || '',
    allergens: item?.allergens || '',
    imageUrl: item?.imageUrl || '',
    isAvailable: item?.isAvailable ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.titleDe.trim()) newErrors.titleDe = 'German title is required';
    if (!formData.titleEn.trim()) newErrors.titleEn = 'English title is required';
    if (!formData.categoryDe.trim()) newErrors.categoryDe = 'German category is required';
    if (!formData.categoryEn.trim()) newErrors.categoryEn = 'English category is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSave(formData as Omit<MenuItem, 'id'>);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setFormData(prev => ({
          ...prev,
          imageUrl: result.imageUrl
        }));
      } else {
        alert('Failed to upload image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-lg border border-border p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {item ? t('edit_item') : t('new_item')}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title (German) *
              </label>
              <input
                type="text"
                value={formData.titleDe}
                onChange={(e) => handleInputChange('titleDe', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.titleDe ? 'border-destructive' : 'border-border'
                }`}
                placeholder="e.g., Spaghetti Carbonara"
                required
              />
              {errors.titleDe && <p className="text-destructive text-sm mt-1">{errors.titleDe}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title (English) *
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => handleInputChange('titleEn', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.titleEn ? 'border-destructive' : 'border-border'
                }`}
                placeholder="e.g., Spaghetti Carbonara"
                required
              />
              {errors.titleEn && <p className="text-destructive text-sm mt-1">{errors.titleEn}</p>}
            </div>
          </div>

          {/* Description Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description (German)
              </label>
              <textarea
                rows={3}
                value={formData.descriptionDe}
                onChange={(e) => handleInputChange('descriptionDe', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Beschreibung des Gerichts..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description (English)
              </label>
              <textarea
                rows={3}
                value={formData.descriptionEn}
                onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Description of the dish..."
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dish Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Upload an image to display the dish photo (JPG, PNG, max 5MB)
            </p>
            {uploading && (
              <div className="text-sm text-blue-600 mt-2">
                Uploading image...
              </div>
            )}
            {formData.imageUrl && (
              <div className="mt-2">
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="w-24 h-24 object-cover rounded-md border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <p className="text-xs text-green-600 mt-1">Image uploaded successfully</p>
              </div>
            )}
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category (German) *
              </label>
              <input
                type="text"
                value={formData.categoryDe}
                onChange={(e) => handleInputChange('categoryDe', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.categoryDe ? 'border-destructive' : 'border-border'
                }`}
                placeholder="e.g., Pasta"
                required
              />
              {errors.categoryDe && <p className="text-destructive text-sm mt-1">{errors.categoryDe}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category (English) *
              </label>
              <input
                type="text"
                value={formData.categoryEn}
                onChange={(e) => handleInputChange('categoryEn', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.categoryEn ? 'border-destructive' : 'border-border'
                }`}
                placeholder="e.g., Pasta"
                required
              />
              {errors.categoryEn && <p className="text-destructive text-sm mt-1">{errors.categoryEn}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price (€) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.price ? 'border-destructive' : 'border-border'
                }`}
                placeholder="0.00"
                required
              />
              {errors.price && <p className="text-destructive text-sm mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Allergens and Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Allergens
              </label>
              <input
                type="text"
                value={formData.allergens}
                onChange={(e) => handleInputChange('allergens', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="e.g., Gluten, Dairy, Eggs"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Availability
              </label>
              <select
                value={formData.isAvailable ? 'true' : 'false'}
                onChange={(e) => handleInputChange('isAvailable', e.target.value === 'true')}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-muted-foreground border border-border rounded-md hover:bg-muted/50 transition-colors"
              disabled={isSubmitting}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>}
              {isSubmitting ? t('saving') : (item ? t('update') : t('create'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
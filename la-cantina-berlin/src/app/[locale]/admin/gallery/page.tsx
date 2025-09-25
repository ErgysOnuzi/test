'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, Upload, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';
import AdminGate from '../AdminGate';

export const dynamic = 'force-dynamic';

interface GalleryImage {
  id: number;
  imageUrl: string;
  description: string | null;
  category: string | null;
  alt: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminGalleryPage() {
  const t = useTranslations('admin');
  const locale = useLocale();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ uploaded: number; total: number } | null>(null);

  // Load gallery images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/admin/gallery');
        if (response.ok) {
          const data = await response.json();
          setImages(data);
        } else if (response.status === 401) {
          setError(t('unauthorized_access'));
        } else {
          setError(t('failed_to_load_images'));
        }
      } catch (err) {
        setError(t('network_error_loading_images'));
        console.error('Error fetching gallery images:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm(t('delete_image_confirm'))) {
      try {
        const response = await fetch(`/api/admin/gallery?id=${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setImages(prev => prev.filter(img => img.id !== id));
        } else {
          setError(t('failed_to_delete_image'));
        }
      } catch (err) {
        setError(t('network_error_deleting_image'));
        console.error('Error deleting image:', err);
      }
    }
  };

  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.style.display = 'none';
    
    input.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        await handleBulkUpload(Array.from(files));
      }
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  const handleBulkUpload = async (files: File[]) => {
    if (files.length > 120) {
      setError('Maximum 120 files allowed per upload');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress({ uploaded: 0, total: files.length });

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/admin/bulk-upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        
        // Refresh the gallery to show new images
        const galleryResponse = await fetch('/api/admin/gallery');
        if (galleryResponse.ok) {
          const updatedImages = await galleryResponse.json();
          setImages(updatedImages);
        }

        setUploadProgress({ uploaded: result.uploaded, total: files.length });
        
        if (result.errors > 0) {
          setError(`Upload completed: ${result.uploaded} successful, ${result.errors} failed. ${result.errorMessages.join(', ')}`);
        } else {
          setError(`Successfully uploaded ${result.uploaded} images!`);
        }
      } else {
        setError('Failed to upload images');
      }
    } catch (err) {
      setError('Network error while uploading images');
      console.error('Error uploading images:', err);
    } finally {
      setUploading(false);
      setTimeout(() => {
        setUploadProgress(null);
        setError(null);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <AdminGate>
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </AdminGate>
    );
  }

  return (
    <AdminGate>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-primary mb-2">{t('gallery_management_title')}</h1>
              <p className="text-muted-foreground text-lg">{t('gallery_management_desc')}</p>
            </div>
            <Link 
              href={`/${locale}/admin`} 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
              data-testid="link-back-to-dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('back_to_dashboard')}
            </Link>
          </div>
          
          {error && (
            <div className={`border px-4 py-3 rounded-lg mb-6 ${
              error.includes('Successfully') 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-destructive/10 border-destructive/20 text-destructive'
            }`}>
              {error}
            </div>
          )}

          <div className="mb-6">
            <button
              onClick={handleFileSelect}
              disabled={uploading}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-upload-image"
            >
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Upload Images (up to 120)'}
            </button>
            
            {uploadProgress && (
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Uploading: {uploadProgress.uploaded} / {uploadProgress.total} images
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(uploadProgress.uploaded / uploadProgress.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover-elevate transition-colors"
                data-testid={`gallery-image-${image.id}`}
              >
                <div className="aspect-square relative">
                  {image.category === 'instagram' ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                      <div className="text-white text-center p-4">
                        <div className="text-2xl mb-2">📷</div>
                        <div className="text-sm font-medium">Instagram Post</div>
                        <a 
                          href={image.imageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs underline mt-1 block hover:text-gray-200"
                        >
                          View Post
                        </a>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={image.imageUrl}
                      alt={image.description || 'Gallery image'}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => console.log('Edit functionality coming soon')}
                      className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-md hover:bg-background transition-colors"
                      data-testid={`button-edit-${image.id}`}
                    >
                      <Edit2 className="w-4 h-4 text-foreground" />
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-2 bg-destructive/80 backdrop-blur-sm border border-destructive/20 rounded-md hover:bg-destructive transition-colors"
                      data-testid={`button-delete-${image.id}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive-foreground" />
                    </button>
                  </div>
                </div>
                {image.description && (
                  <div className="p-4">
                    <p className="text-sm text-foreground">{image.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('added_on')}: {new Date(image.createdAt || image.created_at).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {images.length === 0 && !loading && (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-4">
                {t('gallery_empty_state')}
              </p>
              <button
                onClick={handleFileSelect}
                disabled={uploading}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload Images (up to 120)'}
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminGate>
  );
}
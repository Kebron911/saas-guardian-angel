
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const BlogStorageSetup = () => {
  const [status, setStatus] = useState<'checking' | 'creating' | 'exists' | 'created' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStorage = async () => {
      try {
        setStatus('checking');
        
        // Check if the blog_images bucket exists
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        
        if (bucketsError) {
          throw bucketsError;
        }
        
        const bucketExists = buckets.some(bucket => bucket.name === 'blog_images');
        
        if (bucketExists) {
          console.log('blog_images bucket already exists');
          setStatus('exists');
          return;
        }
        
        // Create the bucket if it doesn't exist
        setStatus('creating');
        const { error: createError } = await supabase.storage.createBucket('blog_images', {
          public: true
        });
        
        if (createError) {
          throw createError;
        }
        
        console.log('blog_images bucket created successfully');
        setStatus('created');
        
      } catch (err: any) {
        console.error('Error setting up blog storage:', err);
        setError(err.message);
        setStatus('error');
      }
    };

    initializeStorage();
  }, []);

  if (status === 'checking' || status === 'creating') {
    return null;
  }

  if (status === 'error') {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 dark:bg-amber-900/30 dark:border-amber-700">
        <div className="flex">
          <AlertTriangle className="h-6 w-6 text-amber-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">Image Storage Warning</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Failed to set up image storage: {error}
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              Image uploads may not work. Please create a 'blog_images' bucket in your Supabase project manually.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'created') {
    return (
      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 dark:bg-green-900/30 dark:border-green-700">
        <div className="flex">
          <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-green-800 dark:text-green-400">Image Storage Ready</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Blog image storage has been set up successfully.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BlogStorageSetup;

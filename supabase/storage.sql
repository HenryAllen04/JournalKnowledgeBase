-- Storage configuration for LifeKB project
-- Create a storage bucket for media files with appropriate RLS policies

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for the media bucket

-- Policy for users to insert their own files
CREATE POLICY "Users can upload their own media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy for users to select their own files
CREATE POLICY "Users can view their own media" ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy for users to update their own files
CREATE POLICY "Users can update their own media" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy for users to delete their own files
CREATE POLICY "Users can delete their own media" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'media' AND
    auth.uid()::text = (storage.foldername(name))[1]
  ); 
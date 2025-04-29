-- Create necessary tables for LifeKB
-- This migration sets up the initial schema with Row-Level Security

-- Enable Row-Level Security extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a table to store entries
CREATE TABLE IF NOT EXISTS public.entry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  transcript TEXT,
  embedding VECTOR(1536),
  media_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create a table to store tags
CREATE TABLE IF NOT EXISTS public.tag (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, name)
);

-- Create a junction table to associate entries with tags
CREATE TABLE IF NOT EXISTS public.entry_tag (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entry_id UUID NOT NULL REFERENCES public.entry(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tag(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (entry_id, tag_id)
);

-- Set up Row-Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE public.entry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tag ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entry_tag ENABLE ROW LEVEL SECURITY;

-- Create policies for entry table
CREATE POLICY "Users can insert their own entries" 
  ON public.entry FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own entries" 
  ON public.entry FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own entries" 
  ON public.entry FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own entries" 
  ON public.entry FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for tag table
CREATE POLICY "Users can insert their own tags" 
  ON public.tag FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own tags" 
  ON public.tag FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tags" 
  ON public.tag FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tags" 
  ON public.tag FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for entry_tag junction table
CREATE POLICY "Users can insert their own entry_tags" 
  ON public.entry_tag FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.entry 
      WHERE entry.id = entry_id AND entry.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own entry_tags" 
  ON public.entry_tag FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.entry 
      WHERE entry.id = entry_id AND entry.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own entry_tags" 
  ON public.entry_tag FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.entry 
      WHERE entry.id = entry_id AND entry.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS entry_user_id_idx ON public.entry(user_id);
CREATE INDEX IF NOT EXISTS tag_user_id_idx ON public.tag(user_id);
CREATE INDEX IF NOT EXISTS entry_tag_entry_id_idx ON public.entry_tag(entry_id);
CREATE INDEX IF NOT EXISTS entry_tag_tag_id_idx ON public.entry_tag(tag_id);

-- Enable pgvector extension for vector embeddings
CREATE EXTENSION IF NOT EXISTS vector; 
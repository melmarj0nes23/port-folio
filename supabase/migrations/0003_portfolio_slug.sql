-- Migration: Add slug column to portfolios table
ALTER TABLE public.portfolios ADD COLUMN slug text UNIQUE;

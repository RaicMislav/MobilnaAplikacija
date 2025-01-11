import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edsveqqwdvthidyggprr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkc3ZlcXF3ZHZ0aGlkeWdncHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MzEyNjYsImV4cCI6MjA1MjIwNzI2Nn0.qeBALzHH30dR5J9ajfulLxq1dZfnS9JCr13ya6afonA'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
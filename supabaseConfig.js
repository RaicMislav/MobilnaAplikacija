import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hielfljrkxmcowvvcgyl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZWxmbGpya3htY293dnZjZ3lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMTI1MzEsImV4cCI6MjA1Mjg4ODUzMX0.UVhS9dDLyQjL7SEG2N9pkqQiDywbwgc0NFmEYNiz58A'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
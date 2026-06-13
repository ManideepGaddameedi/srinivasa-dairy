import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ltzfloharlymlreksszw.supabase.co",

  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0emZsb2hhcmx5bWxyZWtzc3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyMzIwMjQsImV4cCI6MjA5NjgwODAyNH0.nh-7IuqbinosrrHKbmsDgLiSpg8ccjGQgYrsM-DLxC4"
);

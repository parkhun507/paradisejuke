import { createClient } from '@supabase/supabase-js';

// ⚠️ 아래 변수들을 당신의 Supabase 프로젝트 URL과 Anon Key로 교체하세요.
const supabaseUrl = 'https://aymjqznrrxmdisjhedqn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5bWpxem5ycnhtZGlzamhlZHFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MzQzMzUsImV4cCI6MjA3MDAxMDMzNX0.V5tWE9qQOCHcCZiE8a47i4SgaDRuXSiVTjDUa8OUMb8';

// Supabase 클라이언트를 생성하고 내보냅니다.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

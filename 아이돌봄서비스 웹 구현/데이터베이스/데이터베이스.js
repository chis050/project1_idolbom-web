<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
const db = supabase.createClient(supabaseUrl, supabaseKey);

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,   // ✅ 세션 유지
    autoRefreshToken: true, // ✅ 토큰 자동 갱신
  }
});

async function checkAuth() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (session) {
        console.log("로그인 유지 중:", session.user);
        // 사용자 정보를 불러오거나, UI 갱신
    } else {
        console.log("로그인 정보 없음. 로그인 필요");
        // 로그인 페이지로 이동시키거나, 로그인 버튼 표시
    }
}

checkAuth();


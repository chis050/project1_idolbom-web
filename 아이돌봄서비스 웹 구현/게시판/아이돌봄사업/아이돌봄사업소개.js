document.querySelectorAll('.menu-item > a').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault(); // 링크 이동 막기
    const submenu = item.nextElementSibling;
    if (submenu.style.display === 'block') {
      submenu.style.display = 'none';
    } else {
      document.querySelectorAll('.submenu').forEach(s => s.style.display = 'none'); // 다른 메뉴 닫기
      submenu.style.display = 'block';
    }
  });
});

// Supabase 연결
// const supabaseUrl = 'https://kdmvxndklggzyynexiyu.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U';
// const db = supabase.createClient(supabaseUrl, supabaseKey);

// async function showContent(section) {
//     const boardContent = document.getElementById("boardContent");
//     boardContent.innerHTML = `<h2>${section.toUpperCase()}</h2><p>로딩 중...</p>`;

//     try {
//         // DB에서 게시판 데이터 가져오기
//         const { data, error } = await supabase
//             .from('posts') // 'posts' 테이블 (필요 시 실제 테이블명으로 변경)
//             .select('*')
//             .eq('category', section) // 'category' 컬럼으로 분류
//             .order('created_at', { ascending: false });

//         if (error) throw error;

//         if (data.length === 0) {
//             boardContent.innerHTML = `<h2>${section.toUpperCase()}</h2><p>게시물이 없습니다.</p>`;
//             return;
//         }

//         // 게시물 출력
//         boardContent.innerHTML = `<h2>${section.toUpperCase()}</h2>`;
//         data.forEach(post => {
//             const postDiv = document.createElement('div');
//             postDiv.className = 'post';

//             let contentHtml = `<h3>${post.title}</h3><p>${post.content}</p>`;
//             // Storage에서 이미지 URL 가져오기 (optional)
//             if (post.image_path) {
//                 const { data: urlData } = supabase.storage
//                     .from('post-images') // Storage 버킷 이름
//                     .getPublicUrl(post.image_path);
//                 contentHtml += `<img src="${urlData.publicUrl}" alt="게시물 이미지">`;
//             }

//             postDiv.innerHTML = contentHtml;
//             boardContent.appendChild(postDiv);
//         });
//     } catch (error) {
//         boardContent.innerHTML = `<h2>${section.toUpperCase()}</h2><p>오류 발생: ${error.message}</p>`;
//     }

//     sidebar.style.left = "-250px";
// }

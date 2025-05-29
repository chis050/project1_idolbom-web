const supabaseClient = supabase.createClient(
    'https://kdmvxndklggzyynexiyu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbXZ4bmRrbGdnenl5bmV4aXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NDUxMjUsImV4cCI6MjA2MzIyMTEyNX0.iYwGk2isQQxzkvK51S99V21cOZowTooCyzM9jTqcK7U'
);

let currentPage = 1;
const postsPerPage = 10;

document.addEventListener('DOMContentLoaded', () => {
    loadPosts(currentPage);
});

async function loadPosts(page) {
    const from = (page - 1) * postsPerPage;
    const to = from + postsPerPage - 1;

    const { data: posts, error, count } = await supabaseClient
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('board', '자유게시판')
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.error('게시글 불러오기 실패:', error);
        return;
    }

    renderPosts(posts, count);
    renderPagination(count);
}


function renderPosts(posts, totalPosts) {
  const postList = document.getElementById('post-list');
  postList.innerHTML = '';

  posts.forEach((post, index) => {
    const formattedDate = new Date(post.created_at).toLocaleDateString('ko-KR');
    const row = document.createElement('tr');

    const absoluteIndex = totalPosts - ((currentPage - 1) * postsPerPage + index);

    row.innerHTML = `
      <td>${absoluteIndex}</td>
      <td class="title-cell"><a href="#">${post.title}</a></td>
      <td>${post.writer}</td>
      <td>${formattedDate}</td>
      <td>${post.views || 0}</td>
    `;

    postList.appendChild(row);
  });
}

function renderPagination(totalPosts) {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    pagination.innerHTML = ''; // 초기화

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&laquo;';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            loadPosts(currentPage);
        }
    };
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === currentPage) pageBtn.classList.add('active');
        pageBtn.onclick = () => {
            currentPage = i;
            loadPosts(i);
        };
        pagination.appendChild(pageBtn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&raquo;';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            loadPosts(currentPage);
        }
    };
    pagination.appendChild(nextBtn);
}

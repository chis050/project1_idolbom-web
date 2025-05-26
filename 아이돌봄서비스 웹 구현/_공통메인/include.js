function includeHTML(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error("파일 로딩 실패");
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => console.error(error));
}
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginButton').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const stayLoggedIn = document.getElementById('stayLoggedIn').checked;

        if (username && password) {
            // 로그인 로직: 서버에 요청하거나 세션 관리 등을 처리
            // 예시로 로컬 스토리지에 로그인 정보 저장
            localStorage.setItem('username', username);
            localStorage.setItem('stayLoggedIn', stayLoggedIn);

            // 로그인 성공 후 홈 화면으로 이동
            window.location.href = "main.html";  // home.html로 수정하면 홈 화면으로 이동
        } else {
            alert('아이디와 비밀번호를 입력해주세요.');
        }
    });
});
// Lấy các phần tử cần thiết
const modal = document.querySelector('.main__modal');
const closeButton = document.querySelector('.sale-off__close');
const closeButton1 = document.querySelector('.close');
const closesignup = document.querySelector('.sign__button-btn2');
const overlay = document.querySelector('.modal__overlay');
const form = document.querySelector('.sale-off__form');
const loginForm = document.getElementById('login');
const signupLink = document.querySelector('.Signup a');
const loginButton = document.getElementById('login-close'); // Nút "Login"

// Đảm bảo modal không hiển thị khi tải lại trang
modal.classList.remove('active');

// Hiển thị modal khi nhấn vào liên kết "Sign up"
signupLink.addEventListener('click', (e) => {
    e.preventDefault(); // Ngăn hành vi mặc định của liên kết
    modal.classList.add('active'); // Hiển thị modal
    loginForm.style.display = 'none'; // Ẩn form login
});

// Hiển thị lại form login khi nhấn vào nút "Login"
loginButton.addEventListener('click', () => {
    modal.classList.remove('active'); // Ẩn modal
    loginForm.style.display = 'block'; // Hiển thị lại form login
});

// Đóng modal khi nhấn vào nút đóng hoặc overlay
closeButton.addEventListener('click', () => {
    modal.classList.remove('active');
    loginForm.style.display = 'block'; // Hiển thị lại form login nếu cần
});

closesignup.addEventListener('click', () => {
    modal.classList.remove('active');
    loginForm.style.display = 'block'; // Hiển thị lại form login
});

overlay.addEventListener('click', () => {
    modal.classList.remove('active');
    loginForm.style.display = 'block'; // Hiển thị lại form login
});

// Hàm kiểm tra và xử lý form
function checked() {
    const text = document.getElementById('text').value.trim();
    const email = document.getElementById('email').value.trim();
    const emails = document.getElementById('emails').value.trim();
    const user = document.getElementById('user').value.trim();
    const password = document.getElementById('password').value.trim();
    const passwords = document.getElementById('passwords').value.trim();
    const passwordAuthentication = document.getElementById('password-authentication').value.trim();

    // Xóa thông báo lỗi cũ
    document.getElementById('error-text').textContent = "";
    document.getElementById('view-email').textContent = "";
    document.getElementById('error-email').textContent = "";
    document.getElementById('error-user').textContent = "";
    document.getElementById('view-password').textContent = "";
    document.getElementById('error-password').textContent = "";
    document.getElementById('error-password-authentication').textContent = "";

    let valid = true;

    if (!text) {
        document.getElementById('error-text').textContent = "Chưa nhập họ tên!";
        valid = false;
    }
    if (!email) {
        document.getElementById('error-email').textContent = "Chưa nhập email!";
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('error-email').textContent = "Email không hợp lệ!";
        valid = false;
    }
    if (!user) {
        document.getElementById('error-user').textContent = "Chưa nhập tài khoản!";
        valid = false;
    }
    if (!password) {
        document.getElementById('error-password').textContent = "Chưa nhập mật khẩu!";
        valid = false;
    } else if (password.length < 6) {
        document.getElementById('error-password').textContent = "Mật khẩu phải có ít nhất 6 ký tự!";
        valid = false;
    }
    if (password !== passwordAuthentication) {
        document.getElementById('error-password-authentication').textContent = "Mật khẩu xác nhận không khớp!";
        valid = false;
    }
    if (valid) {
        alert("Đăng ký thành công!");
        form.reset();
        modal.classList.remove('active'); // Ẩn modal sau khi đăng ký thành công
    }

    if (!passwords) {
        document.getElementById('view-password').textContent = "Chưa nhập mật khẩu!";
        valid = false;
    } else if (passwords.length < 6) {
        document.getElementById('view-password').textContent = "Mật khẩu phải có ít nhất 6 ký tự!";
        valid = false;
    }
    if (!emails) {
        document.getElementById('view-email').textContent = "Chưa nhập email!";
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emails)) {
        document.getElementById('view-email').textContent = "Email không hợp lệ!";
        valid = false;
    }
}

function reset() {
    // Ẩn form login
    loginForm.style.display = 'none';
}

// Lấy các phần tử cần thiết
const modalClasses = ['.main__modal1', '.view', '.view1', '.view2', '.view3', '.view4'];
const closeButtons = ['.sale-off__close', '#close', '#close1', '#close2', '#close3', '#close4'];
const triggerClasses = ['.hillo', '.hillo2', '.hillo3', '.hillo4', '.hillo5', '.hillo6'];
const overlay1 = document.querySelector('.modal__overlay1');

// Ẩn tất cả các modal khi tải trang
modalClasses.forEach(cls => document.querySelector(cls).classList.remove('active'));

// Hiển thị modal khi nhấn vào trigger
triggerClasses.forEach((trigger, index) => {
    document.querySelector(trigger).addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(modalClasses[index]).classList.add('active');
    });
});

// Đóng modal khi nhấn vào nút đóng hoặc overlay
const closeModal = (index) => {
    document.querySelector(modalClasses[index]).classList.remove('active');
};

closeButtons.forEach((button, index) => {
    document.querySelector(button).addEventListener('click', () => closeModal(index));
});

overlay1.addEventListener('click', () => {
    modalClasses.forEach((cls, index) => closeModal(index));
});

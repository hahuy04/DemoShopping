/*=============== SHOW MENU ===============*/


/*===== MENU SHOW =====*/
/* Validate if constant exists */
const navMenu = document.getElementById('nav-menu');
const navtoggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');



if(navtoggle){
  navtoggle.addEventListener("click", () => {
    navMenu.classList.add('show-menu')
  })
}


/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
  navClose.addEventListener("click", () => {
    navMenu.classList.remove('show-menu')
  })
}
/*===============SHOP======================*/
document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart__container");
    const cartCount = document.getElementById("cart-count");
    const shopButtons = document.querySelectorAll(".shop__button");

    
    // Hàm lấy số lượng sản phẩm từ localStorage
    const savedCartCount = localStorage.getItem("cartCount");
    if (savedCartCount) {
        cartCount.textContent = savedCartCount;
    } else {
        cartCount.textContent = 0; // Đảm bảo có giá trị mặc định nếu chưa có trong localStorage
    }

    // Hàm lưu số lượng sản phẩm vào localStorage
    function saveCartCountToStorage() {
        const itemCount = cartContainer.querySelectorAll(".cart__card").length;
        localStorage.setItem("cartCount", itemCount);
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng và lưu lại vào localStorage
    function updateCartCount() {
        const itemCount = cartContainer.querySelectorAll(".cart__card").length;
        cartCount.textContent = itemCount;
        saveCartCountToStorage();  // Lưu số lượng vào localStorage
    }



    // // Cập nhật số lượng sản phẩm trong giỏ hàng
    // function updateCartCount() {
    //     const items = cartContainer.querySelectorAll(".cart__card");
    //     cartCount.textContent = items.length;
    // }

    // Thêm sản phẩm vào giỏ hàng
    shopButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            
            // Lấy thông tin sản phẩm
            const product = button.closest(".shop__content");
            const productName = product.querySelector(".shop__title").textContent;
            const productPrice = product.querySelector(".shop__price").textContent;
            const productImage = product.querySelector(".shop__img").src;

            // Tạo phần tử mới trong giỏ hàng
            const cartItem = document.createElement("article");
            cartItem.classList.add("cart__card");
            cartItem.innerHTML = `
                <div class="cart__box">
                    <img src="${productImage}" alt="" class="cart__img">
                </div>
                <div class="cart__details">
                    <h3 class="cart__title">${productName}</h3>
                    <span class="cart__price">${productPrice}</span>
                    <div class="cart__amount">
                        <div class="cart__amount-content">
                            <span class="cart__amount-box"><i class="bx bx-minus"></i></span>
                            <span class="cart_amount-number">1</span>
                            <span class="cart__amount-box"><i class="bx bx-plus"></i></span>
                        </div>
                        <i class="bx bx-trash-alt cart__amount-trash"></i>
                    </div>
                </div>
            `;

            // Thêm sản phẩm vào danh sách
            cartContainer.appendChild(cartItem);

            // Cập nhật số lượng sản phẩm
            updateCartCount();
        });
    });

    // Đóng/mở giỏ hàng (nếu cần)
    const cartToggle = document.getElementById("cart-shop");
    const cart = document.getElementById("cart");
    const cartClose = document.getElementById("cart__close");

    cartToggle.addEventListener("click", () => {
        cart.classList.toggle("show-cart");
    });

    cartClose.addEventListener("click", () => {
        cart.classList.remove("show-cart");
    });
});

/*=============== SHOW CART ===============*/


/*===== CART SHOW =====*/
// Hiển thị/ẩn giỏ hàng
// Mở giỏ hàng
// Mở và đóng giỏ hàng
document.addEventListener('DOMContentLoaded', () => {
  // Đảm bảo giỏ hàng và đăng nhập đều bị ẩn khi tải trang
  cart.classList.remove('show_cart');
  login.classList.remove('show-login');
  attachEventListeners(); // Gắn sự kiện ban đầu
  updateCartSummary(); // Cập nhật tổng số và giá
});

// Xử lý giỏ hàng
const cart = document.getElementById('cart');
const cartShop = document.getElementById('cart-shop');
const cartClose = document.querySelector('.cart__close');

// Mở giỏ hàng khi nhấn vào biểu tượng giỏ hàng
cartShop.addEventListener('click', () => {
  cart.classList.add('show_cart');
});

// Đóng giỏ hàng khi nhấn vào nút đóng
cartClose.addEventListener('click', () => {
  cart.classList.remove('show_cart');
});

// Hàm thêm sản phẩm vào giỏ hàng
function addItemToCart(itemName, itemPrice, itemImage) {
  const cartContainer = document.querySelector('.cart__container, .shop__container');
  const newCartItem = `
      <article class="cart__card">
          <div class="cart__box">
              <img src="${itemImage}" alt="" class="cart__img">
          </div>
          <div class="cart__details">
              <h3 class="cart__title">${itemName}</h3>
              <span class="cart__price">$${itemPrice}</span>
              <div class="cart__amount">
                  <div class="cart__amount-content">
                      <span class="cart__amount-box">
                          <i class="bx bx-minus"></i>
                      </span>
                      <span class="cart_amount-number">1</span>
                      <span class="cart__amount-box">
                          <i class="bx bx-plus"></i>
                      </span>
                  </div>
                  <i class="bx bx-trash-alt cart__amount-trash"></i>
              </div>
          </div>
      </article>
  `;
  cartContainer.insertAdjacentHTML('beforeend', newCartItem);
  attachEventListeners(); // Đảm bảo các sự kiện cộng, trừ, xóa được gắn lại
  updateCartSummary(); // Cập nhật số lượng và giá sau khi thêm
}

// Hàm cập nhật số lượng sản phẩm và tổng giá
function updateCartSummary() {
  const cartItems = document.querySelectorAll('.cart__card');
  const totalItemsElement = document.querySelector('.cart__prices-item');
  const totalPriceElement = document.querySelector('.cart__prices-total');
  const cartCount = document.getElementById('cart-count'); // Biểu tượng đếm

  let totalItems = 0;
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const price = parseFloat(item.querySelector('.cart__price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('.cart_amount-number').textContent);
    totalItems += quantity;
    totalPrice += price * quantity;
  });

  // Cập nhật thông tin tổng số sản phẩm và tổng giá
  totalItemsElement.textContent = `${totalItems} Item${totalItems > 1 ? 's' : ''}`;
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

  // Cập nhật biểu tượng giỏ hàng
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// Gắn sự kiện vào các nút "Add to Cart"
document.querySelectorAll('.new_button').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    const itemName = button.getAttribute('data-name');
    const itemPrice = button.getAttribute('data-price');
    const itemImage = button.getAttribute('data-image');

    // Thêm sản phẩm vào giỏ hàng
    addItemToCart(itemName, itemPrice, itemImage);

    // Hiển thị giỏ hàng nếu chưa hiển thị
    cart.classList.add('show_cart');
  });
});

// Xử lý đăng nhập
const login = document.getElementById('login');
const loginToggle = document.getElementById('login-toggle');
const loginClose = document.getElementById('login-close');

loginToggle.addEventListener('click', () => {
  login.classList.add('show-login');
});
loginClose.addEventListener('click', () => {
  login.classList.remove('show-login');
});

// Gắn sự kiện cộng, trừ, xóa
function attachEventListeners() {
  const decreaseBtns = document.querySelectorAll('.bx-minus');
  const increaseBtns = document.querySelectorAll('.bx-plus');
  const removeBtns = document.querySelectorAll('.cart__amount-trash');

  // Giảm số lượng
  decreaseBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const amountElement = document.querySelectorAll('.cart_amount-number')[index];
      let currentAmount = parseInt(amountElement.textContent);
      if (currentAmount > 1) {
        amountElement.textContent = currentAmount - 1;
        updateCartSummary();
      }
    });
  });

  // Tăng số lượng
  increaseBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const amountElement = document.querySelectorAll('.cart_amount-number')[index];
      let currentAmount = parseInt(amountElement.textContent);
      amountElement.textContent = currentAmount + 1;
      updateCartSummary();
    });
  });

  // Xóa sản phẩm
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cartCard = btn.closest('.cart__card');
      cartCard.remove();
      updateCartSummary();
    });
  });
}

/*===== LOGIN HIDDEN =====*/
/* Kiểm tra nếu loginClose tồn tại */


/*===== LOGIN SHOW =====*/
/* Validate if constant exists */


/*===== LOGIN HIDDEN =====*/
/* Validate if constant exists */


/*=============== HOME SWIPER ===============*/
// HOME SWIPER


document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.home-siwper', {
      loop: true, // Kích hoạt chế độ lặp vô tận
      autoplay: {
        delay: 3000, // Chuyển slide sau mỗi 3 giây
        disableOnInteraction: false, // Tiếp tục autoplay sau khi người dùng tương tác
      },

      navigation: {
        nextEl: '.swiper-button-next', // Next button
        prevEl: '.swiper-button-prev', // Previous button
      },

      pagination: {
        el: '.swiper-pagination', // Chỉ mục slide
        clickable: true, // Cho phép người dùng bấm vào chỉ mục
      },
      effect: 'slide', // Hiệu ứng chuyển slide (mặc định là 'slide')
      speed: 800, // Thời gian chuyển đổi giữa các slide (ms)
    });
  });
  
  

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header');
    // Kiểm tra vị trí scroll của trang
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

// Gắn sự kiện lắng nghe cuộn trang
window.addEventListener('scroll', scrollHeader);

/*=============== NEW SWIPER ===============*/

document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.new-swiper1', {
      slidesPerView: 1, // Số slide hiển thị cùng lúc (có thể tùy chỉnh)
      spaceBetween: 20, // Khoảng cách giữa các slide
      loop: true, // Lặp lại các slide
      autoplay: {
        delay: 8000, // Tự động chuyển slide sau mỗi 3 giây
        disableOnInteraction: false, // Tiếp tục autoplay sau khi người dùng tương tác
      },
      pagination: {
        el: '.swiper-pagination', // Hiển thị các chấm chỉ mục
        clickable: true, // Cho phép bấm vào chấm chỉ mục
      },
      navigation: {
        nextEl: '.swiper-button-next', // Nút điều hướng tới slide tiếp theo
        prevEl: '.swiper-button-prev', // Nút điều hướng tới slide trước
      },
      breakpoints: {
        640: {
          slidesPerView: 2, // Hiển thị 2 slide khi màn hình >= 640px
        },
        768: {
          slidesPerView: 3, // Hiển thị 3 slide khi màn hình >= 768px
        },
        1024: {
          slidesPerView: 4, // Hiển thị 4 slide khi màn hình >= 1024px
        },
      },
    });
  });
  

  
/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  if(this.scrollY >=300)scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== LIGHT BOX ===============*/


/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item');

accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.questions__header');

    accordionHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.accordion-open');

        if (openItem && openItem !== item) {
            toggleItem(openItem);
        }

        toggleItem(item);
    });
});

const toggleItem = (item) => {
    const accordionContent = item.querySelector('.questions__content');
    if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style');
        item.classList.remove('accordion-open');
    } else {

        accordionContent.style.height = accordionContent.scrollHeight + 'px';
        item.classList.add('accordion-open');
    }
};

/*=============== STYLE SWITCHER ===============*/

// Toggle Style Switcher
// Toggle Style Switcher
const styleSwitcherToggle = document.querySelector(".style__switcher-toggler");
const themeColorsContainer = document.querySelector(".theme__colors");

// Add click event listener to the toggler icon
styleSwitcherToggle.addEventListener("click", () => {
    themeColorsContainer.classList.toggle("open"); // Toggle the "open" class
});
// Theme Colors
function themeColors() {
    const colorStyle = document.querySelector(".js-color-style"),
          themeColorsContainer = document.querySelector(".js-theme-colors");

    // Function to set the colors based on the stored preference
    function setColors() {
      const selectedColor = localStorage.getItem("color");
      if (selectedColor) {
          const href = colorStyle.getAttribute("href");
          if (href) {
              const path = href.split("/").slice(0, -1).join("/");
              colorStyle.setAttribute("href", `${path}/${selectedColor}.css`);
          } else {
              console.error("colorStyle href is empty or invalid.");
          }
  
          // Remove active class from all and set active for selected color
          document.querySelectorAll(".js-theme-color-item").forEach(item => {
              item.classList.remove("active");
          });
          const activeItem = document.querySelector(`[data-js-theme-color="${selectedColor}"]`);
          if (activeItem) {
              activeItem.classList.add("active");
          }
      }
  }
  
    // Event listener for selecting a theme color
    themeColorsContainer.addEventListener("click", (event) => {
        const target = event.target.closest(".js-theme-color-item");
        if (!target) return; // Exit if click is not on a valid color item
        const selectedColor = target.getAttribute("data-js-theme-color");

        // Save selected color to localStorage and update the theme
        localStorage.setItem("color", selectedColor);
        setColors();
    });

    // Set the colors on page load
    setColors();
}

// Initialize theme colors functionality
themeColors();



/*=============== STYLE PHONE ===============*/
// Lấy tất cả các mục cha có menu con
const dropdownItems = document.querySelectorAll('.nav__item--dropdown');

dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        const submenu = item.querySelector('.nav__submenu');
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
});



const buttons = document.querySelectorAll('.menu button');
const phoneItems = document.querySelectorAll('.phone-item');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const activeButton = document.querySelector('.menu button.active');
        if (activeButton) {
            activeButton.classList.remove('active');
        }

        button.classList.add('active');

        const type = button.getAttribute('type-phone');

        phoneItems.forEach(item => {
            if (type === 'all' || item.getAttribute('type-phone') === type) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});




const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Cài đặt canvas
canvas.width = 300; // Kích thước canvas đủ lớn để chứa icon
canvas.height = 300;

// Biến lưu trạng thái của icon
const icon = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 100,
    angle: 0, // Góc lắc
 // Màu chữ ban đầu
};

// Hàm vẽ icon
function drawIcon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ lại

    ctx.save();
    ctx.translate(icon.x, icon.y);
    ctx.rotate(Math.sin(icon.angle) * 0.1); // Hiệu ứng lắc nhẹ

    // Vẽ mặt cười
    ctx.beginPath();
    ctx.arc(0, 0, icon.size / 2, 0, Math.PI * 2); // Mặt tròn
    ctx.fillStyle = "#FFD700"; // Màu vàng
    ctx.fill();

    // Mắt trái
    ctx.beginPath();
    ctx.arc(-icon.size / 5, -icon.size / 6, icon.size / 10, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();

    // Mắt phải
    ctx.beginPath();
    ctx.arc(icon.size / 5, -icon.size / 6, icon.size / 10, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();

    // Miệng
    ctx.beginPath();
    ctx.arc(0, icon.size / 6, icon.size / 4, 0, Math.PI, false);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();


    ctx.restore();
}

// Hàm cập nhật trạng thái icon
function updateIcon() {
    icon.angle += 0.05; // Điều chỉnh góc để tạo hiệu ứng lắc
    // Đổi màu chữ giữa hai màu
    icon.textColor = Math.sin(icon.angle) > 0 ? "#FF6F61" : "#3b82f6"; // Đỏ và xanh dương
}

// Vòng lặp animation
function animate() {
    drawIcon();
    updateIcon();
    requestAnimationFrame(animate);
}

// Bắt đầu animation
animate();


document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  const content = document.querySelector(".header");

  // Giả lập thời gian tải (2 giây)
  setTimeout(() => {
      loadingOverlay.style.display = "none"; // Ẩn overlay loading
      content.style.display = "block"; // Hiển thị nội dung
  }, 500); // Thời gian tính bằng mili giây
});




function toggleTheme() {

  document.body.classList.toggle('dark-mode');
  const themeIcon = document.getElementById('theme-icon');
  if (document.body.classList.contains('dark-mode')) {
      themeIcon.textContent = '☀️';
  } else {
      themeIcon.textContent = '🌙';
  }
}

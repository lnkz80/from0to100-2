"use strict";
// MODAL
document.addEventListener("DOMContentLoaded", () => {
  const modalBtns = document.querySelectorAll("[data-modal]"),
    closeBtn = document.querySelector("[data-close]"),
    modalWindow = document.querySelector(".modal");
  //1 var

  const openModal = () => {
    // modalWindow.classList.toggle("show");
    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";
    // clearTimeout(modalIntervalId);
  };

  const closeModal = () => {
    // modalWindow.classList.toggle("show");
    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
  };

  modalBtns.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  closeBtn.addEventListener("click", closeModal);

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  //close modal by pressing "Escape"
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal();
    }
  });

  //show modal after 3s
  // const modalIntervalId = setTimeout(openModal, 3000);

  //show modal at the end of page
  const modalScrollOpen = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", modalScrollOpen);
    }
  };

  window.addEventListener("scroll", modalScrollOpen);

  //POST FormData & JSON

  const forms = document.querySelectorAll("form");
  const mess = {
    loading: "img/forms/spinner.svg",
    success: "Дякуємо, зв'жемося з Вами у найближчий час",
    failure: "Щось пішло не так :(",
  };

  forms.forEach((item) => postData(item));

  function postData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = mess.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

      form.insertAdjacentElement("afterend", statusMessage);

      const req = new XMLHttpRequest();
      req.open("POST", "server.php");

      // при використанні XMLHttpRequest та FormData заголовок не використовується. Він встановлюється автоматично
      // req.setRequestHeader('Content-type', 'multipart/form-data');

      //for JSON
      req.setRequestHeader("Content-type", "application/json");

      const formData = new FormData(form);

      //for JSON
      const obj = {};
      //for JSON end

      formData.forEach((value, key) => {
        obj[key] = value;
      });

      const json = JSON.stringify(obj);
      //for JSON end

      //for FormData
      // req.send(formData);

      //for JSON
      req.send(json);
      //for JSON end

      req.addEventListener("load", () => {
        if (req.status === 200) {
          console.log(req.response);
          showMessage(mess.success);

          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          showMessage(mess.failure);
        }
      });
    });
  }

  function showMessage(message) {
    const modalContent = document.querySelector(".modal__dialog");
    modalContent.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      modalContent.classList.add("show");
      modalContent.classList.remove("hide");
      closeModal();
    }, 4000);
  }
});

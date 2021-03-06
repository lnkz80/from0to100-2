function openModal(modalSelector, modalIntervalId) {
  // modalWindow.classList.toggle("show");
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  document.body.style.overflow = "hidden";
  if (modalIntervalId) {
    clearInterval(modalIntervalId);
  }
}

const closeModal = (modalSelector) => {
  // modalWindow.classList.toggle("show");
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("hide");
  modalWindow.classList.remove("show");
  document.body.style.overflow = "";
};

function modal(triggerSelector, modalSelector, modalIntervalId) {
  // MODAL

  const modalBtns = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);
  //1 var

  modalBtns.forEach((item) => {
    item.addEventListener("click", () =>
      openModal(modalSelector, modalIntervalId)
    );
  });

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  // closeBtn.addEventListener("click", () => closeModal(modalSelector));

  modalWindow.addEventListener("click", (e) => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  //close modal by pressing "Escape"
  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModal(modalSelector);
    }
  });

  //show modal at the end of page
  const modalScrollOpen = () => {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal(modalSelector, modalIntervalId);
      window.removeEventListener("scroll", modalScrollOpen);
    }
  };

  window.addEventListener("scroll", modalScrollOpen);
}

export default modal;
export { closeModal, openModal };

import { closeModal, openModal } from "./modal";
function forms(modalSelector, modalIntervalId) {
  //POST FormData & JSON

  const forms = document.querySelectorAll("form");
  const mess = {
    loading: "img/forms/spinner.svg",
    success: "Дякуємо, зв'жемося з Вами у найближчий час",
    failure: "Щось пішло не так :(",
  };

  forms.forEach((item) => bindPostData(item));

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("img");
      statusMessage.src = mess.loading;
      statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      //put form values to object  - 1 variant
      // const obj = {};
      // formData.forEach((value, key) => {
      //   obj[key] = value;
      // });

      //convert formData into JSON - 2nd BEST variant
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      //USE FETCH
      // postData("http://localhost:3000/requests", JSON.stringify(obj))
      postData("http://localhost:3000/requests", json)
        .then((req) => {
          console.log(req);
          showMessage(mess.success);
          statusMessage.remove();
        })
        .catch(() => {
          showMessage(mess.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  }

  function showMessage(message) {
    const modalContent = document.querySelector(".modal__dialog");
    modalContent.classList.add("hide");
    openModal(modalSelector, modalIntervalId);

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
      closeModal(modalSelector);
    }, 4000);
  }
}

export default forms;

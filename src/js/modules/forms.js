const forms = (modalState) => {
  const forma = document.querySelectorAll("form"),
    inputs = document.querySelectorAll("input");

  const message = {
    loading: "Підвантаження...",
    success: "Дякємо! Очікуйте дзвінок!",
    failure: "Щось пішло не так...",
  };
  const postData = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;

    let res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res.text();
  };
  const clearInputs = () => {
    inputs.forEach((item) => {
      item.value = "";
    });
  };
  forma.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      modalState.modalChange = true;

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.appendChild(statusMessage);

      const formData = new FormData(item);
      postData("app/js", formData)
        .then((res) => {
          statusMessage.textContent = message.success;
        })
        .catch(() => (statusMessage.textContent = message.failure))
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 10000);
        });
    });
  });
};

export default forms;

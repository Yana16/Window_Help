const images = () => {
  const imgPopup = document.createElement("div"),
    workSelection = document.querySelector(".works"),
    bigImage = document.createElement("img");

  imgPopup.classList.add("popup");
  workSelection.appendChild(imgPopup);

  imgPopup.style.justifyContent = "center";
  imgPopup.style.alignItems = "center";
  imgPopup.style.display = "none";

  imgPopup.appendChild(bigImage);
  workSelection.addEventListener("click", (e) => {
    e.preventDefault();

    let target = e.target;

    if (target && target.classList.contains("preview")) {
      imgPopup.style.display = "flex";
      const path = target.parentNode.getAttribute("href");
      bigImage.setAttribute("src", path);
    }

    if (target && target.matches("div.popup")) {
      imgPopup.style.display = "none";
    }
  });
};

export default images;

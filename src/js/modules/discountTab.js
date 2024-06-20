const discountMark = () => {
  let discountTable = document.querySelector(".discount-widjet");
  // console.log(discountTable);

  discountTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("discount-widjet")) {
      e.target.classList.toggle("close");
    }
  });
};
export default discountMark;

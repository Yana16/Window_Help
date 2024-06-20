const discountMark = () => {
  let discountTable = document.getElementById("disc-block");

  discountTable.addEventListener("click", (e) => {
    console.log("CLICK");
    if (e.target) {
      discountTable.classList.add("discount-widjet");
    }
  });
};
export default discountMark;

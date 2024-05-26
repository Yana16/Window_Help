const discountMark = () => {
  let discountTable = document.getElementsByClassName("discount-widjet")[0];

  discountTable.addEventListener("click", (e) => {
    console.log("CLICK");
    if (e.target) {
      discountTable.style.display = "none";
    }
  });
};
export default discountMark;

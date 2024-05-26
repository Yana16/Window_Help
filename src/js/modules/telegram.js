const telegram = () => {
  jQuery('[id*="submitTelegram"]').each((_index, element) => {
    jQuery(element).on("submit", sendToTelegram);
  });

  function sendToTelegram(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/api/orders", {
      user_name: this.user_name.value,
      user_phone: this.user_phone.value,
      form_discount: this.form_discount.value,
    });
    jQuery(this).trigger("reset");
  }
};

export default telegram;

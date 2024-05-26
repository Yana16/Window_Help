let discount = (modalState, globalState) => {
  if (getCookie("disc")) {
    let timer = setInterval(() => discountTimer(timer), 2000);
  } else {
    setCookie("disc", 5, { secure: true, "max-age": 1000 });

    let timer = setInterval(() => discountTimer(timer), 2000);
  }

  function setCookie(name, value, options = {}) {
    options = {
      path: "/",
    };

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)",
      ),
    );

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  function discountTimer(timer) {
    let disc = parseFloat(getCookie("disc")) ?? 5;

    globalState.discount = disc.toFixed(2);

    jQuery("#disc-wid").text(disc.toFixed(2));
    jQuery("#discount1")
      .attr("placeholder", disc.toFixed(2))
      .val(disc.toFixed(2));
    jQuery("#discount2")
      .attr("placeholder", disc.toFixed(2))
      .val(disc.toFixed(2));
    jQuery("#discount")
      .attr("placeholder", disc.toFixed(2))
      .val(disc.toFixed(2));
    if (modalState.modalChange) {
      clearInterval(timer);
      document.getElementById("discount1").value = "";
      return true;
    }

    if (disc <= 0) {
      clearInterval(timer);
      return;
    }

    if (disc <= 5) {
      disc -= 0.01;
      setCookie("disc", disc.toFixed(2), {
        secure: true,
        "max-age": 1000,
      });
    } else {
      jQuery("#disc-wid").text(0);

      console.log("Максимальная скидка");
      clearInterval(timer);
      return false;
    }
  }
};

export default discount;

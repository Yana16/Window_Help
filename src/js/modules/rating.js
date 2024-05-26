//Основная функция
export function initRatings() {
  itirationRating();

  getRating();
}

function itirationRating() {
  const ratings = document.querySelectorAll(".rating");

  //Бегаем по всем рейтингам на странице
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    // console.log(rating);
    initRating(rating);
  }
}

//Инициализируем конкретный рейтиг
function initRating(rating) {
  initRatingVars(rating);

  setRatingActiveWidth();

  if (rating.classList.contains("rating__set")) {
    setRating(rating);
  }
}
let ratingValue;
//Инициализация переменных
function initRatingVars(rating) {
  // ratingActive = rating.querySelector(".rating__active");
  ratingValue = rating.querySelector(".rating__value");
}

//Изменяем ширину активных звезд
function setRatingActiveWidth(index = ratingValue.innerHTML, ratingActive) {
  const ratingActiveWidth = index / 0.05;
  jQuery(ratingActive).width(`${ratingActiveWidth}%`);
  // ratingActive.style.width = `${ratingActiveWidth}%`;
}

//Возможность указывать оценку
function setRating(rating) {
  const ratingItems = rating.querySelectorAll(".rating__item");
  for (let index = 0; index < ratingItems.length; index++) {
    const ratingItem = ratingItems[index];
    // console.log(ratingItem);
    // console.log(ratingItem.value);

    ratingItem.addEventListener("mouseenter", function (e) {
      //обновление переменных
      initRatingVars(rating);
      //Обновление активных звезд
      setRatingActiveWidth(ratingItem.value);
    });
    ratingItem.addEventListener("mouseleave", function (e) {
      //Обновление активных звезд
      setRatingActiveWidth();
    });
    ratingItem.addEventListener("click", function (e) {
      //обновление переменных
      initRatingVars(rating);

      if (rating.dataset.ajax) {
        const ratingValue = ratingItem.value;
        const masterId = ratingItem.dataset.master;
        // console.log(masterId);
        //Отправить на сервер

        setRatingValue(ratingValue, rating, masterId);
      } else {
        //Отобразить указанную оценку
        // ratingValue.innerHTML = index + 1;
        // setRatingActiveWidth();
      }
    });
  }
}

async function setRatingValue(ratingValue, rating, masterId) {
  if (!rating.classList.contains("rating__sending")) {
    rating.classList.add("rating__sending");

    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        userRating: ratingValue,
        id: masterId,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    // console.log(response);

    if (response.ok) {
      const result = await response.json();
      const newRating = result.rating[0].avgAmount.toFixed(1);
      getRating();
      // console.log(newRating);
      // console.log(result);

      //Вывод нового среднего результата
      // ratingValue.innerHTML = newRating;

      //Обновление акивных звезд
      setRatingActiveWidth();

      rating.classList.remove("rating__sending");
    } else {
      alert("Помилка");
      rating.classList.remove("rating__sending");
    }
  }
}
function getRating() {
  fetch("http://localhost:3000/api/post_ratings", {
    method: "GET",

    headers: {
      "content-type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach((element) => {
        const masterId = element.id;
        const rate = element.avgAmount;
        const ratingActive = jQuery(`div#${masterId}`).find(".rating__active");
        setRatingActiveWidth(rate.toFixed(1), ratingActive);
        jQuery(`div#${masterId}`).find(".rating__value").text(rate.toFixed(1));
      });
    });
}

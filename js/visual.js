/**
 * 작성자: 손정민
 * 작성일: 2023-05-26
 * 기능 업데이트 : json 데이터를 이용한 html 구조 생성 적용
 */

window.addEventListener("load", function (event) {
  const swVisualWrap = document.querySelector(".sw-visual .swiper-wrapper");

  // const xhr = new XMLHttpRequest();
  // xhr.addEventListener("readystatechange", function (event) {
  //   let req = event.target;
  //   if (req.readyState === XMLHttpRequest.DONE) {
  //     let data = JSON.parse(req.response);
  //     makeVisualHtml(data);
  //   }
  // });
  // xhr.open("GET", "data/visualdata.json");
  // xhr.send();
  fetch("data/visualdata.json")
    .then((res) => res.json())
    .then((result) => makeVisualHtml(result))
    .catch((err) => console.log(err));

  function makeVisualHtml(_data) {
    let html = ``;
    _data.img.forEach((item) => {
      let temp = `
              <div class="swiper-slide" style="background-image: url(images/${item})"></div>
          `;
      html += temp;
    });

    swVisualWrap.innerHTML = html;

    const swVisual = new Swiper(".sw-visual", {
      loop: true,
      effect: "fade",
      speed: 800,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".sw-visual-pg",
        clickable: true,
      },
    });
    // 위의 구문을 통해 slide 생성되면
    // .sw-visual-pg 에는 span 이 만들어졌을거에요.
    // .sw-visual-pg .swiper-pagination-bullet 이 생성됨
    // innerHTML 을 이용해 내용을 넣어보자.
    const swVisualBullets = document.querySelectorAll(
      ".sw-visual-pg .swiper-pagination-bullet"
    );
    swVisualBullets.forEach((item, index, arr) => {
      if (index < 9) {
        item.innerHTML = `<em>0${index + 1}</em>`;
      } else {
        item.innerHTML = `<em>${index + 1}</em>`;
      }
      // 상렬님 및 GPT 코드
      // item.innerHTML = `<em>${index < 9 ? '0' : ''}${index + 1}</em>`;
    });
  }
});

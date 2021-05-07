var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect:
    {
      rotate: 30,
      stretch: 0,
      depth: 350,
      modifier: 1,
      slideShadows: true,
    },
  //   autoplay:
  //   {
  //       delay: 500,
  //       disableOnInteraction: false,
  //   },
    // loop: true,
  });
(function() {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки слайдера, параметры получаются из командной строки
   * pagination - boolean, отображает пагинацию
   * loop - boolean, зацикливает слайдер
   *
   * Для тестирования работы своего скрипта при разных значениях параметров временно
   * переопределяйте значение переменных, хранящих эти параметр.
   * Либо можете дописыват гет-параметры с нужным значением в конец адресной строки,
   * например: ?pagination=1&loop=0
   */
  const settings = {
    pagination: !!getUrlValue('pagination'),
    loop: !!getUrlValue('loop'),
  };

  /* Код компонента пишите ниже */


})();

(function() {
  const sliderItems = document.querySelectorAll('.slider-item');
  const prevButton = document.querySelector('.slider-toggle--prev');
  const nextButton = document.querySelector('.slider-toggle--next');
  const paginationContainer = document.querySelector('.slider-pagination');
  const paginationButtons = document.querySelectorAll('.slider-pagination-item');

  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return Boolean(Number(urlParams.get(name)));
  };

  const settings = {
    pagination: getUrlValue('pagination'),
    loop: getUrlValue('loop'),
  };

  let currentSlide = 0;
  const totalSlides = sliderItems.length;

  if (settings.pagination) {
    paginationContainer.classList.add('slider-pagination--shown');
  } else {
    paginationContainer.classList.remove('slider-pagination--shown');
  }

  function updateSlider() {
    sliderItems.forEach((slide, index) => {
      slide.classList.toggle('slider-item--current', index === currentSlide);
      if (settings.pagination) {
        paginationButtons[index].disabled = index === currentSlide;
      }
    });

    if (!settings.loop) {
      prevButton.disabled = currentSlide === 0;
      nextButton.disabled = currentSlide === totalSlides - 1;
    } else {
      prevButton.disabled = false;
      nextButton.disabled = false;
    }
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1 || settings.loop) {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentSlide > 0 || settings.loop) {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  if (settings.pagination) {
    paginationButtons.forEach((button, index) => {
      button.addEventListener('click', () => goToSlide(index));
    });
  }

  updateSlider();
})();


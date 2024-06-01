(function() {
  /**
   * Служебная функция для заполнения диапазона слайдера цветом.
   * @param {number} from - начальное значение в %% диапазона.
   * @param {number} to - конечное значение в %% диапазона.
   * @param {HTMLElement} controlSlider - Элемент управления слайдером
   */
  const fillSlider = (from, to, controlSlider) => {
    const sliderColor = '#ffffff';
    const rangeColor = '#25daa5';
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${from}%,
      ${rangeColor} ${from}%,
      ${rangeColor} ${to}%,
      ${sliderColor} ${to}%,
      ${sliderColor} 100%)`;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const rangeContainers = document.querySelectorAll('.range_container');

    rangeContainers.forEach((container) => {
      const fromSlider = container.querySelector('.fromSlider');
      const fromInput = container.querySelector('.fromInput');
      const toSlider = container.querySelector('.toSlider');
      const toInput = container.querySelector('.toInput');
      if (fromSlider && fromInput) {
        fromInput.closest('.form_control_container').hidden = true;
        fromSlider.hidden = true;
      }

      toSlider.style.background = '#ffffff';

      const updateValues = (source, target) => {
        target.value = source.value;
      };
      toSlider.addEventListener('input', () => updateValues(toSlider, toInput));
      toInput.addEventListener('input', () => updateValues(toInput, toSlider));
    });
  });


})();

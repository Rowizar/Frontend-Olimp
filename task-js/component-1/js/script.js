(function () {
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
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 3,
  };

  document.addEventListener('DOMContentLoaded', () => {
    const titles = document.querySelectorAll('.accordeon .accordeon-item-title');
    let openTabs = [];
    const settings = {
      tabsLimit: getUrlValue('tabs_limit') || 0,
    };

    function getUrlValue(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return parseInt(urlParams.get(name), 10) || 0;
    }

    function closeTab(item) {
      item.classList.remove('accordeon-item--open');
      openTabs = openTabs.filter((openItem) => openItem !== item);
    }

    function openTab(item) {
      if (settings.tabsLimit !== 0 && openTabs.length >= settings.tabsLimit) {
        closeTab(openTabs[0]);
      }
      item.classList.add('accordeon-item--open');
      openTabs.push(item);
    }

    function toggleTab(element) {
      const item = element.parentNode;
      if (item.classList.contains('accordeon-item--open')) {
        closeTab(item);
      } else {
        openTab(item);
      }
    }

    titles.forEach((title) => {
      title.addEventListener('click', function () {
        toggleTab(this);
      });
    });
  });


})();

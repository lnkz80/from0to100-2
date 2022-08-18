function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  activeClass
) {
  //TABS

  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  const hideTabContent = () => {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  };

  const showTabContent = (elem = 0) => {
    tabsContent[elem].classList.add("show", "fade");
    tabsContent[elem].classList.remove("hide");
    tabs[elem].classList.add(activeClass);
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    const tab = e.target;
    if (tab && tab.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, num) => {
        if (item == tab) {
          hideTabContent();
          showTabContent(num);
        }
      });
    }
  });
}

export default tabs;

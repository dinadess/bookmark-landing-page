'use strict';

/* Mobile Menu */
const menuBtn = document.querySelector('.btn-menu');
const menuBtnImg = document.querySelector('.btn-menu img');
const headerNav = document.querySelector('.header-nav');

/** Tabs */
const tabs = document.querySelector('.tabs');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const tabCursor = document.querySelector('.cursor');

/** Accordion */
const faqContainer = document.getElementById('faq-container');
const faqAccordionItem = document.querySelectorAll('.accordion-item');

/* Newsletter Form */
const emailInput = document.querySelector('input[type="email"]');
const submitBtn = document.querySelector('button[type="submit"]');

menuBtn.addEventListener('click', function () {
  const isOpened = menuBtn.getAttribute('aria-expanded') === 'true';
  isOpened ? closeMenu() : openMenu();
});

const openMenu = function () {
  menuBtnImg.src = './images/icon-close.svg';
  menuBtn.setAttribute('aria-expanded', 'true');
  headerNav.dataset.state = 'opened';
  document.documentElement.classList.add('overflowYHiddenMobile');
};

const closeMenu = function () {
  menuBtnImg.src = './images/icon-hamburger.svg';
  menuBtn.setAttribute('aria-expanded', 'false');
  headerNav.dataset.state = 'closing';
  headerNav.addEventListener(
    'animationend',
    function () {
      this.dataset.state = 'closed';
    },
    { once: true }
  );
  document.documentElement.classList.remove('overflowYHiddenMobile');
};

tabs.addEventListener('click', function (e) {
  setActiveTab(e);
});

const setActiveTab = function (e) {
  const activeTab = document.querySelector('.tab-btn.active');
  const clickedBtn = e?.target.closest('.tab-btn');

  if (window.matchMedia('(max-width: 767px)').matches) {
    if (activeTab) {
      tabCursor.style.width = `150px`;
      tabCursor.style.top = `${
        activeTab.clientHeight + activeTab.offsetTop - 2
      }px`;
      tabCursor.style.bottom = 0;
      tabCursor.style.left = `50%`;
    }

    if (!clickedBtn) return;

    if (clickedBtn) {
      tabBtns.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', false);
      });
      tabContents.forEach((content) => {
        content.setAttribute('hidden', true);
      });

      clickedBtn.classList.add('active');
      clickedBtn.setAttribute('aria-selected', true);
      const activeContent = clickedBtn.getAttribute('aria-controls');
      document.getElementById(activeContent).removeAttribute('hidden');

      tabCursor.style.width = '150px';
      tabCursor.style.top = `${
        clickedBtn.clientHeight + clickedBtn.offsetTop - 2
      }px`;
      tabCursor.style.bottom = 0;
      tabCursor.style.left = `50%`;
    }
  } else {
    if (activeTab) {
      tabCursor.style.width = `${activeTab.offsetWidth}px`;
      tabCursor.style.bottom = `${activeTab.offsetTop}px`;
      tabCursor.style.left = `${activeTab.offsetLeft}px`;
      tabCursor.style.top = 'auto';
    }

    if (clickedBtn) {
      tabBtns.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', false);
      });
      tabContents.forEach((content) => {
        content.setAttribute('hidden', true);
      });

      clickedBtn.classList.add('active');
      clickedBtn.setAttribute('aria-selected', true);
      const activeContent = clickedBtn.getAttribute('aria-controls');
      document.getElementById(activeContent).removeAttribute('hidden');

      tabCursor.style.width = `${clickedBtn.offsetWidth}px`;
      tabCursor.style.bottom = `${clickedBtn.offsetTop}px`;
      tabCursor.style.left = `${clickedBtn.offsetLeft}px`;
      tabCursor.style.top = 'auto';
    }
  }
};

setActiveTab();

window.addEventListener('resize', function () {
  setActiveTab();
});

faqContainer.addEventListener('click', function (e) {
  const clickedAccordion = e.target.closest('.accordion-btn');

  if (!clickedAccordion) return;

  const activeContent = clickedAccordion.getAttribute('aria-controls');
  const clickAriaExpanded = clickedAccordion.getAttribute('aria-expanded');

  if (clickAriaExpanded === 'true') {
    clickedAccordion.setAttribute('aria-expanded', false);
  } else {
    faqAccordionItem.forEach((item) => {
      item.querySelector('.accordion-btn').setAttribute('aria-expanded', false);
    });
    clickedAccordion.setAttribute('aria-expanded', true);
  }
});

submitBtn.addEventListener('click', function (e) {
  const errorMessage = document.querySelector('.error-message');
  const successMessage = document.querySelector('.success-message');
  e.preventDefault();
  const re = /^[a-zA-Z0-9-+]{2,}\@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/;

  if (emailInput.value === '') {
    errorMessage.style.display = 'inline-block';
    errorMessage.textContent = 'Please, add an email!';
    successMessage.setAttribute('hidden', true);
    successMessage.style.display = 'none';
  } else if (!re.test(emailInput.value)) {
    errorMessage.style.display = 'inline-block';
    errorMessage.textContent = "Whoops make sure it's an email address.";
    successMessage.style.display = 'none';
  } else {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    successMessage.style.display = 'inline-block';
  }
});

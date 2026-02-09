// ---------- RENDER HEADER ----------

import { toHtmlElement } from "./toHtmlElement.mjs";

const myHtmlString = `
  <nav class="site-nav">
    <div class="container nav-inner">
      <div class="site-nav__left">
        <h1 class="site-title">Ahkar Kyaw</h1>
        <ul class="site-nav__list">
          <li><a class="site-nav__link" href="index.html">Home</a></li>
          <li><a class="site-nav__link" href="projects.html">Projects</a></li>
          <li><a class="site-nav__link" href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="site-nav__right">
        <label class="site-nav__toggle">
          <input type="checkbox" autocomplete="off" />
          Dark mode
        </label>
        <button type="button" class="site-nav__menu">Menu</button>
      </div>
    </div>
  </nav>
`;

document.getElementById("header-root").appendChild(toHtmlElement(myHtmlString));

// ---------- MOBILE MENU TOGGLE ----------

const menuBtn = document.querySelector(".site-nav__menu");
const menuLinksEl = document.querySelector(".site-nav__list");
const headerEl = document.querySelector(".site-nav");

const OPEN_CLASS = "site-nav__list--open";

menuBtn.addEventListener("click", () => {
  console.log("Menu button clicked");
  menuLinksEl.classList.toggle(OPEN_CLASS);
});

document.body.addEventListener("click", (event) => {
  const menuIsOpen = menuLinksEl.classList.contains(OPEN_CLASS);
  if (menuIsOpen === false) return;

  const clickedInsideHeader = headerEl.contains(event.target);
  if (clickedInsideHeader) return;

  menuLinksEl.classList.remove(OPEN_CLASS);
});

// ---------- DARK MODE TOGGLE ----------

const darkModeCheckbox = document.querySelector(
  '.site-nav__toggle input[type="checkbox"]'
);

const DARK_CLASS = "dark-mode";
const STORAGE_KEY = "darkMode";

const saved = localStorage.getItem(STORAGE_KEY);
const darkModeIsOn = saved === "true";

darkModeCheckbox.checked = darkModeIsOn;
document.body.classList.toggle(DARK_CLASS, darkModeIsOn);

darkModeCheckbox.addEventListener("change", () => {
  const isDark = darkModeCheckbox.checked;
  console.log("Dark mode toggled:", isDark);

  document.body.classList.toggle(DARK_CLASS, isDark);
  localStorage.setItem(STORAGE_KEY, String(isDark));
});
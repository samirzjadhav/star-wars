("use strict");
const categoryToggle = document.querySelector(".toggle-icon > .icon");
const sidebar = document.querySelector(".sidebar");
const hero = document.querySelector(".hero-container");
const filmsSidebarItem = document.querySelector("#films");
const filmsList = document.querySelector(".items-list");
const viewToggle = document.querySelector("#view-toggle");
const filmsTable = document.querySelector("tbody");
const gallery = document.querySelector(".items-grid");
const listHeader = document.querySelector(".list-header");
const deleteModal = document.querySelector(".modal");
const deleteButton = document.querySelector(".delete-button");
const cancelButton = document.querySelector(".cancel-button");

viewToggle.checked = true;

function closeAllOptions() {
  document.querySelectorAll(".options-container").forEach((option) => {
    option.style.display = "none";
  });
}

function addOptionsEventListener() {
  const optionButtons = document.querySelectorAll(".options-toggle");

  optionButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      closeAllOptions();

      const id = btn.getAttribute("data-episode-id");
      const menu = document.querySelector(`.option-${id}`);
      menu.style.display = "flex";
    });
  });
}

function addDeleteEventListener() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      closeAllOptions();
      deleteModal.style.display = "flex";
    });
  });
}

cancelButton.addEventListener("click", function () {
  closeAllOptions();
  deleteModal.style.display = "none";
});

deleteButton.addEventListener("click", function () {
  closeAllOptions();
  deleteModal.style.display = "none";
});

function reset() {
  hero.style.display = "flex";
  filmsList.style.display = "none";
  listHeader.style.display = "none";
  gallery.style.display = "none";

  filmsTable.innerHTML = null;
  gallery.innerHTML = null;
}

categoryToggle.addEventListener("click", function () {
  sidebar.style.display = "flex";
});

function createTableItem({ title, director, release_date, episode_id }) {
  return `<tr>
    <td class="movie-title">
      <img src="./assets/film-reel.svg" width="26px" alt="" />${title}
    </td>
    <td>${director}</td>
    <td class="release-date">
      <p>${release_date}</p>
      <div class="options">
        <img
          src="./assets/options.svg"
          class="icon options-toggle"
          alt=""
          data-episode-id="${episode_id}"
        />
        <div class="options-container option-${episode_id}">
          <ul class="options-content">
            <li>
              <img src="./assets/view.svg" class="icon" alt="" />
              <a href="#">View</a>
            </li>
            <li>
              <img src="./assets/download.svg" class="icon" alt="" />
              <a href="#">Download</a>
            </li>
            <li>
              <img src="./assets/rename.svg" class="icon" alt="" />
              <a href="#">Rename</a>
            </li>
            <li>
              <img src="./assets/share.svg" class="icon" alt="" />
              <a href="#">Share Link</a>
            </li>
            <li>
              <img src="./assets/move.svg" class="icon" alt="" />
              <a href="#">Move</a>
            </li>
            <li>
              <img src="./assets/private.svg" class="icon" alt="" />
              <a href="#">Mark Private</a>
            </li>
            <li class="delete-btn">
              <img src="./assets/delete.svg" class="icon" alt="" />
              <a href="#" >Delete</a>
            </li>
          </ul>
        </div>
      </div>
    </td>
  </tr>`;
}

function createGridItem({ title, episode_id }) {
  return ` <div class="grid-item-container">
    <div class="grid-item">
      <img
        src="https://picsum.photos/seed/picsum/400/240"
        alt=""
        class="cover"
      />
      <div class="info">
        <h3 class="title">
          <img src="./assets/film-reel.svg" alt="" class="icon" />
          ${title}
        </h3>
        <div class="options">
          <img
            src="./assets/options.svg"
            class="icon options-toggle"
            alt=""
            data-episode-id="${episode_id}"
          />
          <div class="options-container option-${episode_id}">
            <ul class="options-content">
              <li>
                <img src="./assets/view.svg" class="icon" alt="" />
                <a href="#">View</a>
              </li>
              <li>
                <img src="./assets/download.svg" class="icon" alt="" />
                <a href="#">Download</a>
              </li>
              <li>
                <img src="./assets/rename.svg" class="icon" alt="" />
                <a href="#">Rename</a>
              </li>
              <li>
                <img src="./assets/share.svg" class="icon" alt="" />
                <a href="#">Share Link</a>
              </li>
              <li>
                <img src="./assets/move.svg" class="icon" alt="" />
                <a href="#">Move</a>
              </li>
              <li>
                <img src="./assets/private.svg" class="icon" alt="" />
                <a href="#">Mark Private</a>
              </li>
              <li class="delete-btn">
                <img src="./assets/delete.svg" class="icon" alt="" />
                <a href="#" class="text-red-500">Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

filmsSidebarItem.addEventListener("click", function () {
  reset();

  hero.style.display = "none";
  listHeader.style.display = "flex";
  filmsList.style.display = "flex";

  fetch(`https://swapi.dev/api/films`)
    .then((response) => response.json())
    .then((data) => data.results)
    .then((data) => {
      data.forEach((film) => {
        const tableItem = createTableItem(film);
        const gridItem = createGridItem(film);
        filmsTable.insertAdjacentHTML("beforeend", tableItem);
        gallery.insertAdjacentHTML("beforeend", gridItem);

        addOptionsEventListener();
        addDeleteEventListener();
      });
    })
    .catch((error) => alert("something went wrong!"));
});

viewToggle.addEventListener("change", function () {
  if (viewToggle.checked) {
    filmsList.style.display = "flex";
    gallery.style.display = "none";
  } else {
    filmsList.style.display = "none";
    gallery.style.display = "flex";
  }
});

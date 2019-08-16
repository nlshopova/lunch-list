const lunchContainer = document.getElementById("lunch-list");
const likeButton = `
<svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path class="star-outline" d="M81,43.7l43-0.1c1.8,0,3.3,1.1,3.8,2.8c0.5,1.7,0,3.4-1.5,4.5L91.5,76l13.4,40.9  c0.5,1.7,0,3.4-1.4,4.5c-1.4,1-3.3,1-4.7,0L64,96l-34.7,25.3c-1.4,1-3.3,1-4.7,0c-1.4-1-2-2.8-1.4-4.5L36.5,76L1.7,50.8  c-1.4-1-2-2.8-1.5-4.5c0.5-1.7,2-2.8,3.8-2.8l43,0.1L60.2,2.8C60.7,1.1,62.2,0,64,0s3.3,1.1,3.8,2.8L81,43.7L81,43.7z M64,4  L49.9,47.7L4,47.6l37.2,26.9l-14.3,43.6L64,91.1l37.1,27.1L86.8,74.5L124,47.6l-45.9,0.1L64,4z" id="XMLID_6_"/>
  <polygon class="star-inside" fill="transparent" id="XMLID_1_" points="64,4 78.1,47.7 124,47.6 86.8,74.5 101.1,118.1 64,91.1 26.9,118.1 41.2,74.5 4,47.6   49.9,47.7 "/>
</svg>`;
function getLunchList() {
  fetch("http://localhost:9876/lunch-list")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {

      const markup = `
<ul class="lunch-items">
    ${data
      .map(
        item =>
          `<li class="lunch-item">
            <a class="react" onmouseover="showReactions(this)" onmouseleave="hideReactions(this)" onclick="resetLike(this)">
            <span class="like-button">${likeButton}</span>
            <div class="reactions">
              <button class="love" onclick="toggleClass(this)">
                <svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path class="heart-outline" d="M39.9,96.4c-1.1-1.3-2.7-2.8-3.9-4c-2.6-2.6-5.3-5.3-7.9-7.9c-4.1-4-8.3-8.2-12.5-12.2  C5.9,66.1,0,55.4,0,43.8c0-18.8,15.2-34,34-34c12.9,0,24.2,7.2,30,18c5.7-10.7,17.1-18,30-18c18.8,0,34,15.2,34,34  c0,11.6-5.9,22.3-15.6,28.6c-4.2,3.9-8.4,8.1-12.5,12.2c-2.7,2.6-5.3,5.2-7.9,7.9c-1.2,1.2-2.8,2.7-3.9,4c-0.2,0.3-0.4,0.6-0.7,0.9  l-20.6,21c-0.8,0.8-1.7,1.2-2.9,1.2c-1.1,0-2.1-0.4-2.9-1.2l-20.6-21C40.3,97,40.1,96.7,39.9,96.4L39.9,96.4z M64,115.5l20.6-21  c-0.8,0,25.3-25.3,25.4-25.3c8.4-5.3,14-14.7,14-25.4c0-16.6-13.4-30-30-30c-16.2,0-29.4,12.8-30,28.8c-0.6-16-13.8-28.8-30-28.8  c-16.6,0-30,13.4-30,30c0,10.7,5.6,20.1,14,25.4c0.1,0,26.2,25.3,25.4,25.3L64,115.5z" id="XMLID_6_"/>
                  <path class="heart-inside" fill="transparent" d="M64,115.5l-20.6-21c0.8,0-25.3-25.3-25.4-25.3C9.6,63.9,4,54.5,4,43.8c0-16.6,13.4-30,30-30  c16.2,0,29.4,12.8,30,28.8c0.6-16,13.8-28.8,30-28.8c16.6,0,30,13.4,30,30c0,10.7-5.6,20.1-14,25.4c-0.1,0-26.2,25.3-25.4,25.3  L64,115.5z" id="XMLID_1_"/>
                </svg>
              </button>
              <button class="star" onclick="toggleClass(this)">
                <svg id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path class="star-outline" d="M81,43.7l43-0.1c1.8,0,3.3,1.1,3.8,2.8c0.5,1.7,0,3.4-1.5,4.5L91.5,76l13.4,40.9  c0.5,1.7,0,3.4-1.4,4.5c-1.4,1-3.3,1-4.7,0L64,96l-34.7,25.3c-1.4,1-3.3,1-4.7,0c-1.4-1-2-2.8-1.4-4.5L36.5,76L1.7,50.8  c-1.4-1-2-2.8-1.5-4.5c0.5-1.7,2-2.8,3.8-2.8l43,0.1L60.2,2.8C60.7,1.1,62.2,0,64,0s3.3,1.1,3.8,2.8L81,43.7L81,43.7z M64,4  L49.9,47.7L4,47.6l37.2,26.9l-14.3,43.6L64,91.1l37.1,27.1L86.8,74.5L124,47.6l-45.9,0.1L64,4z" id="XMLID_6_"/>
                  <polygon class="star-inside" fill="transparent" id="XMLID_1_" points="64,4 78.1,47.7 124,47.6 86.8,74.5 101.1,118.1 64,91.1 26.9,118.1 41.2,74.5 4,47.6   49.9,47.7 "/>
                </svg>
              </button>
            </div>
          </a>
            
            <span>${item}</span>
        </li>`
      )
      .join("")}
</ul>
`;
      lunchContainer.innerHTML = markup;
    });
}
getLunchList();

function resetLike(element) {
  element.firstElementChild.classList.remove("selected");
  element.firstElementChild.innerHTML = likeButton;
}

function showReactions(element) {
  element.getElementsByClassName("reactions")[0].classList.add("show");
}
function hideReactions(element) {
  element.getElementsByClassName("reactions")[0].classList.remove("show");
}

function toggleClass(element) {
  event.stopPropagation();
  element.parentElement.previousElementSibling.innerHTML = element.innerHTML;
  element.parentElement.previousElementSibling.classList.add("selected");
}
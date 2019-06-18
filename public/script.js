const lunchContainer = document.getElementById("lunch-list");
function getLunchList() {
  fetch("http://localhost:9876/lunch-list")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const markup = `
<ul class="dogs">
    ${data
      .map(
        (item, key) =>
          `<li><input type="checkbox" value ="${item}" id="${key}"><label for="${key}">${item}</label></li>`
      )
      .join("")}
</ul>
`;
      lunchContainer.innerHTML = markup;
    });
}
getLunchList();

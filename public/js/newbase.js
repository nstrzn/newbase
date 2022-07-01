let collapseBtn = document.querySelector(".collapsible");
let submitBtn = document.querySelector(".theme-submit-btn");

$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/forum?format=json", (data) => {
      let subarr = data.reverse().slice(0, 5);
      subarr.forEach((theme) => {
        $(".modal-body").append(
          `<div class="theme-box">
  <span class="theme-title">
  ${theme.title}
  </span>
  <div class="theme-description">
  ${theme.description}
  </div>
  </div>`
        );
      });
    });
  });
});

if (collapseBtn != null) {
  collapseBtn.addEventListener("click", collapse);
  function collapse() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }
}

if (submitBtn != null) {
  submitBtn.addEventListener("click", closeCollapsible);
}

function closeCollapsible() {
  let form = document.querySelector(".forum-form");
  form.style.display = "none";
}

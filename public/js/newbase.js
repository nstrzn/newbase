let collapseBtn = document.querySelector(".collapsible");
let submitBtn = document.querySelector(".theme-submit-btn");

$(document).ready(() => {
 
  $("#modal-btn").click(() => {
    $(".modal-body").html("");
    $.get("/api/forum", (results = {}) => {
      let data = results.data;
      if (!data || !data.themes) return;
      let subarr = data.themes.reverse().slice(0, 5);
      subarr.forEach((theme) => {
        $(".modal-body").append(
          `<div class="theme-box">
          <span>
          <div class="theme-title">${theme.title}</div>
          <div class="theme-description">${theme.description}</div>
          </span>
          <a><span class='${theme.joined ? "joined-button button" : "join-button button"}'data-id="${theme._id}"> ${theme.joined ? "Joined" : "Join"}</span></a>
          </div>`
        );
      });
    }).then(() => {
      addJoinButtonListener();
    });
  });

  let addJoinButtonListener = () => {
    $(".join-button").click((event) => {
      let $button = $(event.target),
        themeId = $button.data("id");
      $.get(`/api/forum/${themeId}/join`, (results = {}) => {
        let data = results.data;
        if (data && data.success) {
          $button
            .text("Joined")
            .addClass("joined-button")
            .removeClass("join-button");
        } else {
          $button.text("Try again");
        }
      });
    });
  };
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

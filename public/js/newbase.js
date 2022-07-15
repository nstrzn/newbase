let collapseBtn = document.querySelector(".collapsible");
let submitBtn = document.querySelector(".theme-submit-btn");

$(document).ready(() => {

  const socket = io();
    $("#chatForm").submit(() => {
      let text = $("#chat-input").val(),
        userName = $("#chat-user-name").val(),
        userId = $("#chat-user-id").val();

      socket.emit("message", {
        content: text,
        userName: userName,
        userId: userId
      });

      $("#chat_input").val("");
      return false;
    });

    socket.on("message", message => {
      displayMessage(message);
      for (let i = 0; i < 2; i++) {
        $(".chat-icon")
          .fadeOut(200)
          .fadeIn(200);
      }
    });

    socket.on("load all messages", data => {
      data.forEach(message => {
        displayMessage(message);
      });
    });

    socket.on("user disconnected", () => {
      displayMessage({
        userName: "Notice",
        content: "User left the chat"
      });
    });

    let displayMessage = message => {
      $("#chat").prepend(
        $("<li>").html(`
  				<strong class="message ${getCurrentUserClass(message.user)}">
  					${message.userName}
  				</strong>: ${message.content}
  			`)
      );
    };

    let getCurrentUserClass = id => {
      let userId = $("#chat-user-id").val();
      return userId === id ? "current-user" : "";
    };

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

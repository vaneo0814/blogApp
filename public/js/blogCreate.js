$(document).ready(function () {
  var titleInput = $("#titleInput");
  var bodyInput = $("#textInput");

  var userId;
  var postId;
  var editPost = false;

  function getUser() {
    $.get("/api/userdata").then(function (data) {
      console.log(data);
      userId = data.id;
    }).then(function () {
      loadBlog();
    });
  }
  getUser();
  // When the post button is clicked, validate that the title and body are not blank
  $("#postBtn").on("click", function (event) {
    if (editPost == true) {
      editPost = false;
      console.log("editPost");
      console.log(titleInput.val().trim());
      console.log(bodyInput.val().trim());


      $.ajax({
        method: "PUT",
        url: "/api/posts/" + postId,
        data: {
          title: titleInput.val().trim(),
          body: bodyInput.val().trim()
        }
      }).then(function () {
        window.location.replace("/userblog");
      });
    } else {
      event.preventDefault();
      // get userid from localstorage

      var blogData = {
        title: titleInput.val().trim(),
        body: bodyInput.val().trim(),
        AuthorId: "" + userId
      };
      console.log("Blog Data : " + blogData);
      if (!blogData.body || !blogData.title) {
        return;
      }

      $.post("/api/createblog", blogData, function () {
        // bodyInput.val("");
        // titleInput.val("");
        window.location.replace("/viewblogs");
      });
    }
  });

  function loadBlog() {
    postId = localStorage.getItem("postId");
    localStorage.setItem("postId", null);

    if (postId !== null) {
      editPost = true;

      $.get("/api/specific-post/" + postId, function (data) {
        console.log(data);
        $("#titleInput").val(data.title);
        $("#textInput").val(data.body);
      });
    }
  }


});
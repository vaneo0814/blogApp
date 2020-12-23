$(document).ready(function () {
  //make createBlognav (pencil icon on nav) go to sign up if not signed in, and if so go to createblog
  // blogContainer holds all of our blogs
  var blogContainer = $(".containerBlog");
  var blogCategory = $("#category");
  //input value where user searches for a keyword of a blog if exists in database
  var searchBlogs = $("#searchBlogs");
  console.log(searchBlogs);
  //submit button to search
  var searchBtn = $("#searchblogsBtn");
  console.log(searchBtn);
  // dynamically creating click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  var passwordInput = $("#registerPassword");
  var usernameInput = $("#registerUsername");
  var userInput = $("#userInput");
  // Variable to hold our blogs
  function getUser() {
    $.get("/api/userdata").then(function (data) {
      console.log(data);
      userId = data.id;
    });
  }
  getUser();
  var blogs;


  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt).toLocaleDateString();
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("Delete");
    deleteBtn.addClass("deleteBtn");
    var editBtn = $("<button>");
    editBtn.text("Edit");
    editBtn.addClass("editBtn");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h5>");
    newPostAuthor.text("Blogger: " + post.Author.name);
    newPostAuthor.css({
      float: "right",
      "margin-top":
        "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }
  // The code below handles the case where we want to get blogs for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getblogs(authorId);
  }
  // If there's no authorId we just get all blogs as usual
  else {
    getblogs();
  }
  // This function grabs blogs from the database and updates the view
  function getblogs(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/blogs" + authorId, function (data) {
      console.log("blogs", data);
      blogs = data;
      if (!blogs || !blogs.length) {
        displayEmpty(author);
      }
      else {
        initializeRows();
      }
    });
  }
  // This function does an API call to delete blogs
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/blogs/" + id
    })
      .then(function () {
        getblogs(blogCategory.val());
      });
  }
  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  // This function constructs a post's HTML
  // function initializeRows() {
  //   blogContainer.empty();
  //   var blogsToAdd = [];
  //   for (var i = 0; i < blogs.length; i++) {
  //     blogsToAdd.push(createNewRow(blogs[i]));
  //   }
  //   blogContainer.append(blogsToAdd);
  // }
  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }
  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }
  // This function displays a message when there are no blogs
  function displayEmpty(id) {
    var query = window.location.search;
    console.log(query);
    var partial = "";
    console.log(partial);
    if (id) {
      partial = " for Author #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No blogs have been created yet");
    blogContainer.append(messageH2);
  }
  //testing adding blogs
  $.get("/api/posts", function(data){
    console.log(data)
    data.forEach((e,i) => {
      var container = $("#blogContainer");
      // for(var i=0 ;i < data.length; i++){
        container.append(`<div class="containerAppend">
        <div class="row">
          <div class="col-md">
            <h1 class="headerTitle">${e.title}</h1>
          </div>
          <div class="col-md">
            <p>${e.Author.username}</p>
          </div>
        </div>
        <div class="row">
          <h4>${e.body}</h4>
        </div>
      </div>
      <hr>
`)
      
      // $("#blogContainer").append(`
      //   <div class="containerAppend">
      //     <div class="row">
      //       <div class="col-md">
      //         <h1 class="headerTitle">${e.title}</h1>
      //       </div>
      //       <div class="col-md">
      //         <p>${e.Author.username}</p>
      //       </div>
      //     </div>
      //     <div class="row">
      //       <h4>${e.body}</h4>
      //     </div>
      //   </div>
      // `)
    });
  });
});
// Dropdown menu js - On click drop down function
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
console.log(myFunction);
// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
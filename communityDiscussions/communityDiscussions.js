var firebaseConfig = {
    apiKey: "AIzaSyBum5fsCbo5C2MM4R4toVMUD0GppXwhl8I",
    authDomain: "goldenglow-9d871.firebaseapp.com",
    projectId: "goldenglow-9d871",
    storageBucket: "goldenglow-9d871.appspot.comm",
    messagingSenderId: "322751213845",
    appId: "1:322751213845:web:312c07736a15a7666eb91c",
    measurementId: "G-HDPX71XSVM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

  function createPost() {
    var postContent = document.getElementById("postContent").value;
    if (postContent.trim() !== "") {
        var postsDiv = document.querySelector(".posts");
        var postElement = document.createElement("div");
        postElement.classList.add("post");

        // Generate a unique ID for the post
        var postId = database.ref('posts').push().key;
        postElement.setAttribute("data-post-id", postId); // Set the data-post-id attribute

        postElement.innerHTML = `
            <div class="user-icon-container">
                <img src="icons&images/user-icon.jpg" class="user-icon" alt="User Icon">
            </div>
            <div class="post-content">
                <p>${postContent}</p>
            </div>
            <div class="comments">
                <h3>Comments</h3>
                <form class="comment-form">
                    <textarea class="comment-content" rows="1" placeholder="Write a comment..."></textarea>
                    <button type="button" onclick="postComment(this)">Post</button>
                </form>
                <div class="comment-list">
                    <!-- Comments will be displayed here -->
                </div>
            </div>`;

        // Fetch comments for this post
        var commentsRef = database.ref('posts/' + postId + '/comments');
        commentsRef.on('child_added', function(snapshot) {
            var comment = snapshot.val();
            var commentList = postElement.querySelector(".comment-list");
            var commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `<p>${comment.content}</p>`;
            commentList.appendChild(commentElement);
        });

        postsDiv.appendChild(postElement);
        document.getElementById("postForm").reset();
    }
}


function postComment(button) {
    var commentForm = button.parentElement;
    var commentContent = commentForm.querySelector(".comment-content").value;
    if (commentContent.trim() !== "") {
        var commentList = commentForm.parentElement.querySelector(".comment-list");
        var commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `<p>${commentContent}</p>`;
        commentList.appendChild(commentElement);
        commentForm.querySelector(".comment-content").value = ""; // Clear input after posting
    }
}


  


firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location.href = "../loginSignup/signUp.html"; // Redirect to sign-up page if not logged in
    }
});
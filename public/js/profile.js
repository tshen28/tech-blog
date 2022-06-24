console.log("linked");
document.querySelector("#new-blog").addEventListener("submit", e => {
  e.preventDefault()
  const newBlog = {
      title: document.querySelector("#blog-title").value,
      body: document.querySelector("#blog-body").value,
  }
  fetch("/api/blogs", {
      method: "POST",
      body: JSON.stringify(newBlog),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res => {
      if (res.ok) {
          document.location.reload()
      } else {
          alert("Post failed.")
      }
  })
});

const deleteBtn = document.querySelectorAll(".deleteBtn")
for (const button of deleteBtn){
  button.addEventListener("click", e => {
    fetch(`/api/blogs/${e.target.value}`, {
      method: "DELETE"
    }).then(res => {
      if (res.ok) {
        document.location.reload();
      } else {
        alert(res.statusText);
      }
    })
  })
}
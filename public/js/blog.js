const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const blogId = document.querySelector('#comment').getAttribute('blogId');

    if (comment) {
        const response = await fetch('/api/comments/' + blogId, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            location.reload();
        } else {
            alert("Failed to post comment.")
        }
    }
};

document
    .querySelector('#addComment')
    .addEventListener('submit', commentFormHandler);

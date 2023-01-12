function newPost() {
	let text = getPostText()
	let elem = createPost(text)
	addNewPost(elem)
}

function getPostText() {
	let postInputElement = document.getElementById('post_text')
	return postInputElement.value
}

function createPost(text) {
	return `
		<div class="post">
			<div class="post_text">
				${text}
			</div>
		</div>
	`
}

function addNewPost(elem) {
	let posts = document.getElementById('posts')
	let post = document.createElement('div')
	post.innerHTML = elem
	posts.insertAdjacentElement('afterbegin', post)
}
let POSTID = 0

function newPost() {
	let post = {
		id: getPostId(),
		text: getPostText(),
		user: getUser()
	}
	let elem = createPost(post)
	addNewPost(elem)
}

function getPostId() {
	return ++POSTID
}

function getPostText() {
	let postInputElement = document.getElementById('post_text')
	return postInputElement.value
}

function getUser() {
	let userNameElement = document.getElementById('username')
	return userNameElement.value
}

function createPost(post) {
	return `
		<div id="post-${post.id}" class="post container">
			<div class="post_title">
				${post.user}
			</div>
			<div class="post_text">
				${post.text}
			</div>
			${createPostLikes(post)}
		</div>
	`
}

function createPostLikes(post) {
	return `
		<div class="post_likes_container">
			<div class="post_likes_info">
				<span class="post_likes_count">
					0
				</span> 
				likes
			</div>
			<button class="post_like_button" onclick="newLike(${post.id})">
				like
			</button>
		</div>
	`
}

function newLike(postId) {
	let postElem = document.getElementById(`post-${postId}`)
	let postLikes = postElem.querySelector('div.post_likes_info')
	let postLikesCountElem = postLikes.querySelector('span.post_likes_count')
	let postLikesCount = Number(postLikesCountElem.innerText)
	postLikesCountElem.innerText = ++postLikesCount
}

function addNewPost(elem) {
	let posts = document.getElementById('posts')
	let post = document.createElement('div')
	post.innerHTML = elem
	posts.insertAdjacentElement('afterbegin', post)
}

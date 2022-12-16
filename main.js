// mobile navigation functionality

const navToggle = document.querySelector('.toggle-button');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-hidden')
})

// blog comment form functionality

const commentForm = document.querySelector('.comment-form');
const commentsSection = document.querySelector('.comments-section');

function getCommentDetails() {
    const userName = document.querySelector('#user-name').value;
    const userComment = document.querySelector('#user-comment').value;
    return { userName, userComment };
}

function postCommentDetails(commentObject) {
    const containerEl = createCommentContainerEl();
    const nameEl = containerEl.querySelector('.user-name');
    nameEl.textContent = `${commentObject.userName}`
    const commentEl = containerEl.querySelector('.user-comment');
    commentEl.textContent = `${commentObject.userComment}`;
    commentsSection.insertBefore(containerEl, commentForm);
}

function createCommentContainerEl() {
    const container = document.createElement('article');
    container.classList.add('comment');
    container.innerHTML = `<div class="visitor-img">
                                <img src="./assets/comment-2.jpg" alt="Julia's profile picture">
                            </div>
                            <div class="visitor-commment">
                                <p>${createDateString()} by <span class="user-name"></span></p>
                                <p class="user-comment"></p>
                            </div> <!-- .visitor-comment end -->`;
    return container;
}

function createDateString() {
    const date = new Date();
    const weekDay = date.toLocaleString('en-us', { weekday: 'long' });
    const monthDay = date.getDate();
    const month = date.toLocaleString('en-us', { month: 'long' });
    const year = date.getFullYear();
    return `${weekDay} ${month} ${monthDay}th, ${year}`
}

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentDetails = getCommentDetails();
    postCommentDetails(commentDetails);
})
// mobile navigation functionality

const navToggle = document.querySelector('.toggle-button');
const navLinksContainer = document.querySelector('.nav-links-container');
const navLinks = navLinksContainer.querySelectorAll('a');

function changeChildrenTabIndex(parentEl) {
    if (parentEl.classList.contains('mobile-hidden')) {
        navLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    } else {
        navLinks.forEach(link => link.removeAttribute('tabindex'));
    }
}

navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-hidden');
    changeChildrenTabIndex(navLinksContainer);
})

// ensures that if you resize screen, while nav links are hidden, that the tabindex is adjusted appropriately. If you resize to larger screen sizes, the nav links should always be on display and interactive.
window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
        navLinks.forEach(link => link.removeAttribute('tabindex'));
    } else {
        changeChildrenTabIndex(navLinksContainer);
    }
})

// for smaller screen sizes, ensure tabindex has appropriate value upon page load 
if (window.innerWidth > 800) {
    navLinks.forEach(link => link.removeAttribute('tabindex'));
} else {
    changeChildrenTabIndex(navLinksContainer);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinksContainer.classList.add('mobile-hidden');
    }
})



// BLOG COMMENTS FORM FUNCTIONALITY
// Selects the comments section element
const commentsSection = document.querySelector('.comments-section');
// selects the form within the comments section element
const commentForm = document.querySelector('.comment-form');
// extracts data from form and returns it as a descriptive object 
function getCommentDetails() {
    const userName = document.querySelector('#user-name').value;
    const userEmail = document.querySelector('#user-email').value;
    const userComment = document.querySelector('#user-comment').value;
    return { userName, userEmail, userComment };
}
// triggers the creation, population(using the extracted form data), and insertion of the html 
function postCommentDetails(commentObject) {
    const containerEl = createCommentContainerEl();
    const nameEl = containerEl.querySelector('.user-name');
    const commentEl = containerEl.querySelector('.user-comment');
    nameEl.textContent = `${commentObject.userName}`
    commentEl.textContent = `${commentObject.userComment}`;
    // this method is used in order to keep the form as the last child of the comments section
    commentsSection.insertBefore(containerEl, commentForm);
}

function createCommentContainerEl() {
    const container = document.createElement('article');
    container.classList.add('comment');
    // quickly creates the required html framework but does not add the form data to avoid XSS issues. Ideally img element attributes would be populated from database on server
    container.innerHTML = `<div class="visitor-img">
                                <img src="./assets/comment-2.jpg" alt="User profile picture">
                            </div>
                            <div class="visitor-comment">
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
    // extracts data from form
    const commentDetails = getCommentDetails();
    // creates and populates the html
    postCommentDetails(commentDetails);
})

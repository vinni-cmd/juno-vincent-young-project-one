// SMALL SCREEN SIZE NAV FUNCTIONALITY
const navToggleApp = {};
// selects the nav toggle button
navToggleApp.navToggle = document.querySelector('.toggle-button');
// selects the navigation links list element
navToggleApp.navLinksContainer = document.querySelector('.nav-links-container');
// selects all the anchor elements inside of the navigation links list element
navToggleApp.navLinks = navToggleApp.navLinksContainer.querySelectorAll('a');

// when nav list is not expanded or visible ensure that keyboard users can't tab into the list
navToggleApp.changeChildrenTabIndex = function (parentEl) {
    if (parentEl.classList.contains('mobile-hidden')) {
        navToggleApp.navLinks.forEach(link => link.setAttribute('tabindex', '-1'));
    } else {
        navToggleApp.navLinks.forEach(link => link.removeAttribute('tabindex'));
    }
}

// If you resize to larger screen sizes, the nav links should always be on display and interactive.
navToggleApp.toggleChildrenTabIndex = function () {
    if (window.innerWidth > 800) {
        navToggleApp.navLinks.forEach(link => link.removeAttribute('tabindex'));
    } else {
        navToggleApp.changeChildrenTabIndex(navToggleApp.navLinksContainer);
    }
}

navToggleApp.setupEventListeners = function () {
    // hides or expands nav list upon click. nav list also expands when enter key is pressed while toggle button is in focus`
    navToggleApp.navToggle.addEventListener('click', () => {
        navToggleApp.navLinksContainer.classList.toggle('mobile-hidden');
        navToggleApp.changeChildrenTabIndex(navToggleApp.navLinksContainer);
    });
    // ensures that if you resize screen, while nav links are hidden, that the tabindex is adjusted appropriately.
    window.addEventListener('resize', () => {
        navToggleApp.toggleChildrenTabIndex();
    });
    // allow keyboard users to close expanded nav list
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navToggleApp.navLinksContainer.classList.add('mobile-hidden');
        }
    });
}

navToggleApp.init = function () {
    // for smaller screen sizes, ensure tabindex has appropriate value upon page load 
    navToggleApp.toggleChildrenTabIndex();
    navToggleApp.setupEventListeners();
}

navToggleApp.init();

// BLOG COMMENTS FORM FUNCTIONALITY --- still need to contain all the below code in an app object
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

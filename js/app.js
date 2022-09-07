/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 * 
 */

//selecting needed items from the DOM
const navbar = document.querySelector("ul");
const mainSections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * @description the function loops over the main sections to identify which section now has the class active(now in the viewport)
 * @return string containing the name (data-nav) of the active section
 */
function identifyActiveSection() {
    let activeSection = "";
    for(let section of mainSections) {
        if(section.classList.contains("active")) {
            activeSection = section.getAttribute("data-nav");
        }
    }
    return activeSection;
}

/**
 * @description give the navbar item the styling of active class according to the
 *              active section in the viewport
 */
function setActiveNavBarItem() {
    //get active section
    let activeSection = identifyActiveSection();
    //get li elements from navbar element
    let navItems = navbar.children;
    //looping over li elements
    for(let navItem of navItems) {
        //getting the anchor tag from li element
        navItem = navItem.firstChild;
        //removing active class from all items
        navItem.classList.remove("active-section");
        //giving the desired item the active class
        if(navItem.textContent === activeSection) {
            navItem.classList.add("active-section");
        }
    }
}
/**
 * 
 * @param {object} entries list of entries that their intersection status changed
 * @description entries param indicate which section is at the top of viewport an accordingly changes the state of class active
 */
function handleSectionInViewPort(entries) {
    for(let entry of entries) {
        //if isIntersecting is false class active is removed and vice versa
        entry.target.classList.toggle("active", entry.isIntersecting);
    }

    //After updating the class attribute for the sections tag the state of active section in navbar is updated
    setActiveNavBarItem();
}

/**
 * @description changes the display value once the user stops scrolling
 */
function scrollEnded() {
    navbar.style.display = "none";
}

/**
 * @description toggles the responsive nav class everytime the plus is clicked
 */
function responsiveBar() {
    navbar.classList.toggle("responsive__nav");
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav

//Declaring variables
const navData = new DocumentFragment();
//defined once as a variable to save memory
let navItem, navAnchor; 

//looping over main sections
for(let section of mainSections) {
    //creating elements
    navItem = document.createElement("li");
    navAnchor = document.createElement("a");

    //Setting needed attributes with desired values
    navAnchor.classList.add("menu__link");
    navAnchor.textContent = section.getAttribute("data-nav");
    navAnchor.href = "#" + section.getAttribute("id");
    navAnchor.addEventListener("click", scrollToSection);
    
    //appending elements
    navItem.append(navAnchor);
    navData.append(navItem);
}

//Adding another anchor for responsive navbar
navItem = document.createElement("li");
navAnchor = document.createElement("a");

//Setting needed attributes with desired values
navAnchor.textContent = "+";
navAnchor.classList.add("responsive__icon", "menu__link");
navAnchor.addEventListener("click", responsiveBar);

//appending elements
navItem.append(navAnchor);
navData.append(navItem);

//appending once to navbar to invoke reflow and repaint only once
navbar.append(navData);


// Add class "active" to section when near top of viewport

//Declaring and intializing the options
//threshold is a ratio between 0 and 1, threshold 0.8 invokes the callback function once the target has at least 80% in the viewport
const options = {threshold: 0.8}

//Declaring an intializing an observer object with the callback function and the desired options
const observer = new IntersectionObserver(handleSectionInViewPort, options)

//looping over elements that need to be observed
for (let section of mainSections) {
    observer.observe(section);
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
 */

//Hide navbar when not scrolling
document.addEventListener("scroll", scrollDocument);
//to indicate whether another scroll event is received or if the user actually stopped scrolling
let timer = -1;
/**
 * @param {event} event scroll event
 * @description hides the navbar when user is not scrolling
 */
function scrollDocument(event) {
    navbar.style.display = "block";
    //clearing timer from previously fired setTimeout so as to avoid flickering behaviour
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(scrollEnded,5000);
}

// Build menu 

// Scroll to section on link click
/**
 * @param {event} event click event
 * @description scroll to the desired section instead of refering to it directly through href property in anchor tag
 */
function scrollToSection(event) {
    event.preventDefault();
    let clickedSection = event.srcElement.getAttribute("href")
    document.querySelector(clickedSection).scrollIntoView({behavior: "smooth"});
}

// Set sections as active



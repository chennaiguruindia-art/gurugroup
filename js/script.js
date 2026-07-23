var navs;
console.log("script")
const header = document.querySelector("header");
const sectionOne = document.querySelector(".banner-content");
const navLink = document.querySelectorAll("header nav ul li a");
const preloader = document.querySelector(".preloader");




const sectionOneOptions = {
    rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function (
    entries,
    sectionOneObserver
) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            header.classList.add("nav-change");
            for (let i = 0; i < navLink.length; i++) {
                navLink[i].classList.add("navlink-change");
            }

        } else {
            header.classList.remove("nav-change");
            for (let i = 0; i < navLink.length; i++) {
                navLink[i].classList.remove("navlink-change");
            }
        }
    });
},
    sectionOneOptions);

sectionOneObserver.observe(sectionOne);





let section_counter = document.querySelector('#section_counter');
let counters = document.querySelectorAll('.counter');






const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".close-icon")
const body = document.querySelector("body");
const menuIcon = document.querySelector(".menu-icon")
const sidebar = document.querySelector("header nav")
hamburger.addEventListener("click", () => {
    console.log("ok")
    sidebar.classList.toggle("show-sidebar")
    closeIcon.classList.toggle("close-icon-cng")
    menuIcon.classList.toggle("menu-icon-cng")
    body.classList.toggle("overflowLock")
    hamburger.classList.toggle("active")
})



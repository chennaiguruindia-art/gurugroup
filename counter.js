let CounterObserver = new IntersectionObserver(
    (entries, observer) => {
        let [entry] = entries;
        if (!entry.isIntersecting) return;

        let speed = 50;
        counters.forEach((counter, index) => {
            function UpdateCounter() {
                const targetNumber = +counter.dataset.target;
                const initialNumber = +counter.innerText;
                const incPerCount = targetNumber / speed;
                if (initialNumber < targetNumber) {
                    counter.innerText = Math.ceil(initialNumber + incPerCount);
                    setTimeout(UpdateCounter, 40);
                }
                else {
                    counter.innerText = targetNumber;
                }
            }
            UpdateCounter();

          
        });
        observer.unobserve(section_counter);
    },
    {
        root: null,
        threshold: window.innerWidth > 768 ? 0.4 : 0.3,
    }
);
     let currentTestimonialIndex = 0;
     const testimonials = document.querySelectorAll(".testimonial");

     function showNextTestimonial() {
         testimonials[currentTestimonialIndex].classList.remove("active");
         currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
         testimonials[currentTestimonialIndex].classList.add("active");
     }
setInterval(showNextTestimonial , 4000);
    //  setInterval(showNextTestimonial, 5000); // Change every 5 seconds

     // Blog Script
     let currentBlogIndex = 0;
     const blogs = document.querySelectorAll(".blog-item");
     const leftNav = document.querySelector(".left-nav");
     const rightNav = document.querySelector(".right-nav");

     function showBlog(index) {
         blogs.forEach((blog, i) => {
             blog.classList.toggle("active", i === index);
         });
     }

     leftNav.addEventListener("click", () => {
         currentBlogIndex = (currentBlogIndex - 1 + blogs.length) % blogs.length;
         showBlog(currentBlogIndex);
     });

     rightNav.addEventListener("click", () => {
         currentBlogIndex = (currentBlogIndex + 1) % blogs.length;
         showBlog(currentBlogIndex);
     });

     // Automatically change blog every 7 seconds
     setInterval(() => {
         currentBlogIndex = (currentBlogIndex + 1) % blogs.length;
         showBlog(currentBlogIndex);
     }, 7000); // Change every 7 seconds

     // Show the first blog initially
     showBlog(currentBlogIndex);
     
     
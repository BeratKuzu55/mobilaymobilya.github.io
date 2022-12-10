const Carousel = document.querySelector(".carousel");
firstImg = Carousel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");


let isDragStart = false , prevPageX , prevScrollLeft , positionDiff;


const showHideIcons = () => {
    let scrollWidth = Carousel.scrollWidth - Carousel.clientWidth;
    arrowIcons[0].style.display = Carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = Carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click" , () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        Carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons() , 60);
    })
});


const dragStart = (e) => {

    isDragStart  = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = Carousel.scrollLeft;

}

const dragging = (e) => {

    if(!isDragStart) return;
    e.preventDefault() 
    Carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX)- prevPageX;
    Carousel.scrollLeft = prevScrollLeft - positionDiff; 
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    Carousel.classList.remove("dragging");
}


Carousel.addEventListener("mousedown" , dragStart);
Carousel.addEventListener("touchstart" , dragStart);

Carousel.addEventListener("mousemove" , dragging);
Carousel.addEventListener("touchmove" , dragging);

Carousel.addEventListener("mouseup" , dragStop);
Carousel.addEventListener("mouseleave" , dragStop);
Carousel.addEventListener("touchend" , dragStop);
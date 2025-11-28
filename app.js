gsap.registerPlugin(SplitText)

const object = [
    {
        text: "ZARA – effortless style for the modern world.",
        image:"1.jpg"
    },
    {
        text: "ZARA – where fashion meets the street.",
        image: "2.jpg"
    },
    {
        text: "ZARA – curated classics with a bold twist.",
        image: "3.jpg"
    },
    {
        text: "ZARA – discover your next wardrobe essential.",
        image: "4.jpg"
    },
    {
        text: "ZARA – timeless design, always in motion.",
        image: "5.jpg"
    }
    
]

function setTheSlider() {

        const slider = document.getElementById('sliders')

        object.forEach((element,i) => {
            const div = document.createElement('div')
            div.className="slider"
            div.id=i;
            div.innerHTML=`
                <h1>${element.text}</h1>
                <img src=${element.image} alt=${element.text}/>
                 `;
            slider.appendChild(div)
            gsap
        });
      


}

function animateSliders() {
  const sliderNodes = document.querySelectorAll('.slider');
  let sliders = Array.from(sliderNodes); // ✅ real array so shift/ push works

  // initial stack setup
  sliders.forEach((el, index) => {
    gsap.set(el, {
      y: -15 * index,
      zIndex: index * -10
    });
  });

  // store original positions
  const originalY = sliders.map(s => gsap.getProperty(s, "y"));
  const originalZ = sliders.map(s => gsap.getProperty(s, "zIndex"));

  document.addEventListener("wheel", (event) => {
    if (event.deltaY < 0) { // scroll up
      const tl = gsap.timeline();

      const first = sliders.shift(); // ✅ works now
      sliders.push(first);

      tl.to(first, {
        y: 250,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut"
      }).to(first, {
        y: originalY[sliders.length - 1], // ✅ last stored position
        zIndex: originalZ[sliders.length - 1],
        opacity: 1,
        duration: 0
      });

      // reapply stack positions to all
      sliders.forEach((el, i) => {
        tl.to(el, {
          y: originalY[i],
          zIndex: originalZ[i],
          ease: "power3.inOut",
          duration: 0.3
        }, 0);
      });
    }
  });
}


document.addEventListener("DOMContentLoaded",(event) => {
    setTheSlider();
    animateSliders()
})
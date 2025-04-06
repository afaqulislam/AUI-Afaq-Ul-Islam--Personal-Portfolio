/*==================== LODER ====================*/
window.addEventListener("load", function () {
  // Hide loading screen after 2 seconds
  setTimeout(function () {
    document.getElementById("loading-screen").style.display = "none";
  }, 2000);
});

const contactForm = document.getElementById("contact-form");

const sendEmail = (e) => {
  e.preventDefault();

  // Show loading alert with custom styling
  Swal.fire({
    title: "Sending...",
    text: "Please wait while we send your message ⏳",
    icon: "info",
    background: "hsl(14, 100%, 1%)", // Custom background color
    color: "#ffffff", // Text color
    iconColor: "hsl(14, 80%, 49%)", // Icon color
    allowOutsideClick: false,
    showConfirmButton: false,
    customClass: {
      popup: "swal-custom-popup",
      title: "swal-custom-title",
      confirmButton: "swal-custom-button",
    },
    didOpen: () => {
      Swal.showLoading();
    },
  });

  emailjs
    .sendForm(
      "service_g6tf45t",
      "template_za2q47l",
      "#contact-form",
      "EufE-TwgiQJm9ssZg"
    )
    .then(
      () => {
        Swal.fire({
          title: "Success ✅",
          text: "Your message has been sent successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
          allowOutsideClick: false,
          background: "hsl(14, 100%, 1%)",
          color: "#ffffff",
          iconColor: "hsl(14, 80%, 49%)",
          confirmButtonColor: "hsl(14, 76%, 45%)",
          confirmButtonText: "Try Again",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            confirmButton: "swal-custom-button",
          },
        });

        contactForm.reset();
      },
      () => {
        Swal.fire({
          title: "Oops! ❌",
          text: "Message not sent. Something went wrong!",
          icon: "error",
          background: "hsl(14, 100%, 1%)",
          color: "#ffffff",
          iconColor: "hsl(14, 80%, 49%)",
          confirmButtonColor: "hsl(14, 76%, 45%)",
          confirmButtonText: "Try Again",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            confirmButton: "swal-custom-button",
          },
        });
      }
    );
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__list a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true, // Animation repeat
});

// Delay ScrollReveal activation by 3 seconds
setTimeout(() => {
  sr.reveal(`.perfil, .contact__form, .section__title`);
  sr.reveal(`.info`, { origin: "left", delay: 800 });
  sr.reveal(`.skills`, { origin: "left", delay: 1000 });
  sr.reveal(`.about`, { origin: "right", delay: 1200 });
  sr.reveal(
    `.certificates__card, .projects__card, .services__card, .experience__card`,
    {
      interval: 100,
    }
  );
}, 2000); // 2-second delay

/*=============== Text Copy BLocker ===============*/

document.addEventListener("copy", function (event) {
  event.preventDefault(); // Stop the copy action

  Swal.fire({
    title: "🚨Chorri Mat Kar!",
    text: "Tujhe kya laga, main nahi dekh raha? 🤨",
    icon: "warning",
    background: "hsl(14, 100%, 1%)",
    color: "#ffffff",
    iconColor: "hsl(14, 80%, 49%)",
    confirmButtonColor: "hsl(14, 76%, 45%)",
    confirmButtonText: "Maaf karde, bhai! 😅",
    customClass: {
      popup: "swal-custom-popup",
      title: "swal-custom-title",
      confirmButton: "swal-custom-button",
    },
  });
});

/*=============== DISABLE INSPECT ELEMENT ===============*/

// Disable Right Click
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  showWarning("🖱️ Chill kar bhai!", "Right-click se kuch khaas nahi milega 😄");
});

// Disable Developer Tools Shortcuts
document.addEventListener("keydown", (event) => {
  if (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && ["I", "J"].includes(event.key)) ||
    (event.ctrlKey && event.key === "U") ||
    (event.ctrlKey && event.key === "S")
  ) {
    event.preventDefault();
    showWarning("🚨 Pakra gaya!", "Yeh shortcut allowed nahi hai! 🔐");
  }
});

// Detect DevTools Open
let devtoolsOpen = false;
setInterval(() => {
  const widthThreshold = window.outerWidth - window.innerWidth > 160;
  const heightThreshold = window.outerHeight - window.innerHeight > 160;

  if ((widthThreshold || heightThreshold) && !devtoolsOpen) {
    devtoolsOpen = true;
    showWarning(
      "👀 Developer Tools Detected!",
      "Inspector ki nazar sab par hai! Band karo abhi 😠"
    );
  }

  if (!(widthThreshold || heightThreshold) && devtoolsOpen) {
    devtoolsOpen = false; // Reset when closed
  }
}, 1000);

// SweetAlert2 Reusable Warning Function
function showWarning(title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    background: "hsl(14, 100%, 1%)", // --body-color
    color: "#ffffff", // --first-color
    iconColor: "hsl(14, 80%, 49%)",
    confirmButtonColor: "hsl(14, 76%, 45%)", // --first-color-alt
    confirmButtonText: "Thik hai bhai 😅",
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: "swal-custom-popup",
      title: "swal-custom-title",
      confirmButton: "swal-custom-button",
    },
  });
}

const btnBackTop = document.getElementById("btnBackTop");
const footer = document.querySelector(".footer");

const mostrarBotonFooter = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        btnBackTop.classList.add("show");
      } else {
        btnBackTop.classList.remove("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

mostrarBotonFooter.observe(footer);

btnBackTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
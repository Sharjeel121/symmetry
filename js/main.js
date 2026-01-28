// Mobile header dropdown toggle
const headerToggle = document.querySelector(".header__toggle");
const headerMenu = document.getElementById("header-menu");

if (headerToggle && headerMenu) {
  headerToggle.addEventListener("click", () => {
    const isExpanded = headerToggle.getAttribute("aria-expanded") === "true";
    headerToggle.setAttribute("aria-expanded", !isExpanded);
    headerMenu.setAttribute("data-visible", !isExpanded);
  });

  // Close menu when a link is clicked
  const headerLinks = headerMenu.querySelectorAll(".header__link");
  headerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      headerToggle.setAttribute("aria-expanded", "false");
      headerMenu.setAttribute("data-visible", "false");
    });
  });

  // Close menu when mobile Login button is clicked
  const mobileLoginBtn = headerMenu.querySelector(".header__btn-mobile");
  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener("click", () => {
      headerToggle.setAttribute("aria-expanded", "false");
      headerMenu.setAttribute("data-visible", "false");
    });
  }
}

// header sticky on scroll
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("is-scrolled");
  } else {
    header.classList.remove("is-scrolled");
  }
});


gsap.registerPlugin(ScrollTrigger); //plugin registration

// heading running animation
const words = ["Intelligence", "Innovation", "Creativity"];
const wordSpan = document.querySelector(".marquee");
let index = 0;

function typeWord() {
  gsap.to(wordSpan, {
    duration: 1, 
    text: words[index],
    ease: "none",
    onComplete: () => {
      setTimeout(() => {
        index = (index + 1) % words.length;
        typeWord();
      }, 1000);
    }
  });
}

// Start typing animation
typeWord();

// Counter running numbers 
gsap.utils.toArray(".count").forEach((counter) => {
  const target = +counter.dataset.count;
  const suffix = counter.dataset.suffix || "";

  gsap.fromTo(
    counter,
    { innerText: 0 },
    {
      innerText: target,
      duration: 2,
      ease: "power3.out",
      delay: 0.2,
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: counter,
        start: "top 85%",
        once: true
      },
      onUpdate: function () {
        counter.innerText =
          Math.floor(counter.innerText) + suffix;
      }
    }
  );
});

// pricing table
const monthlyBtn = document.getElementById('monthlyBtn');
const yearlyBtn = document.getElementById('yearlyBtn');

const pricingData = {
  monthly: {
    free: 0,
    pro: 17,
    team: 37,
    period: '/ month'
  },
  yearly: {
    free: 0,
    pro: 170,
    team: 370,
    period: '/ year'
  }
};

function animatePrice(el, value) {
  const obj = { val: parseInt(el.textContent.replace('$','')) || 0 };

  gsap.to(obj, {
    val: value,
    duration: 0.6,
    ease: "power2.out",
    onUpdate() {
      el.textContent = `$${Math.round(obj.val)}`;
    }
  });
}

function updatePricing(type) {
  const prices = document.querySelectorAll('.price__amount');
  const periods = document.querySelectorAll('.price__period');

  animatePrice(prices[0], pricingData[type].free);
  animatePrice(prices[1], pricingData[type].pro);
  animatePrice(prices[2], pricingData[type].team);

  periods.forEach(p => p.textContent = pricingData[type].period);
}

monthlyBtn.onclick = () => {
  if (monthlyBtn.classList.contains('toggle__btn--active')) return;
  monthlyBtn.classList.add('toggle__btn--active');
  yearlyBtn.classList.remove('toggle__btn--active');
  updatePricing('monthly');
};

yearlyBtn.onclick = () => {
  if (yearlyBtn.classList.contains('toggle__btn--active')) return;
  yearlyBtn.classList.add('toggle__btn--active');
  monthlyBtn.classList.remove('toggle__btn--active');
  updatePricing('yearly');
};



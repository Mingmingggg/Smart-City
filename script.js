// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the page
  initializeSystemNavigation()
  initializeSmoothScrolling()
  initializeAnimations()
  initializeVideoInteractions()

  // Initialize floating elements
  const floatingElements = document.querySelector(".floating-elements")
  if (floatingElements) {
    floatingElements.style.opacity = "0.7"
    floatingElements.style.transition = "opacity 0.3s ease"
  }

  console.log("Enhanced Smart City Proposal website initialized with 14 systems and video showcases")
})

// System Navigation Functionality
function initializeSystemNavigation() {
  const systemButtons = document.querySelectorAll(".system-btn")
  const systemContents = document.querySelectorAll(".system-content")

  systemButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSystem = this.getAttribute("data-system")

      // Remove active class from all buttons
      systemButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button with enhanced animation
      this.classList.add("active")
      this.style.transform = "scale(1.05)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 200)

      // Hide all system contents
      systemContents.forEach((content) => {
        content.classList.remove("active")
      })

      // Show target system content with fade effect
      const targetContent = document.getElementById(targetSystem + "-content")
      if (targetContent) {
        targetContent.style.opacity = "0"
        targetContent.classList.add("active")
        setTimeout(() => {
          targetContent.style.opacity = "1"
        }, 100)
      }

      // Smooth scroll to system content
      const systemsSection = document.getElementById("systems")
      if (systemsSection) {
        systemsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }

      animateSystemMetrics(targetSystem)
    })
  })
}

function initializeVideoInteractions() {
  const videoPlaceholders = document.querySelectorAll(".video-placeholder")

  videoPlaceholders.forEach((placeholder) => {
    const video = placeholder.querySelector("video")
    const overlay = placeholder.querySelector(".video-overlay")

    if (video && overlay) {
      // Show overlay on hover
      placeholder.addEventListener("mouseenter", () => {
        overlay.style.opacity = "1"
      })

      placeholder.addEventListener("mouseleave", () => {
        if (video.paused) {
          overlay.style.opacity = "0"
        }
      })

      // Play/pause video on click
      overlay.addEventListener("click", () => {
        if (video.paused) {
          video.play()
          overlay.style.opacity = "0"
        } else {
          video.pause()
          overlay.style.opacity = "1"
        }
      })

      // Handle video events
      video.addEventListener("play", () => {
        overlay.style.opacity = "0"
      })

      video.addEventListener("pause", () => {
        overlay.style.opacity = "1"
      })

      video.addEventListener("ended", () => {
        overlay.style.opacity = "1"
      })
    }
  })
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const navbarToggler = document.querySelector(".navbar-toggler")
        navbarToggler.click()
      }
    })
  })
}

// Initialize Animations
function initializeAnimations() {
  // Add loading animation to cards
  const cards = document.querySelectorAll(".card, .benefit-card, .overview-card")

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loading")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  cards.forEach((card) => {
    observer.observe(card)
  })
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(5, 150, 105, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(5, 150, 105, 0.2)"
  } else {
    navbar.style.background = "rgba(5, 150, 105, 0.95)"
    navbar.style.boxShadow = "none"
  }

  const floatingElements = document.querySelector(".floating-elements")
  if (window.scrollY > 300) {
    floatingElements.style.opacity = "1"
    floatingElements.style.pointerEvents = "auto"
  } else {
    floatingElements.style.opacity = "0.7"
    floatingElements.style.pointerEvents = "auto"
  }
})

function animateCounters() {
  const counters = document.querySelectorAll(".hero-stats h3")

  counters.forEach((counter) => {
    const target = counter.textContent
    const isPercentage = target.includes("%")
    let numericValue = Number.parseInt(target.replace(/\D/g, ""))

    // Update the 14 systems counter specifically
    if (target === "14") {
      numericValue = 14
    }

    let current = 0
    const increment = numericValue / 50

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        current = numericValue
        clearInterval(timer)
      }

      if (isPercentage) {
        counter.textContent = Math.floor(current) + "%"
      } else {
        counter.textContent = Math.floor(current)
      }
    }, 30)
  })
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector(".hero-section")
if (heroSection) {
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateCounters, 500)
          heroObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  heroObserver.observe(heroSection)
}

// Interactive hover effects for system cards
document.addEventListener("mouseover", (e) => {
  if (e.target.closest(".card")) {
    const card = e.target.closest(".card")
    card.style.transform = "translateY(-8px)"
    card.style.boxShadow = "0 15px 35px rgba(5, 150, 105, 0.15)"
  }

  if (e.target.closest(".system-metric")) {
    const metric = e.target.closest(".system-metric")
    metric.style.background = "linear-gradient(135deg, #d1fae5, rgba(52, 211, 153, 0.2))"
  }
})

document.addEventListener("mouseout", (e) => {
  if (e.target.closest(".card")) {
    const card = e.target.closest(".card")
    card.style.transform = "translateY(0)"
    card.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  }

  if (e.target.closest(".system-metric")) {
    const metric = e.target.closest(".system-metric")
    metric.style.background = "linear-gradient(135deg, #d1fae5, rgba(52, 211, 153, 0.1))"
  }
})

// Mobile menu auto-close on scroll
let lastScrollTop = 0
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (currentScroll > lastScrollTop && navbarCollapse.classList.contains("show")) {
    // Scrolling down - close mobile menu
    const navbarToggler = document.querySelector(".navbar-toggler")
    navbarToggler.click()
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
})

function trackSystemClick(systemName) {
  const systemNames = {
    traffic: "Traffic Management",
    lighting: "Street Lighting",
    waste: "Waste Management",
    water: "Water Management",
    safety: "Public Safety",
    healthcare: "Healthcare",
    environment: "Environment Monitoring",
    green: "Green Solutions",
    pollution: "Pollution Control",
    governance: "Transparent Governance",
    flood: "Flood Control",
    fire: "Fire Control",
    emergency: "Emergency Response",
    disaster: "Disaster Management",
  }

  console.log(`System clicked: ${systemNames[systemName] || systemName}`)
  // Add your analytics tracking code here
}

// Enhanced system button click tracking
document.querySelectorAll(".system-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const systemName = this.getAttribute("data-system")
    trackSystemClick(systemName)
  })
})

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

function toggleSystemsView() {
  const systemsSection = document.getElementById("systems")
  const systemContents = document.querySelectorAll(".system-content")
  const systemButtons = document.querySelectorAll(".system-btn")

  // Check if all systems are visible
  const allVisible = Array.from(systemContents).every((content) => content.classList.contains("active"))

  if (allVisible) {
    // Hide all except first (traffic management)
    systemContents.forEach((content, index) => {
      if (index > 0) content.classList.remove("active")
    })
    systemButtons.forEach((btn, index) => {
      if (index === 0) {
        btn.classList.add("active")
      } else {
        btn.classList.remove("active")
      }
    })
  } else {
    // Show all 14 systems
    systemContents.forEach((content) => content.classList.add("active"))
    systemButtons.forEach((btn) => btn.classList.add("active"))
  }

  // Scroll to systems section
  systemsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Animate system metrics
function animateSystemMetrics(systemType) {
  const metrics = document.querySelectorAll(`#${systemType}-content .metric-value`)

  metrics.forEach((metric) => {
    const finalValue = metric.textContent
    const numericValue = Number.parseInt(finalValue.replace(/\D/g, ""))
    let currentValue = 0
    const increment = numericValue / 30

    const counter = setInterval(() => {
      currentValue += increment
      if (currentValue >= numericValue) {
        currentValue = numericValue
        clearInterval(counter)
      }

      if (finalValue.includes("+")) {
        metric.textContent = Math.floor(currentValue).toLocaleString() + "+"
      } else if (finalValue.includes("%")) {
        metric.textContent = Math.floor(currentValue) + "%"
      } else {
        metric.textContent = Math.floor(currentValue).toLocaleString()
      }
    }, 50)
  })
}

function optimizeVideoPerformance() {
  const videos = document.querySelectorAll("video")

  videos.forEach((video) => {
    // Add loading="lazy" attribute for better performance
    video.setAttribute("loading", "lazy")

    // Preload metadata only
    video.setAttribute("preload", "metadata")

    // Add error handling
    video.addEventListener("error", (e) => {
      console.log("Video loading error:", e)
      const placeholder = video.closest(".video-placeholder")
      if (placeholder) {
        placeholder.innerHTML = `
          <div class="video-error p-4 text-center">
            <i class="bi bi-exclamation-triangle display-4 text-warning"></i>
            <p class="mt-2">Video content unavailable</p>
          </div>
        `
      }
    })
  })
}

// Initialize video optimizations when page loads
document.addEventListener("DOMContentLoaded", optimizeVideoPerformance)

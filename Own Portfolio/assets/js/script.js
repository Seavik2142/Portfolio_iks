'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// profile photo carousel
const avatarImages = [
  "./Own Portfolio/assets/images/picture.jpg",
  "./Own Portfolio/assets/images/picture-profile.jpg"
];
const avatarImg = document.querySelector("[data-avatar-img]");
const avatarCycleBtn = document.querySelector("[data-avatar-cycle-btn]");
let avatarIndex = 0;

if (avatarImg && avatarCycleBtn) {
  avatarCycleBtn.addEventListener("click", function () {
    avatarIndex = (avatarIndex + 1) % avatarImages.length;
    avatarImg.src = avatarImages[avatarIndex];
  });
}

// Print CV functionality with customizable text modal
const printCvBtn = document.getElementById("print-cv-btn");
const printModal = document.getElementById("print-modal");
const modalCancelBtn = document.getElementById("modal-cancel-btn");
const modalConfirmBtn = document.getElementById("modal-confirm-btn");
const modalClearBtn = document.getElementById("modal-clear-btn");
const modalLoadBtn = document.getElementById("modal-load-btn");

if (printCvBtn && printModal && modalCancelBtn && modalConfirmBtn) {
  // Elements to edit
  const aboutMeText = document.getElementById("about-me-text");
  const expWebdev = document.getElementById("exp-webdev-desc");
  const expMl = document.getElementById("exp-ml-desc");
  const expWebdesign = document.getElementById("exp-webdesign-desc");
  const eduNorton = document.getElementById("edu-norton-desc");
  const eduSalait = document.getElementById("edu-salait-desc");
  const eduHighschool = document.getElementById("edu-highschool-desc");

  // DOM Containers
  const pagesContainer = document.getElementById("modal-pages-container");
  const modalAddPageBtn = document.getElementById("modal-add-page-btn");

  // Helper to clean/collapse internal code indentation, line breaks, and extra spaces
  const cleanText = function(text) {
    if (!text) return "";
    return text.replace(/\s+/g, ' ').trim();
  };

  // Store the absolute original text contents once on page load to prevent any loss of data
  const originalAboutText = aboutMeText ? cleanText(aboutMeText.textContent) : "";
  const originalExpWebdevText = expWebdev ? cleanText(expWebdev.textContent) : "";
  const originalExpMlText = expMl ? cleanText(expMl.textContent) : "";
  const originalExpWebdesignText = expWebdesign ? cleanText(expWebdesign.textContent) : "";
  const originalEduNortonText = eduNorton ? cleanText(eduNorton.textContent) : "";
  const originalEduSalaitText = eduSalait ? cleanText(eduSalait.textContent) : "";
  const originalEduHighschoolText = eduHighschool ? cleanText(eduHighschool.textContent) : "";

  // Helper function to populate a page's textareas with current website content
  const populatePageWithContent = function(section) {
    if (!section) return;
    const inputAbout = section.querySelector(".modal-input-about");
    const inputWebdev = section.querySelector(".modal-input-webdev");
    const inputMl = section.querySelector(".modal-input-ml");
    const inputWebdesign = section.querySelector(".modal-input-webdesign");
    const inputNorton = section.querySelector(".modal-input-norton");
    const inputSalait = section.querySelector(".modal-input-salait");
    const inputHighschool = section.querySelector(".modal-input-highschool");

    if (inputAbout) inputAbout.value = aboutMeText ? cleanText(aboutMeText.textContent) : originalAboutText;
    if (inputWebdev) inputWebdev.value = expWebdev ? cleanText(expWebdev.textContent) : originalExpWebdevText;
    if (inputMl) inputMl.value = expMl ? cleanText(expMl.textContent) : originalExpMlText;
    if (inputWebdesign) inputWebdesign.value = expWebdesign ? cleanText(expWebdesign.textContent) : originalExpWebdesignText;
    if (inputNorton) inputNorton.value = eduNorton ? cleanText(eduNorton.textContent) : originalEduNortonText;
    if (inputSalait) inputSalait.value = eduSalait ? cleanText(eduSalait.textContent) : originalEduSalaitText;
    if (inputHighschool) inputHighschool.value = eduHighschool ? cleanText(eduHighschool.textContent) : originalEduHighschoolText;
  };

  // Helper to populate all sections
  const populateAllSections = function() {
    const sections = pagesContainer.querySelectorAll(".modal-page-section");
    sections.forEach(section => populatePageWithContent(section));
  };

  // Helper to remove extra dynamically created pages (resetting back to Page 1)
  const resetToSinglePage = function() {
    if (!pagesContainer) return;
    const sections = pagesContainer.querySelectorAll(".modal-page-section");
    for (let i = 1; i < sections.length; i++) {
      sections[i].remove();
    }
  };

  printCvBtn.addEventListener("click", function () {
    // Reset pages container to have only 1 page
    resetToSinglePage();

    // Auto-populate Page 1 with current website content
    const firstSection = pagesContainer.querySelector(".modal-page-section");
    populatePageWithContent(firstSection);

    // Show modal
    printModal.classList.add("active");
  });

  // Cancel action
  modalCancelBtn.addEventListener("click", function () {
    printModal.classList.remove("active");
  });

  // Add Page Action
  if (modalAddPageBtn && pagesContainer) {
    modalAddPageBtn.addEventListener("click", function () {
      const sections = pagesContainer.querySelectorAll(".modal-page-section");
      const nextIndex = sections.length;

      const newSection = document.createElement("div");
      newSection.className = "modal-page-section";
      newSection.setAttribute("data-page-index", nextIndex);

      newSection.innerHTML = `
        <div class="page-section-header">
          <h4 class="form-section-title">Custom Page ${nextIndex + 1}</h4>
          <button type="button" class="remove-page-btn">Remove Page</button>
        </div>
        
        <div class="form-group">
          <label>About Me / Summary</label>
          <textarea class="modal-input-about" rows="4"></textarea>
        </div>

        <h5 class="form-subsection-title">Experience Descriptions</h5>
        <div class="form-group">
          <label>Web Developer</label>
          <textarea class="modal-input-webdev" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label>Machine Learning</label>
          <textarea class="modal-input-ml" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label>Web Designer</label>
          <textarea class="modal-input-webdesign" rows="2"></textarea>
        </div>

        <h5 class="form-subsection-title">Education Descriptions</h5>
        <div class="form-group">
          <label>Norton University of Cambodia</label>
          <textarea class="modal-input-norton" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label>Sala IT</label>
          <textarea class="modal-input-salait" rows="2"></textarea>
        </div>
        <div class="form-group">
          <label>High School</label>
          <textarea class="modal-input-highschool" rows="2"></textarea>
        </div>
      `;

      // Setup remove button action
      const removeBtn = newSection.querySelector(".remove-page-btn");
      if (removeBtn) {
        removeBtn.addEventListener("click", function() {
          newSection.remove();
          // Renumber remaining pages
          const remaining = pagesContainer.querySelectorAll(".modal-page-section");
          remaining.forEach((sec, idx) => {
            sec.setAttribute("data-page-index", idx);
            sec.querySelector(".form-section-title").textContent = `Custom Page ${idx + 1}`;
          });
        });
      }

      // Populate new page's About Me with original text, but keep Experience/Education empty by default
      const inputAbout = newSection.querySelector(".modal-input-about");
      if (inputAbout) inputAbout.value = originalAboutText;

      pagesContainer.appendChild(newSection);
    });
  }

  // Clear fields action (Resets to a single page, clears Experience & Education, resets About Me to the original webpage content)
  if (modalClearBtn) {
    modalClearBtn.addEventListener("click", function () {
      // 1. Remove all extra custom pages, leaving only Page 1
      resetToSinglePage();

      // 2. Clear Experience & Education and reset About Me on Page 1
      const firstSection = pagesContainer.querySelector(".modal-page-section");
      if (firstSection) {
        const inputAbout = firstSection.querySelector(".modal-input-about");
        const inputWebdev = firstSection.querySelector(".modal-input-webdev");
        const inputMl = firstSection.querySelector(".modal-input-ml");
        const inputWebdesign = firstSection.querySelector(".modal-input-webdesign");
        const inputNorton = firstSection.querySelector(".modal-input-norton");
        const inputSalait = firstSection.querySelector(".modal-input-salait");
        const inputHighschool = firstSection.querySelector(".modal-input-highschool");

        if (inputWebdev) inputWebdev.value = "";
        if (inputMl) inputMl.value = "";
        if (inputWebdesign) inputWebdesign.value = "";
        if (inputNorton) inputNorton.value = "";
        if (inputSalait) inputSalait.value = "";
        if (inputHighschool) inputHighschool.value = "";
        
        // Reset About Me to the original webpage's About Me
        if (inputAbout) inputAbout.value = originalAboutText;
      }
    });
  }

  // Load current page text action
  if (modalLoadBtn) {
    modalLoadBtn.addEventListener("click", populateAllSections);
  }

  // Confirm and Print action
  modalConfirmBtn.addEventListener("click", function () {
    const sections = pagesContainer.querySelectorAll(".modal-page-section");
    const clonesToCleanup = [];

    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    // Hide the original main container during print
    mainEl.classList.add("print-hidden-temp");

    // Loop through all custom pages and create visible printed page elements
    sections.forEach((section, index) => {
      const mainClone = mainEl.cloneNode(true);
      mainClone.classList.remove("print-hidden-temp"); // Clone must be visible!
      
      // If it's not the first clone, add page-break class
      if (index > 0) {
        mainClone.classList.add("print-page-2");
      }

      // Get text inputs
      const inputAbout = section.querySelector(".modal-input-about");
      const inputWebdev = section.querySelector(".modal-input-webdev");
      const inputMl = section.querySelector(".modal-input-ml");
      const inputWebdesign = section.querySelector(".modal-input-webdesign");
      const inputNorton = section.querySelector(".modal-input-norton");
      const inputSalait = section.querySelector(".modal-input-salait");
      const inputHighschool = section.querySelector(".modal-input-highschool");

      // Select DOM nodes in clone
      const cloneAboutMe = mainClone.querySelector("#about-me-text");
      const cloneExpWebdev = mainClone.querySelector("#exp-webdev-desc");
      const cloneExpMl = mainClone.querySelector("#exp-ml-desc");
      const cloneExpWebdesign = mainClone.querySelector("#exp-webdesign-desc");
      const cloneEduNorton = mainClone.querySelector("#edu-norton-desc");
      const cloneEduSalait = mainClone.querySelector("#edu-salait-desc");
      const cloneEduHighschool = mainClone.querySelector("#edu-highschool-desc");

      // Update clone content
      let aboutMeVal = inputAbout ? inputAbout.value.trim() : "";
      if (aboutMeVal === "") {
        aboutMeVal = originalAboutText;
      }
      if (cloneAboutMe) cloneAboutMe.textContent = aboutMeVal;

      if (cloneExpWebdev && inputWebdev) cloneExpWebdev.textContent = inputWebdev.value;
      if (cloneExpMl && inputMl) cloneExpMl.textContent = inputMl.value;
      if (cloneExpWebdesign && inputWebdesign) cloneExpWebdesign.textContent = inputWebdesign.value;
      if (cloneEduNorton && inputNorton) cloneEduNorton.textContent = inputNorton.value;
      if (cloneEduSalait && inputSalait) cloneEduSalait.textContent = inputSalait.value;
      if (cloneEduHighschool && inputHighschool) cloneEduHighschool.textContent = inputHighschool.value;

      // Append to body
      document.body.appendChild(mainClone);
      clonesToCleanup.push(mainClone);
    });

    // Close modal
    printModal.classList.remove("active");

    // Define cleanup function
    const restoreAndCleanup = function() {
      mainEl.classList.remove("print-hidden-temp");
      clonesToCleanup.forEach(clone => {
        if (clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      window.removeEventListener('afterprint', restoreAndCleanup);
    };

    window.addEventListener('afterprint', restoreAndCleanup);

    setTimeout(function() {
      window.print();
      setTimeout(restoreAndCleanup, 1000);
    }, 150);
  });
}
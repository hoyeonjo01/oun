const gallery = document.querySelector(".product-gallery");

const productImages = gallery.dataset.images.split(",");

let currentImageIndex = 0;

const productPhoto = document.getElementById("productPhoto");
const prevButton = document.querySelector(".gallery-prev");
const nextButton = document.querySelector(".gallery-next");

function showImage(index) {
  productPhoto.src = productImages[index];
}

prevButton.addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex - 1 + productImages.length) % productImages.length;

  showImage(currentImageIndex);
});

nextButton.addEventListener("click", () => {
  currentImageIndex =
    (currentImageIndex + 1) % productImages.length;

  showImage(currentImageIndex);
});

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

productPhoto.addEventListener("click", () => {
  modalImage.src = productImages[currentImageIndex];
  imageModal.classList.add("active");
});

const modalPrev = document.querySelector(".modal-prev");
const modalNext = document.querySelector(".modal-next");

modalPrev.addEventListener("click", (e) => {
  e.stopPropagation();

  currentImageIndex =
    (currentImageIndex - 1 + productImages.length) % productImages.length;

  showImage(currentImageIndex);
  modalImage.src = productImages[currentImageIndex];
});

modalNext.addEventListener("click", (e) => {
  e.stopPropagation();

  currentImageIndex =
    (currentImageIndex + 1) % productImages.length;

  showImage(currentImageIndex);
  modalImage.src = productImages[currentImageIndex];
});

imageModal.addEventListener("click", () => {
  imageModal.classList.remove("active");
});
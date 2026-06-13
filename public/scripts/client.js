// 1. variables
const imageInputSelector = document.getElementById("upload-picture")
const imagePreview = document.getElementById("display-image")

// 2.logic
if (imageInputSelector) {
  // Wacht tot input veranderd
  imageInputSelector.addEventListener('change', handleImageUpload)
}

// 3. function declarations
function handleImageUpload(event) {

  // Stap 1: Zoek data van geselecteerde foto
  const imageData = event.target.files[0];

  // Stap 2: Maak een nieuwe Filereader aan
  const imageReader = new FileReader();

  // Stap 3: Maak foto van opgehaalde fotodata
  imageReader.readAsDataURL(imageData);

  // Stap 4: Trigger geselecteerde foto om te laten zien
  imageReader.addEventListener("load", previewImage)

  // Stap 5: Laat geselecteerde foto zien
  function previewImage(event) {
    // Stap 5: Laat geselecteerde foto zien
    imagePreview.src = imageReader.result
    imagePreview.style.opacity = 1
  }
}

// 1. variables
const quickScanForm = document.querySelector(".quick-scan form")
const quickScanFormButton = document.querySelector(".quick-scan-submit-button")

// 2.logic
if (quickScanForm) {
  // 3. function declarations
  quickScanForm.addEventListener("submit", async function (event) {
    event.preventDefault()
    quickScanFormButton.classList.add("loading-quick-scan")
    quickScanFormButton.textContent = "laden"

    setTimeout(function () {
      quickScanForm.submit()
    }, 2500)
  })
}
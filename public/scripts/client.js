// 1. variables
// Zoeken elementen op in de DOM
const imageInputSelector = document.getElementById("upload-picture")
const imagePreview = document.getElementById("display-image")

// 2.logic
// Als er een element is met 'imageInputSelector'
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
// Zoeken elementen op in de DOM
const quickScanForm = document.querySelector(".quick-scan form")
const quickScanFormButton = document.querySelector(".quick-scan-submit-button")

if (quickScanForm) {
  quickScanForm.addEventListener("submit", async function (event) {
    event.preventDefault()

    quickScanFormButton.classList.add("loading-quick-scan")
    quickScanFormButton.textContent = "laden"

    setTimeout(function () {
      quickScanFormButton.classList.remove("loading-quick-scan")
      quickScanFormButton.textContent = "Toegevoegd! ✔"
    }, 2500)

    setTimeout(function() {
      quickScanForm.submit()
    }, 3500)

  })
}
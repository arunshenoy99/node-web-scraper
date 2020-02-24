const $urlForm = document.querySelector('#url')
const $urlFormInput = $urlForm.querySelector('input')
const $resultPara = document.querySelector('#result')

$urlForm.addEventListener('submit', (e) => {
    e.preventDefault()
    $resultPara.textContent = ''
    $resultPara.removeAttribute('color')
    const url = $urlFormInput.value
    if (url.trim() === '') {
        $resultPara.style.color = 'red'
        $resultPara.textContent = 'Please provide a valid URL'
        return
    }
    fetch('http://localhost:3000?url=' + url)
    .then((response) => {
        $resultPara.style.color = 'green'
        $resultPara.textContent = 'Success'
    }).catch((error) => {
        $resultPara.style.color = 'red'
        $resultPara.textContent = error
    })
})
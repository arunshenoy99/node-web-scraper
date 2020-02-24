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
    fetch('http://localhost:3000/check?url=' + url.trim())
    .then((response) => {
        response.text()
        .then((status) => {
            if (status == 'Valid') {
                $resultPara.style.color = 'green'
                $resultPara.textContent = 'Download will begin shortly'
                window.location.href = 'http://localhost:3000/scrape?url=' + url
            } else {
                $resultPara.style.color = 'red'
                $resultPara.textContent = 'Please provide a valid URL'
            }
        })
    }).catch((error) => {
        $resultPara.style.color = 'red'
        $resultPara.textContent = error
    })
})
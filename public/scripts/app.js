/**
 * Show error message
 */
function showMessage (msg) {
  let resultHTML = `<p class="ErrorMsg">${msg}</p>`
  $('.Result').html(resultHTML)
  $('.Result').hide().fadeIn('slow')
}

/**
 * Show the generated short url
 */
function showShortenUrl (shortUrl) {
  let resultHTML = '<a class="result" href="' + shortUrl + '">' + shortUrl + '</a>'
  $('.Result').html(resultHTML)
  $('.Result').hide().fadeIn('slow')
}

/**
 * Clear the user input after submission
 */
function clearInput () {
  $('.FormInput-input').val('')
}

/**
 * AJAX request
 */
function shortenUrlRequest () {
  let userUrlInput = $.trim($('.FormInput-input').val())

  if (userUrlInput.length === 0) {
    showMessage('The input URL is not valid')
    clearInput()
    return
  }

  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {
      url: userUrlInput
    },
    success: (data) => {
      showShortenUrl(data.shortUrl)
      clearInput()
    },
    error: (data) => {
      showMessage(data.responseText)
      clearInput()
    }
  })
}

// Add event listeners
$('.FormInput-button').on('click', shortenUrlRequest)
$('.FormInput-input').bind('keypress', (e) => {
  if (e.keyCode === 13) {
    shortenUrlRequest()
  }
})

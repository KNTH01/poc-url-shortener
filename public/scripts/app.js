/**
 * Show error message
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
function showMessage (msg) {
  let resultHTML = `<p class="ErrorMsg">${msg}</p>`
  $('.Result').html(resultHTML)
  $('.Result').hide().fadeIn('slow')
}

/**
 * Show the generated short url
 * @param  {[type]} shortUrl [description]
 * @return {[type]}          [description]
 */
function showShortenUrl (shortUrl) {
  let resultHTML = '<a class="result" href="' + shortUrl + '">' + shortUrl + '</a>'
  $('.Result').html(resultHTML)
  $('.Result').hide().fadeIn('slow')
}

/**
 * Clear the user input after submission
 * @return {[type]} [description]
 */
function clearInput () {
  $('.FormInput-input').val('')
}

/**
 * AJAX request
 * @return {[type]} [description]
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

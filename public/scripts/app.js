// add an event listener to the shorten button for when the user clicks it
$('.FormInput-button').on('click', () => {
  console.log('Shorten !')
    // AJAX call to /api/shorten with the URL that the user entered in the input box
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {
      url: $('.FormInput-input').val()
    },
    success: (data) => {
      // display the shortened URL to the user that is returned by the server
      let resultHTML = '<a class="result" href="' + data.shortUrl + '">' + data.shortUrl + '</a>'
      $('.Result').html(resultHTML)
      $('.Result').hide().fadeIn('slow')
    },
    error: (data) => {
      let resultHTML = `<p class="ErrorMsg">${data.responseText}</p>`
      console.log(data)
      $('.Result').html(resultHTML)
      $('.Result').hide().fadeIn('slow')
    }
  })
})

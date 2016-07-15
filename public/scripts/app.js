// add an event listener to the shorten button for when the user clicks it
$('#shorten-cta').on('click', () => {
  console.log('Shorten !')
    // AJAX call to /api/shorten with the URL that the user entered in the input box
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {
      url: $('#url-field').val()
    },
    success: (data) => {
      // display the shortened URL to the user that is returned by the server
      let resultHTML = '<a class="result" href="' + data.shortUrl + '">' + data.shortUrl + '</a>'
      $('#link').html(resultHTML)
      $('#link').hide().fadeIn('slow')
    },
    error: (data) => {
      let resultHTML = `<p>${data.responseText}</p>`
      console.log(data)
      $('#link').html(resultHTML)
      $('#link').hide().fadeIn('slow')
    }
  })
})

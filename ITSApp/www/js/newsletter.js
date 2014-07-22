$(function () {
    $('#submitNewsletterEmail').on('click', submitEmail);
})

function submitEmail() {
    var email = $('#newsletterInputEmail').val();

    $.ajax({
        type: "POST",
        url: "some.php",
        data: { email: email }
    })
    .done(function (msg) {
      alert("Data Saved: " + msg);
    })
    .fail(function (msg) {
        alert("Can't save data: " + msg);
    });
}

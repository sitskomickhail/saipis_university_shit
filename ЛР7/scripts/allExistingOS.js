$(document).ready(() => {
    $.ajax({
        url: "allExistingOS.html"
    }).done(function (data) {
        console.log(data);
    });
});

$(document).ajaxStart(function () {
    $(".operationsListArea").append('<img src="../resources/images/android.png">');
});

$(document).ajaxSend(function () {
    $(".operationsListArea").append('<img src="../resources/images/bada.png">');
});

$(document).ajaxStop(function () {
    $(".operationsListArea").append('<img src="../resources/images/apple.png">');
});

$(document).ajaxComplete(function () {
    $(".operationsListArea").append('<img src="../resources/images/symbian.png">');
});
$(document).ready(function () {
    let loadedDevices = 0;

    $("#loadAdditionalInfo").click(function () {
        $.getJSON("../resources/BadaOS.json").done(function (badaData) {
            console.log(badaData);

            $("#osName").text(`System: ${badaData.title}`);
            $("#osVersion").text(`Version: ${badaData.version}`);

            if (badaData.gadgets.length > loadedDevices) {

                const gadget = badaData.gadgets[loadedDevices];
                if (loadedDevices > 0) {
                    $(`<li>${gadget.phone} - ${gadget.macAddress}</li>`).insertAfter($('#osDevices li:last'));
                } else {
                    $("#osDevices").append(`<li>${gadget.phone} - ${gadget.macAddress}</li>`);
                }
                loadedDevices++;
            }
        });
    });
});

$(document).ajaxSuccess(function( event, xhr, options){
    $("#requestResult").text(`${xhr.status} ${xhr.statusText} : requested to ${options.url}`);
})

$(document).ajaxError(function( event, xhr, options){
    $(".requestResult").css("border-color", "red")
    $("#requestResult").text(`${xhr.status} ${xhr.statusText} : requested to ${options.url}`);

    let reload = confirm("Exception while loading page. Try again?");

    if (reload) {
        location.reload();
    } else {
        document.location = "errorPage.html";
    }
})
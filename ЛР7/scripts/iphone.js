$(document).ready(function () {
    let loadedDevices = 0;

    $("#loadAdditionalInfo").click(function () {
        $.getJSON("../resources/IPhoneOS.json").done(function (iphoneData) {
            console.log(iphoneData);

            $("#osName").text(`System: ${iphoneData.title}`);
            $("#osVersion").text(`Version: ${iphoneData.version}`);

            if (iphoneData.gadgets.length > loadedDevices) {

                const gadget = iphoneData.gadgets[loadedDevices];
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

$(document).ajaxSuccess(function (event, xhr, options) {
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
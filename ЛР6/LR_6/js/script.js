$("#firstBtn").click(() => {
    [$(".paragraph2"), $(".paragraph4"), $(".paragraph6")].map(par => par.fadeOut("slow"))
    $('[id="building_img1"]').toggleClass("buildingBorder");
});

$("#secondBtn").click(() => {
    $("p:contains('LONDON')").each(function () {
        $(this).text($(this).text().replaceAll("LONDON", "PARIS"));
    });
    [$(".paragraph1"), $(".paragraph3"), $(".paragraph5")].map(par => par.append('<input type="text" id="appendedInput"/>'))
    $("#firstBtn").hide();
});
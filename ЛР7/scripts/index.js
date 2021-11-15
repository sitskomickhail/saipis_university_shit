$(document).ready(() => {
    $("#iphoneLoad").click(() => {
        $.ajax({
            url: "iphone.html",
        }).done(function (data) {
            $("#mainContentArea").html(data);
            $(".controlsArea").css("border-color", "gray")
            $(".blockArea").css("border-color", "gray")
            $(".requestResult").css("border-color", "gray")
            $("body").css("background-color", "#cccccc")
        });
    });

    $("#androidLoad").click(() => {
        $.ajax({
            url: "android.html",
        }).done(function (data) {
            $("#mainContentArea").html(data);
            $(".controlsArea").css("border-color", "#85c808")
            $(".blockArea").css("border-color", "#85c808")
            $(".requestResult").css("border-color", "#85c808")
            $("body").css("background-color", "#dcecbd")
        });
    });

    $("#symbianLoad").click(() => {
        $.ajax({
            url: "symbian.html",
        }).done(function (data) {
            $("#mainContentArea").html(data);
            $(".controlsArea").css("border-color", "#0081c2")
            $(".blockArea").css("border-color", "#0081c2")
            $(".requestResult").css("border-color", "#0081c2")
            $("body").css("background-color", "#a3c9dc")
        })
    });

    $("#badaLoad").click(() => {
        $.ajax({
            url: "bada.html",
        }).done(function (data) {
            $("#mainContentArea").html(data);
            $(".controlsArea").css("border-color", "black")
            $(".blockArea").css("border-color", "black")
            $(".requestResult").css("border-color", "black")
            $("body").css("background-color", "#585858")
        });
    });

    $("#showAllExistingOS").click(() => {
        $.ajax({
            url: "allExistingOS.html"
        }).done(function (data) {
            $("#mainContentArea").html(data);
            $(".controlsArea").css("border-color", "#9371ec");
            $(".blockArea").css("border-color", "#9371ec");
            $(".requestResult").css("border-color", "#9371ec");
            $("body").css("background-color", "#ffffff");
        });
    });
});
$(document).ready(function () {
    var globalData = []
    
    function renderGameRecapButtons(dataArray) {
        let buttons = $("<button>");
        buttons.attr("type", "button");
        buttons.addClass("btn btn-primary");
        buttons.attr("data-toggle", "modal");
        buttons.attr("data-target", "#exampleModalCenter");
        buttons.attr("id", `recap-button`)
        buttons.attr("data-stats", "dates")
        buttons.text("League Stats");
        $("#buttons-div").append(buttons);
        buttons.append("<br>")

        }
    renderGameRecapButtons()

})

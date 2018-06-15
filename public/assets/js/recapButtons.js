$(document).ready(function () {
    // var globalData = []
    
    $.ajax({ url: currentURL + "/api/games/past", method: "GET" }).then(function(dataFromAPI) {
        renderGameRecapButtons(dataFromAPI)
        })
        




    function renderGameRecapButtons(dataArray) {
        dataArray.forEach((e) => {
            console.log("What data are we talking about: ", e)
            let buttons = $("<button>");
            buttons.attr("type", "button");
            buttons.addClass("btn btn-primary");
            buttons.attr("data-toggle", "modal");
            buttons.attr("data-target", "#exampleModalCenter");
            buttons.attr("class", "btn btn-info navbar-btn regular-grey game_button")
            buttons.attr("game_id",e.id)
            buttons.attr("data-stats", "dates")
            buttons.text(`${e.game_date}`);
            $("#buttons-div").append(buttons);
            buttons.append("<br>")
            })

        }
    // renderGameRecapButtons()

})

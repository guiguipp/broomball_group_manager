
$(document).ready(function() {
    const currentURL = window.location.origin;

    // Hide the players until necessary
    $("#table_striped").hide()
    $("#edit_player").click(function(){
        $("#table_striped").show()
        })
    $("#input_form").hide()
    $("#add_player").click(function(){
        $("#input_form").show()
        })
    $("#add_player").click(function (){
        $("#submit_button").attr("mode","add")
    })
    $("#edit_player").click(function (){
        $("#submit_button").attr("mode","edit")
    })

    var playerList = $("tbody");
    var playerContainer = $(".player-container");
    var shortNameInput = $("#short_name");
    var fullNameInput = $("#full_name");
    var emailInput = $("#email_address");

    // Adding event listeners to the form to create a new object, and the button to delete a Player
    $(document).on("submit", "#player-form", handlePlayerFormSubmit);
    $(document).on("click", ".delete-player", handleDeleteButtonPress);
    $("#cancel_form").click(function(){
        removeInfo()
        $("#input_form").hide()
        });

    // Getting the initial list of Players
    showPlayerList();

    // A function to handle what happens when the form is submitted to create a new Player
    function handlePlayerFormSubmit(event) {
        event.preventDefault();
        // Getting references to the name input and player container, as well as the table body
        var playerLevelInput = $("#level_select");
        var preferredPositionInput = $("#position_select");
        var playerStatusInput = $("#player_status").val().trim().toLowerCase();
            console.log(playerStatusInput)
            if (playerStatusInput === "ten bucker") {playerStatusInput = "ten_bucker"}

        // Don't do anything if the name fields hasn't been filled out
        if (
            !shortNameInput.val().trim().trim(),
            !fullNameInput.val().trim().trim(),
            !emailInput.val().trim().trim()
        ) {
        return;
        }
        if ($("#submit_button").attr("mode") === "add") {
        // Calling the upsertPlayer function and passing in the value of the name input
        upsertPlayer({
            shortname: shortNameInput.val().trim(),
            full_name: fullNameInput.val().trim(),
            player_level: playerLevelInput.val().trim().toUpperCase(),
            preferred_position: preferredPositionInput.val().trim().toLowerCase(),
            player_status: playerStatusInput,
            email: emailInput.val().trim().toLowerCase()
            });
            $("#input_form").hide(),
            removeInfo()
        }
        if ($("#submit_button").attr("mode") === "edit") {
            console.log("Edit Function")
            let player = {
                id: $("#submit_button").attr("id_of_player"),
                shortname: shortNameInput.val().trim(),
                full_name: fullNameInput.val().trim(),
                player_level: playerLevelInput.val().trim().toUpperCase(),
                preferred_position: preferredPositionInput.val().trim().toLowerCase(),
                player_status: playerStatusInput,
                email: emailInput.val().trim().toLowerCase()
                }
            updatePlayer(player)
            } 
        }

    function removeInfo() {
        event.preventDefault();
        console.log("Overwrite. Please wait...");
        // Overwrite all input
        $("#short_name").val("")
        $("#full_name").val("")
        $("#level_select").val("")
        $("#position_select").val("")
        $("#player_status").val("")
        $("#email_address").val("")
    }

    // A function for creating a player. Calls getPlayers upon completion
    function upsertPlayer(playerData) {
        $.post("/api/players", playerData)
        .then(showPlayerList);
    }
    
    // Function for creating a new list row for players
    function createPlayerRow(playerData) {
        var newTr = $(`<tr>`);
        // console.log(playerData)
        newTr.data("player", playerData);
        newTr.append(`<td class="player_table"> ${playerData.shortname} </td>`);
        // newTr.append("<td>" + playerData.full_name + "</td>");
        // newTr.append("<td>" + playerData.player_level + "</td>");
        // newTr.append("<td>" + playerData.preferred_position + "</td>");
        // newTr.append("<td>" + playerData.player_status + "</td>");
        // newTr.append("<td>" + playerData.email + "</td>");        
        newTr.append(`<td class="player_table"> <a style='cursor:pointer;color:green' class="edit_player" player_id="${playerData.id}" short_name="${playerData.shortname}" full_name="${playerData.full_name}" level="${playerData.player_level}" position="${playerData.preferred_position}" status="${playerData.player_status}" email="${playerData.email}"> Edit </a> / <a style='cursor:pointer;color:red' class='delete-player' id_to_delete='${playerData.id}'>Delete</a> </td>>`);
        return newTr;
    }

        // Function for retrieving players and getting them ready to be rendered to the page
    function showPlayerList() {
        $.get("/api/players", function(dataFromAPI) {
            $("thead").empty()
            dataFromAPI.forEach((e) => {
                console.log(e)
                let newTr = `<tr>`
                let playerName = `<td class="player_table"> ${e.shortname} </td>`
                let manageButtons = `<td class="player_table"> <a style='cursor:pointer;color:green' class="edit_player" player_id="${e.id}" short_name="${e.shortname}" full_name="${e.full_name}" level="${e.player_level}" position="${e.preferred_position}" status="${e.player_status}" email="${e.email}"> Edit </a> / <a style='cursor:pointer;color:red' class='delete-player' id_to_delete='${e.id}'>Delete</a> </td>`
                let fullRow = `${newTr}${playerName}${manageButtons}`
                $("thead").append(fullRow)
            })
            // renderPlayerList(rowsToAdd);
            // shortNameInput.val("");
            });
    }
    /*
    // A function for rendering the list of players to the page
    function renderPlayerList(rows) {
        playerList.children().not(":last").remove();
        playerContainer.children(".alert").remove();
        if (rows.length) {
            // console.log(rows);
            playerList.prepend(rows);
            }
        else {
            renderEmpty();
            }
        }
    */

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        // var listItemData = $(this).parent("td").parent("tr").data("player");
        var id = $(this).attr("id_to_delete");
        $.ajax({
        method: "DELETE",
        url: "/api/players/" + id
        }).then(showPlayerList);
    }

    $(document).on("click", ".edit_player", function(){
        console.log("Click recorded")
        let playerId = $(this).attr("player_id");
        let playerShortname = $(this).attr("short_name");
        let playerFullName = $(this).attr("full_name");
        let playerLevel = $(this).attr("level");
        let playerPosition = $(this).attr("position");
        let playerStatus = $(this).attr("status");
        let playerEmail = $(this).attr("email");
        // console.log(`playerId: ${playerId}, playerShortname: ${playerShortname}, playerFullName: ${playerFullName}, playerLevel: ${playerLevel}, playerPosition: ${playerPosition}, playerStatus: ${playerStatus}, playerEmail: ${playerEmail}`)
        if (playerPosition === "forward") {playerPosition = "Forward"}
        else if (playerPosition === "defense") {playerPosition = "Defense"}
        else if (playerPosition === "goalie") {playerPosition = "Goalie"}
        if (playerStatus === "ten_bucker") {playerStatus = "Ten Bucker"}
        else if (playerStatus === "member") {playerStatus = "Member"}
        
        $("#input_form").show()
        $("#submit_button").attr("id_of_player",playerId)
        $("#short_name").val(playerShortname)
        $("#full_name").val(playerFullName)
        $("#level_select").val(playerLevel)
        $("#position_select").val(playerPosition)
        $("#player_status").val(playerStatus)
        $("#email_address").val(playerEmail)

        });

    const updatePlayer = (player) => {
        console.log("Data of the player we are passing to the API: ", player)
        $.ajax({ url: currentURL + "/api/players/player/" + player.id, method: "PUT",
            data: jQuery.param({
            shortname: player.shortname, 
            full_name: player.full_name,
            player_level: player.player_level,
            preferred_position: player.preferred_position,
            player_status: player.player_status,
            email: player.email})
            }).then(function(){
                console.log("Player Edited")
                $("#short_name").val("")
                $("#full_name").val("")
                $("#level_select").val("")
                $("#position_select").val("")
                $("#player_status").val("")
                $("#email_address").val("")
                $("#input_form").hide()
                showPlayerList()
                })
            };
    }); 
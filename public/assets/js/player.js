$(document).ready(function() {
    const currentURL = window.location.origin;

    // Hide the players until necessary
    $("#table_striped").hide();
    $("#input_form").hide();
    // toggle between modes
    $("#edit_player").click(function(){
        $("#table_striped").show();
        $("#input_form").hide();
        showPlayerList();
    })
    $("#add_player").click(function(){
        $("#input_form").show();
        $("#table_striped").hide();
        // trigger the "add" mode for the submit button
        $("#submit_button").attr("mode","add");
        })

    let shortNameInput = $("#short_name");
    let fullNameInput = $("#full_name");
    let emailInput = $("#email_address");

    // Adding event listeners to the form to create a new object, and the button to delete a Player
    $(document).on("submit", "#player-form", handlePlayerFormSubmit);
    $(document).on("click", ".delete-player", handleDeleteButtonPress);
    $("#cancel_form").click(function(){
        console.log("Clicked on cancel");
        
        removeInfo();
        $("#input_form").hide();
        });

    // A function to handle what happens when the form is submitted to create a new Player
    function handlePlayerFormSubmit(event) {
        event.preventDefault();
        // Getting references to the name input and player container, as well as the table body
        let playerLevelInput = $("#level_select");
        let preferredPositionInput = $("#position_select");
        let playerStatusInput = $("#player_status").val().trim().toLowerCase();
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

        // Removes all input from form
    function removeInfo() {
        if (event) {event.preventDefault()}
        $("#short_name").val("")
        $("#full_name").val("")
        $("#level_select").val("")
        $("#position_select").val("")
        $("#player_status").val("")
        $("#email_address").val("")
        }

    // A function for creating a player. Calls getPlayers upon completion
    const upsertPlayer = (playerData) => {
        $.post("/api/players", playerData)
        .then(showPlayerList);
        }
    
    // Function for retrieving players and getting them ready to be rendered to the page
    const showPlayerList = () => {
        $.get("/api/players", function(dataFromAPI) {
            $("thead").empty()
            let tHeader = `<tr id="t_header"> <th>Players</th> <th>Manage</th></tr>`
            $("#player_table").append(tHeader)
            dataFromAPI.forEach((e) => {
                let newTr = `<tr>`
                let playerName = `<td class="player_table"> ${e.shortname} </td>`
                let manageButtons = `<td class="player_table"> <a style='cursor:pointer;color:green' class="edit_player" player_id="${e.id}" short_name="${e.shortname}" full_name="${e.full_name}" level="${e.player_level}" position="${e.preferred_position}" status="${e.player_status}" email="${e.email}"> Edit </a> / <a style='cursor:pointer;color:red' class='delete-player' id_to_delete='${e.id}'>Delete</a> </td>`
                let fullRow = `${newTr}${playerName}${manageButtons}`
                $("#player_table").append(fullRow)
                })
            });
        }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress(){
        var id = $(this).attr("id_to_delete");
        $.ajax({
        method: "DELETE",
        url: "/api/players/" + id
        }).then(showPlayerList);
        }

    $(document).on("click", ".edit_player", function(){
        console.log("Click on .edit_player")
        let playerId = $(this).attr("player_id");
        let playerShortname = $(this).attr("short_name");
        let playerFullName = $(this).attr("full_name");
        let playerLevel = $(this).attr("level");
        let playerPosition = $(this).attr("position");
        let playerStatus = $(this).attr("status");
        let playerEmail = $(this).attr("email");

        if (playerPosition === "forward") {playerPosition = "Forward"}
        else if (playerPosition === "defense") {playerPosition = "Defense"}
        else if (playerPosition === "goalie") {playerPosition = "Goalie"}
        if (playerStatus === "ten_bucker") {playerStatus = "Ten Bucker"}
        else if (playerStatus === "member") {playerStatus = "Member"}
        
        $("#input_form").show()
        $("#submit_button").attr("id_of_player",playerId)
        $("#submit_button").attr("mode","edit")
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
                removeInfo()
                showPlayerList()
                $("#input_form").hide();
                })
            };
    }); 
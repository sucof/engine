
function getServerAddress(argument) {
    if(serverList==null && serverList.length == 0){
        //try to get server list from repo
        $.ajax({
            url: 'https://github.com/zerjioang/apkr/raw/master/server.json',
            success: function (result) {
                if (result){
                    serverList = result.datacenters;
                    console.log("Datacencers detecteds: "+serverList.length);
                }
            },
            error: function (result) {
                if (result){
                    console.log("Error: "+result);
                }
            },
            async: false
        });
    }
    return "http://" + serverList[0] + "/api/v1/" + argument;
}

function checkRequirements() {
    if (window.localStorage) {
        //local storage exists
    } else {
        //local storage not available
        var callback = function() {
            localStorage.clear();
            quitApp(true);
        }

        showErrorPopUp(
            'ERROR',
            'dialog-vertical-center',
            'apkr can not work on this computer because it does not fullfil minimum requirements. </br> Please, check more information at <a href="https:www.google.com" target="_blank">minimum requirements</a>',
            'I understand',
            callback
        );
    }
}

function requestPermissions() {
    // request permission on page load
    document.addEventListener('DOMContentLoaded', function() {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
    });
}

//execute on each page load
// A $( document ).ready() block.
$(document).ready(function() {
    console.log("starting apkr");
    //getServerAddress();
    console.log("requesting permission for notifications...");
    requestPermissions();
    console.log("injecting template...");
    inject();
    loadNav();
    //hide latest upload table. by default
    $('#latest-uploads-row').hide();
    console.log("checking requirements");
    checkRequirements();
    console.log("checking server");

    var tableCallback = function(data) {
        $('#latest-uploads-row').hide();
        if (data != null) {
            var max = data['max'];
            console.log(max);
            var added = data['added'];
            if (added > 0) {
                //add data to rows
                var tableRef = document.getElementById('latest-uploads-table').getElementsByTagName('tbody')[0];
                for (var i = 0; i < added; i++) {
                    // Insert a row in the table at the last row
                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    // Insert a cell in the row at index 0
                    var newCell = newRow.insertCell(0);
                    var newText = document.createTextNode(data['names'][i])
                    newCell.appendChild(newText);

                    newCell = newRow.insertCell(1);
                    newText = document.createTextNode(data['hash'][i])
                    newCell.appendChild(newText);

                    newCell = newRow.insertCell(2);
                    newText = document.createTextNode(data['lastMod'][i])
                    newCell.appendChild(newText);
                };
                $('#latest-uploads-row').show();
            }
        }
    }
    var pingCallback = function() {
        //notification example
        showGoodNotification('Status', 'Connected to server');
        console.log("profiling new user...");
        createProfile();
        console.log("Reading latest uploads...")
        //hide table
        $('#latest-uploads-row').hide();
        ajax_getLatestUploads(tableCallback);
        console.log("ready!");
        userConnected = true;
    }
    ajax_pingServer(pingCallback);
});
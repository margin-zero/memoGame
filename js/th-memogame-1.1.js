$(document).ready(function() {
    thMemoGameRun();
});


// functions 

function thMemoGameRun() {

    var i;
    var memoTiles = 16; // default number of tiles

    $("#memoGameTilesNumber").text(memoTiles); // display default (initial) numer of tiles

    // add "plus" & "minus" button functionality
    $(".memoGamePlusMinus").click(function() {
        var memoTiles = parseInt($("#memoGameTilesNumber").text(), 10);
        if ($(this).is(".plus")) { memoTiles = memoTiles + 2; };
        if ($(this).is(".minus")) { memoTiles = memoTiles - 2; };
        if (memoTiles < 4) { memoTiles = 4; };
        if (memoTiles > 52) { memoTiles = 52; };
        $("#memoGameTilesNumber").text(memoTiles);
    });

    $("#memoGameStartButton").click(function() {

        $("#memoGameCurrentScore").text(0); // reset current game score
        $("#memoGameContainer").fadeOut(500); // hide game container

        setTimeout(thMemoGameInitTiles, 500); // create new tiles for game - first wait for fade out

        setTimeout(function() { // add click functionality to tiles - first wait for InitTiles
            $(".memoGameTile").click(function() {
                thMemoGameTileClick($(this));
            })
        }, 501);

        $("#memoGameContainer").fadeIn(500); // show game container
    });
};


function thMemoGameInitTiles() {

    var i, x, y, oldValue;
    var memoTiles = parseInt($("#memoGameTilesNumber").text(), 10);
    var memoTilesValues = [];

    $("#memoGameContainer").empty(); // remove all children of game container (all tiles)

    // prepare table of values
    for (i = 0; i < (parseInt((memoTiles / 2), 10)); i++) {
        memoTilesValues.push(String.fromCharCode(i + 65));
        memoTilesValues.push(String.fromCharCode(i + 65));
    };

    // scramble table of values
    for (i = 0; i < 100; i++) {
        x = randomNumber(0, memoTilesValues.length - 1);
        y = randomNumber(0, memoTilesValues.length - 1);
        oldValue = memoTilesValues[x];
        memoTilesValues[x] = memoTilesValues[y];
        memoTilesValues[y] = oldValue;
    };

    // create tiles in container and give them corresponding value from table of values
    for (i = 0; i < memoTiles; i++) {
        $("#memoGameContainer").append("<div class='memoGameTile invisible'><div class='cardBack'></div><div class='cardFront'><p></p></div></div>");
        $(".memoGameTile>.cardFront>p").eq(i).append(memoTilesValues[i]);
    };
};


function thMemoGameTileClick(clickedTile) {

    var $this = clickedTile;
    var visibleTilesCount;

    console.log(clickedTile);
    console.log('visible=' + $this.is(".visible"));

    if ($this.is(":not(.visible)") || ($this.is(".visible") && ($(".memoGameTile.visible:not(.ready)").length == 2))) {
        $("#memoGameCurrentScore").text(parseInt($("#memoGameCurrentScore").text(), 10) + 1);
    }

    if ($(".memoGameTile.visible:not(.ready)").length == 2) {
        $(".memoGameTile.visible:not(.ready)").removeClass("visible").addClass("invisible");
    }

    if ($this.is(":not(.ready).invisible")) {
        $this.removeClass("invisible").addClass("visible");
    };

    visibleTilesCount = $(".memoGameTile.visible:not(.ready)").length;

    if (visibleTilesCount == 2) {
        if ($(".memoGameTile.visible:not(.ready)>.cardFront>p").eq(0).text() ==
            $(".memoGameTile.visible:not(.ready)>.cardFront>p").eq(1).text()) {
            $(".memoGameTile.visible:not(.ready)").addClass("ready");
        }
    };
};


function randomNumber(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}
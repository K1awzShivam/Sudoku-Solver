const easy = [
    ["6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
    ],

    [
     "------2---8---7-9-6-2---5---7--6-------9-1-------2--4---5---6-3-9-4---7---6------",
     "957613284483257196612849537178364952524971368369528741845792613291436875736185429"
    ],

    [
     "2-5--9--4------3-77--856-1-45-7-------9---1-------2-85-2-418--66-8------1--2--7-8",
     "215379864986124357734856219452781693869543172371692485527418936648937521193265748"
    ],

    [
     "-7--2--46-6----89-2--8--715-84-97---71-----59---13-48-697--2--8-58----6-43--8--7-",
     "875921346361754892249863715584697123713248659926135487697412538158379264432586971"
    ]
];

const medium = 
[
    ["--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
    ],

    [
    "5-72---9---6-3-7-14------6-1--49---7---5-8---8---27--5-7------92-9-8-6---4---93-8",
    "517264893926835741483971562135496287792518436864327915378642159259183674641759328"
    ],

    [
    "--6-9-2-----7-2----9-5-8-7-9---3---675-----191---4---5-1-3-9-8----2-1-----9-8-1--",
    "876493251345712968291568473982135746754826319163947825417359682638271594529684137"
    ],

    [
     "-26-3---89--6--1------19-4---73-2-----4-7-8-----8-67---5-72------9--5--44---6-21-",
     "126437598943658127785219346867392451394571862512846739651724983239185674478963215"
    ]
];

const hard = [
    ["-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
    ],
    [
    "---8-----789-1---6-----61----7----5-5-87-93-4-4----2----32-----8---7-439-----1---",
    "165847923789312546432596178297463851518729364346158297973284615821675439654931782"
    ],
    [
     "--65----8-95----2-7--9--3------4-27----873----79-5------2--8--9-5----81-3----54--",
     "136524798895367124724981356589649271261873945479152683642718539957436812318295467"
    ],
    [
     "---8--9---9--7---4-84----6----41-2----3---5----1-69----2----74-9---2--3---7--6---",
     "612834957395672814784165362859413276463287591271569483126358749948721635537946128"
    ]
];

var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;
var rand;

window.onload=function() 
{
    //Run startgame function when button is clicked
    var temp=document.getElementById("start-btn");
    temp.addEventListener("click",startGame);

    // Add event listener to number container
    var n=document.getElementById("number-container").children;
    for(let i=0;i<n.length;i++)
    {
        n[i].addEventListener("click",function()
        {
            // if selection is not disabled
            if(!disableSelect)
            {
                // If number is already selected
                if(this.classList.contains("selected"))
                {
                    // Then remove selection
                    this.classList.remove("selected");

                    selectedNum=null;
                }
                else
                {
                    //Deselect all other numbers
                    for(let i=0;i<n.length;i++)
                    {
                        n[i].classList.remove("selected");
                    }

                    // Select it and update the selectedNum varaiable
                    this.classList.add("selected");
                    selectedNum=this;
                    updateMove();
                }
            }
        });
    }
}

function getRandom()
{
    const min=0;
    const max=easy.length-1;
    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    return a;
}

function startTimer()
{
    let time1=document.getElementById("time-1");
    let time2=document.getElementById("time-2");
    let time3=document.getElementById("time-3");

    if(time1.checked)
    {
        timeRemaining=180;
    }
    else if(time2.checked)
    {
        timeRemaining=300;
    }
    else if(time3.checked)
    {
        timeRemaining=600;
    }

    // Sets the timer for first second
    document.getElementById("timer").textContent=timeConversion(timeRemaining);

    // Sets the timer to update every second
    timer=setInterval(function(){
        timeRemaining--;

        // if no time remaining
        if(timeRemaining===0)
        {
            endGame();
        }

        document.getElementById("timer").textContent=timeConversion(timeRemaining);
    },1000);

}

// Converts seconds into MM:SS format
function timeConversion(time)
{
    let minutes= Math.floor(time/60);

    if(minutes<10)
    {
        minutes="0"+minutes;
    }

    let seconds=time%60;

    if(seconds<10)
    {
        seconds="0"+seconds;
    }

    return minutes+":"+seconds;
}

function generateBoard(board)
{
    //clear previous boards to avoid stacking up the boards

    clearPrevious();

    let idCount=0; // used to increment tile ids

    // Create 81 tiles

    for(let i=0;i<81;i++)
    {
        // Create a new paragraph element
        let tile=document.createElement("p");

        // If the tile is not blank
        if(board.charAt(i)!="-")
        {
            // Set tile text to correct number
            tile.textContent=board.charAt(i);
        }
        else
        {
            // Add click event listener to tile.
            tile.addEventListener("click",function(){
                //If selecting is not disabled

                if(!disableSelect)
                {
                    // If the tile is already selected
                    if(tile.classList.contains("selected"))
                    {
                        // Then remove the selection
                        tile.classList.remove("selected");
                        selectedTile=null;
                    }
                    else
                    {
                        // Deselect all other tiles
                        for(let i=0;i<81;i++)
                        {
                            document.querySelectorAll(".tile")[i].classList.remove("selected");
                        }

                        // Add selection and update varaible
                        tile.classList.add("selected");
                        selectedTile=tile;
                        updateMove();
                    }
                }
            })
        }

        tile.id = idCount;

        // Increment idCount for next tile
        idCount++;

        // Add tile class to all tiles
        tile.classList.add("tile");

        // Adding thick borders
        if((tile.id > 17 && tile.id < 27 ) || (tile.id>44 && tile.id<54))
        {
            tile.classList.add("bottomBorder");
        }

        if((tile.id+1)%9==3 || (tile.id+1)%9==6)
        {
            tile.classList.add("rightBorder");
        }

        // Add tiles to board
        let temp_board=document.getElementById("board");
        temp_board.appendChild(tile);

    }
    
}

function updateMove()
{
    // if a tile and a number is selected

    if(selectedTile && selectedNum) //if both exist
    {
        //Set the tile to correct number
        selectedTile.textContent=selectedNum.textContent;

        // If the number matches the corresponding number in the solution key
        if(checkCorrect(selectedTile))
        {
            // Deselect the tiles
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");

            // Clear the selected variables
            selectedNum=null;
            selectedTile=null;

            //Check if board is completed 
            if(checkDone())
            {
                endGame();
            }
            
        }
        else // If the number is not matched the solution key
        {
            // Disable selecting new numbers for one second
            disableSelect=true;

            //Make the tile turn red
            selectedTile.classList.add("incorrect");

            //Run in 1 second
            setTimeout(function()
            {
                // Subtract lives by one
                lives--;

                //If no lives left in the game
                if(lives===0)
                {
                    endGame();
                }
                else
                {
                    // Update the lives text
                    var temp4=document.getElementById("lives");
                    temp4.textContent="Lives Remaining : "+lives;

                    // Renable selecting numbers and tiles
                    disableSelect=false;
                }

                // Restore tile colour and remove selected from both
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");

                //Clears the tile text and clear selected variables

                selectedTile.textContent= "";
                selectedTile=null;
                selectedNum=null;

            },1000);
        }
    }
}

function checkDone()
{
    let tiles=document.querySelectorAll(".tile");
    for(let i=0;i<tiles.length;i++)
    {
        if(tiles[i].textContent === "")
        {
            return false;
        }
    }

    return true;
}

function endGame()
{
    //Disable moves and stop timer
    disableSelect=true;
    clearTimeout(timer);

    //Dispaly win or loss message
    {
        if(lives===0 || timeRemaining===0)
        {
            document.getElementById("lives").textContent="You Lose!!";
        }
        else
        {
            document.getElementById("lives").textContent="Hurrayy!! You won!!";
        }
    }

}

function checkCorrect(tile)
{
    // Set solution based on difficulty selection
    let solution;

    var temp1=document.getElementById("diff-1");
    var temp2=document.getElementById("diff-2");
    var temp3=document.getElementById("diff-3");

    if(temp1.checked)
    {
        solution=easy[rand][1];
    }
    else if(temp2.checked)
    {
        solution=medium[rand][1];
    }
    else
    {
        solution=hard[rand][1];
    }

    //If tiles number is equal to solution's number

    if(solution.charAt(tile.id)=== tile.textContent)
    {
        return true;
    }
    else
    {
        return false;
    }

}

function clearPrevious()
{
    // Access all the tiles
    let tiles=document.querySelectorAll(".tile");

    // Remove each tile of the board
    for(let i=0;i<tiles.length;i++)
    {
        tiles[i].remove();
    }

    // If there is a timer clear it
    if(timer)
    {
        clearTimeout(timer);
    }

    // Deselect any of the numbers

    let nums=document.getElementById("number-container");
    for(let i=0; i < nums.children.length;i++)
    {
        nums.children[i].classList.remove("selected");
    }

    selectedTile=null;
    selectedNum=null;
}

function startGame()
{
    let board;

    var temp1=document.getElementById("diff-1");
    var temp2=document.getElementById("diff-2");
    var temp3=document.getElementById("diff-3");

    rand=getRandom();

    if(temp1.checked)
    {
        board=easy[rand][0];
    }
    else if(temp2.checked)
    {
        board=medium[rand][0];
    }
    else
    {
        board=hard[rand][0];
    }

    // set lives to 3 and enable selecting numbers and tiles

    // console.log(board);

    lives=3;
    disableSelect=false;

    var temp4=document.getElementById("lives");
    temp4.textContent="Lives Remaining : "+lives;

    //create boards based on difficulty

    generateBoard(board);

    //Starts the timer

    startTimer();

    // Setting the theme

    let theme1=document.getElementById("theme-1");
    if(theme1.checked)
    {
        document.querySelector("body").classList.remove("dark");
    }
    else
    {
        document.querySelector("body").classList.add("dark");
    }

    // Show number container

    document.getElementById("number-container").classList.remove("hidden");
}









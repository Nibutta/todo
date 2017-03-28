$(document).ready(

    function () {
        //*****************************************************************************************
        // VARS ON STARTUP
        //*****************************************************************************************
        var itemsArray = []; // array of items

        var itemState = "p"; // default item state p = pending, d = done
        var itemID = 0; // IDs start with 0 (also this is the number of overall added items)
        var itemValue = ""; // item value is empty on load

        var done = 0; // done tasks
        var pend = 0; // pending tasks
        var show = 0; // what to show -> show status: 0 = all, 1 = pending, 2 = done

        //*****PAGINATION*********
        var iNumber = 5;        // number of items on page
        var selectedPage = 1;   // default selected page
        var iCreated;
        var pagesNumber;
        //************************

        var sid = 0; // selected id
        var sval = ""; // selected value

        //*****************************************************************************************
        // FUNCTIONS
        //*****************************************************************************************
        // "SHOW STATS" FUNCTION
        var stats;
        stats = function () {
            document.getElementById("pending").innerHTML = 'Pending: ' + pend;
            document.getElementById("done").innerHTML = 'Done: ' + done;
            document.getElementById("currentID").innerHTML = '| Next ID: ' + itemsArray.length;
            document.getElementById("selID").innerHTML = '| Selected ID: ' + sid + '; value: ' + sval + '| Elements: ' + iCreated + '; pages: ' + pagesNumber;
        };


        // "APPEND ITEMS TO HTML WHEN ADDED" FUNCTION
        var addToList;
        addToList = function() {
            $('#items_wrap').append("<div class='item' id='" + itemsArray[itemID].idn + "'><div class='checkBox' id='checkBox-"
                + itemsArray[itemID].idn + "'></div><div id='content'>" + itemsArray[itemID].ivalue + "</div> (ID: "
                + itemsArray[itemID].idn + " / State: " + itemsArray[itemID].istate + ")<div class='killItem' id='killItem-"
                + itemsArray[itemID].idn + "'></div></div>");
        };


        // "CHANGE ITEM STATUS" FUNCTION
        var changeStatus;
        changeStatus = function () {
            // get ID of the selected item
            var selectedID = $(this).parent('div').attr('id');
            for (var i = 0; i < itemsArray.length; i++)
            {
                if(itemsArray[i].idn === +selectedID)
                {
                    if (itemsArray[i].istate === "d")
                    {
                        itemsArray[i].istate = "p";
                        $(this).parent('div').removeClass('done');
                        $(this).removeClass('checked');
                        pend++;
                        done--;
                        // remove from html if show status is wrong
                        if (show === 2)
                        {
                            $(this).parent('div').remove();
                            // call pagination function
                            pagination();
                        }
                        break;
                    }
                    else
                    {
                        itemsArray[i].istate = "d";
                        $(this).parent('div').addClass('done');
                        $(this).addClass('checked');
                        pend--;
                        done++;
                        // remove from html if show status is wrong
                        if (show === 1)
                        {
                            $(this).parent('div').remove();
                            // call pagination function
                            pagination();
                        }
                        break;
                    }
                }
            }
            sid = itemsArray[selectedID].idn;
            sval = itemsArray[selectedID].ivalue;
            stats();
        };


        // "EDIT ITEM" FUNCTION
        var editValue;
        editValue = function ()
        {
            var thisData = this.innerHTML, $el = $('<input type="text" class="editItem"/>');
            $(this).replaceWith($el);
            $el.val(thisData).focus();
        };


        // "APPLY NEW VALUE" FUNCTION, WORKS WHILE "EDIT ITEM" IS ACTIVE
        var applyValue;
        applyValue = function(e)
        {
            if (e.keyCode === 13)  // if ENTER is pressed
            {
                if ($(this).val() !== "")
                {
                    //get ID of the selected item
                    var selectedID = $(this).parent('div').attr('id');
                    // changing html
                    $(this).replaceWith($('<div id="content">' + $(this).val() + '</div>'));
                    // applying new value to the array
                    for (var i = 0; i < itemsArray.length; i++)
                    {
                        if (itemsArray[i].idn === +selectedID)
                        {
                            itemsArray[i].ivalue = $(this).val();
                            break;
                        }
                    }
                }
            }
        };


        // "KILL ITEM" FUNCTION
        var kickItem;
        kickItem = function ()
        {
            //get ID of the selected item
            var selectedID = $(this).parent('div').attr('id');
            for (var i = 0; i < itemsArray.length; i++)
            {
                if (itemsArray[i].idn === +selectedID)
                {
                    if (itemsArray[i].istate === "p")
                    {
                        pend--;
                    }
                    if (itemsArray[i].istate === "d")
                    {
                        done--;
                    }
                    //itemsArray.splice(i, 1);                      // deleting item OR...
                    itemsArray[i].istate = "del";                   // ...change state to the "deleted"
                    $(this).parent('div').remove();
                    // call pagination function
                    pagination();
                }
            }
            stats();
        };


        // "CLEAR ALL" FUNCTION
        var clearAll;
        clearAll = function () {
            itemsArray = [];        // clear array of items a.k.a. tasks a.k.a. OBJECTS

            pend = 0;               // set startup value
            done = 0;               // set startup value
            itemID = 0;             // set startup value

            $('.item').remove();    // remove all of the "item" class divs

            pagination();
            stats();
        };


        // "SHOW ALL TASKS" FUNCTION
        var showAll;
        showAll = function () {
            $('.item').remove();                // clear html
            selectedPage = 1;                   // selected page by default
            $('#nav_block > #1').addClass('selectedN');
            for (var i = selectedPage * iNumber - iNumber; i < i + iNumber; i++)
            {
                if (itemsArray[i].istate !== "del")
                {
                    if (itemsArray[i].istate === "p") {
                        $('#items_wrap').append("<div class='item' id='" + itemsArray[i].idn + "'><div class='checkBox' id='checkBox-"
                            + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                            + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                            + itemsArray[i].idn + "'></div></div>");
                    }
                    else {
                        $('#items_wrap').append("<div class='item done' id='" + itemsArray[i].idn + "'><div class='checkBox checked' id='checkBox-"
                            + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                            + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                            + itemsArray[i].idn + "'></div></div>");
                    }
                }
            }
            show = 0;
            $('#bottom_showAll').addClass('checked');
            $('#bottom_showPending').removeClass('checked');
            $('#bottom_showDone').removeClass('checked');
            // call pagination function
            pagination();
        };


        // "SHOW PENDING TASKS" FUNCTION
        var showPending;
        showPending = function () {
            $('.item').remove();
            selectedPage = 1;
            for (var q = 0; q < itemsArray.length; q++)
            {
                if (itemsArray[q].istate !== "del")
                {
                    if (itemsArray[q].istate === "p")
                    {
                        $('#items_wrap').append("<div class='item' id='" + itemsArray[q].idn + "'><div class='checkBox' id='checkBox-"
                            + itemsArray[q].idn + "'></div><div id='content'>" + itemsArray[q].ivalue + "</div> (ID: "
                            + itemsArray[q].idn + " / State: " + itemsArray[q].istate + ")<div class='killItem' id='killItem-"
                            + itemsArray[q].idn + "'></div></div>");
                    }
                }
            }
            show = 1;
            $('#bottom_showPending').addClass('checked');
            $('#bottom_showAll').removeClass('checked');
            $('#bottom_showDone').removeClass('checked');
            // call pagination function
            pagination();
        };


        // "SHOW DONE TASKS" FUNCTION
        var showDone;
        showDone = function () {
            $('.item').remove();
            selectedPage = 1;
            for (var q = 0; q < itemsArray.length; q++)
            {
                if (itemsArray[q].istate !== "del")
                {
                    if (itemsArray[q].istate === "d")
                    {
                        $('#items_wrap').append("<div class='item done' id='" + itemsArray[q].idn + "'><div class='checkBox checked' id='checkBox-"
                            + itemsArray[q].idn + "'></div><div id='content'>" + itemsArray[q].ivalue + "</div> (ID: "
                            + itemsArray[q].idn + " / State: " + itemsArray[q].istate + ")<div class='killItem' id='killItem-"
                            + itemsArray[q].idn + "'></div></div>");
                    }
                }
            }
            show = 2;
            $('#bottom_showDone').addClass('checked');
            $('#bottom_showPending').removeClass('checked');
            $('#bottom_showAll').removeClass('checked');
            // call pagination function
            pagination();
        };









        // PAGINATION / NAVIGATION
        var pagination;
        pagination = function ()
        {
            iCreated = $('.item').length;  // get the number of currently shown items
            pagesNumber = Math.ceil(iCreated / iNumber);

            // NAVIGATION BLOCK
            if (pagesNumber <= 1)
            {
                document.getElementById('nav_block').innerHTML = '<div class="pageN" id="1">' + pagesNumber;
            }
            else
            {
                document.getElementById('nav_block').innerHTML = "";
                for (var i = 1; i <= pagesNumber; i++)
                {
                    $('#nav_block').append('<div class="pageN" id="' + i + '">' + i + '</div>');
                }
            }

            // REDRAWING ITEMS / DIVISION ON PAGES
            var redrawItems;
            redrawItems = function ()
            {
                document.getElementById('items_wrap').innerHTML = "";
                if (show = 0)
                {
                    for (var i = selectedPage * iNumber - iNumber + 1; i < iNumber + 1; i++)
                    {
                        if (itemsArray[i].istate !== "del")
                        {
                            if (itemsArray[q].istate === "p") {
                                $('#items_wrap').append("<div class='item' id='" + itemsArray[i].idn + "'><div class='checkBox' id='checkBox-"
                                    + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                                    + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                                    + itemsArray[i].idn + "'></div></div>");
                            }
                            else {
                                $('#items_wrap').append("<div class='item done' id='" + itemsArray[i].idn + "'><div class='checkBox checked' id='checkBox-"
                                    + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                                    + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                                    + itemsArray[i].idn + "'></div></div>");
                            }
                        }
                    }
                }
                if (show = 1)
                {
                    for (var i = selectedPage * iNumber - iNumber + 1; i < iNumber + 1; i++)
                    {
                        if (itemsArray[i].istate !== "del")
                        {
                            $('#items_wrap').append("<div class='item' id='" + itemsArray[i].idn + "'><div class='checkBox' id='checkBox-"
                                + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                                + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                                + itemsArray[i].idn + "'></div></div>");
                        }
                    }
                }
                if (show = 2)
                {
                    for (var i = selectedPage * iNumber - iNumber + 1; i < iNumber + 1; i++)
                    {
                        if (itemsArray[i].istate !== "del")
                        {
                            $('#items_wrap').append("<div class='item done' id='" + itemsArray[i].idn + "'><div class='checkBox checked' id='checkBox-"
                                + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                                + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                                + itemsArray[i].idn + "'></div></div>");
                        }
                    }
                }
            };

            var changePage;
            changePage = function ()
            {
                selectedPage = $(this).attr('id');                              // get ID of the selected page
                $('#nav_block > div.selectedN').removeClass('selectedN');       // remove selection FROM ALL
                $(this).addClass('selectedN')                                   // add selection TO SPECIFIED

                redrawItems();
            };

            // on page click
            $('#nav_block').on('click', '.pageN', changePage);

            stats();
        };









        // SHOW STATS & PAGE ON STARTUP
        stats();
        pagination();


        // "ADD ITEM" FUNCTION
        var addItem;
        addItem = function ()
        {
            if ($('#text').val() !== "")
            {
                // get value from input
                itemValue = $('#text').val();

                var taskItem = {istate: itemState, idn: itemID, ivalue: itemValue}; // item object

                // push item to the array of objects
                itemsArray[itemID] = taskItem;

                // append item to the html list on the adding only if "show" has the right value
                if (show !== 2)
                {
                    addToList();
                    //showAll();
                }

                // call pagination function
                pagination();

                // reset the input field and focus it
                $('#text').val("").focus();

                pend++;
                itemID++;

                stats();
            }
        };


        //*****************************************************************************************
        // BUTTONS / INTERACTIONS
        //*****************************************************************************************
        // add item to the array and append to the html on click / enter
        $('#addButton').click(addItem);
        $('#text').keyup(function (e)
        {
            if (e.keyCode === 13)
            {
                addItem();
            }
        });

        // change item status on click
        $('#items_wrap').on('click', '.item > .checkBox', changeStatus);

        // kill item on click
        $('#items_wrap').on('click', '.item > .killItem', kickItem);

        // edit item value
        $('#items_wrap').on('dblclick', '.item > #content', editValue);

        // apply item value changes on ENTER
        $('#items_wrap').on('keydown', '.item > .editItem', applyValue);

        // show all tasks
        $('#bottom_showAll').on('click', showAll);
        $('#bottom_showAll_text').on('click', showAll);

        // show pending tasks
        $('#bottom_showPending').on('click', showPending);
        $('#bottom_showPending_text').on('click', showPending);

        // show done tasks
        $('#bottom_showDone').on('click', showDone);
        $('#bottom_showDone_text').on('click', showDone);

        // clear arrays and html
        $('#clearButton').on('click', clearAll);
    });
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
        var whatToShow = 0; // what to show -> show status: 0 = all, 1 = pending, 2 = done

        //*****PAGINATION*********
        var itemsPerPage = 3;   // number of items on page
        var selectedPage = 1;   // selected page
        var pagesNumber = 1;    // number of pages on startup
        var itemsNumber = 0;    // how many items to show
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
            document.getElementById("selID").innerHTML = '| Selected ID: ' + sid + '; value: ' + sval + '| Elements: ' + itemsNumber + '; pages: ' + pagesNumber;
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
                        if (whatToShow === 2)
                        {
                            $(this).parent('div').remove();
                            draw();
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
                        if (whatToShow === 1)
                        {
                            $(this).parent('div').remove();
                            draw();
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
                    itemsArray.splice(i, 1);                      // delete item OR...
                    //itemsArray[i].istate = "del";               // ...change state to the "deleted"
                    // itemID--;
                    $(this).parent('div').remove();
                    draw();
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

            navigation();
            stats();
        };


        // "DRAW" FUNCTION
        var draw;
        draw = function () {

            $('.item').remove();                    // clear html
            var counter = 0;                        // counter for drawn items

            // if it is needed to show all items
            if (whatToShow === 0)
            {
                // how many items to show?
                itemsNumber = pend + done;

                // how many pages?
                pagesNumber = Math.ceil(itemsNumber / itemsPerPage);

                // show itemsPerPage items on a page, depending on the selected page
                for (var i = selectedPage * itemsPerPage - itemsPerPage; i < itemsArray.length; i++)
                {
                    if (counter < itemsPerPage)
                    {
                        if (itemsArray[i].istate === "p")
                        {
                            $('#items_wrap').append("<div class='item' id='" + itemsArray[i].idn + "'><div class='checkBox' id='checkBox-"
                                + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                                + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                                + itemsArray[i].idn + "'></div></div>");
                            counter++;
                        }
                        else
                        {
                            $('#items_wrap').append("<div class='item done' id='" + itemsArray[i].idn + "'><div class='checkBox checked' id='checkBox-"
                                + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                                + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                                + itemsArray[i].idn + "'></div></div>");
                            counter++;
                        }
                    }
                    else
                    {
                        break;
                    }
                }
            }

            // if it is needed to show pending items
            if (whatToShow === 1)
            {
                // how many items to show?
                itemsNumber = pend;

                // how many pages?
                pagesNumber = Math.ceil(itemsNumber / itemsPerPage);

                // show itemsPerPage items on a page, depending on the selected page
                for (var i = selectedPage * itemsPerPage - itemsPerPage; i < itemsArray.length; i++)
                {
                    if (counter < itemsPerPage)
                    {
                        if (itemsArray[i].istate === "p")
                        {
                            $('#items_wrap').append("<div class='item' id='" + itemsArray[i].idn + "'><div class='checkBox' id='checkBox-"
                                + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                                + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                                + itemsArray[i].idn + "'></div></div>");
                            counter++;
                        }
                    }
                    else
                    {
                        break;
                    }
                }
            }

            // if it is needed to show done items
            if (whatToShow === 2)
            {
                // how many items to show?
                itemsNumber = done;

                // how many pages?
                pagesNumber = Math.ceil(itemsNumber / itemsPerPage);

                // show itemsPerPage items on a page, depending on the selected page
                for (var i = selectedPage * itemsPerPage - itemsPerPage; i < itemsArray.length; i++)
                {
                    if (counter < itemsPerPage)
                    {
                        if (itemsArray[i].istate === "d")
                        {
                            $('#items_wrap').append("<div class='item done' id='" + itemsArray[i].idn + "'><div class='checkBox checked' id='checkBox-"
                                + itemsArray[i].idn + "'></div><div id='content'>" + itemsArray[i].ivalue + "</div> (ID: "
                                + itemsArray[i].idn + " / State: " + itemsArray[i].istate + ")<div class='killItem' id='killItem-"
                                + itemsArray[i].idn + "'></div></div>");
                            counter++;
                        }
                    }
                    else
                    {
                        break;
                    }
                }
            }
            navigation();
        };


        // "SHOW ALL TASKS" FUNCTION (ON "SHOW ALL" CLICK)
        var showAll;
        showAll = function () {

            selectedPage = 1;                   // selected page by default, when 'Show all' is clicked
            whatToShow = 0;                     // set to show all items

            // add selection mark to page #1
            $('#nav_block > #1').addClass('selectedN');

            // draw items
            draw();

            $('#bottom_showAll').addClass('checked');
            $('#bottom_showPending').removeClass('checked');
            $('#bottom_showDone').removeClass('checked');
        };


        // "SHOW PENDING TASKS" FUNCTION (ON "SHOW PENDING" CLICK)
        var showPending;
        showPending = function () {

            selectedPage = 1;                   // selected page by default, when 'Show pending' is clicked
            whatToShow = 1;                     // set to show pending items

            // add selection mark to page #1
            $('#nav_block > #1').addClass('selectedN');

            draw();

            $('#bottom_showPending').addClass('checked');
            $('#bottom_showAll').removeClass('checked');
            $('#bottom_showDone').removeClass('checked');
        };


        // "SHOW DONE TASKS" FUNCTION (ON "SHOW DONE" CLICK)
        var showDone;
        showDone = function () {

            selectedPage = 1;
            whatToShow = 2;                     // set to show pending items

            // add selection mark to page #1
            $('#nav_block > #1').addClass('selectedN');

            draw();

            $('#bottom_showDone').addClass('checked');
            $('#bottom_showPending').removeClass('checked');
            $('#bottom_showAll').removeClass('checked');
        };


        // "PAGINATION" FUNCTION (ON PAGE NUMBER CLICK)
        var pagination;
        pagination = function ()
        {
            // get ID of the selected page
            selectedPage = $(this).attr('id');

           /* $('#nav_block > div.pageN').removeClass('selectedN');       // remove selection FROM ALL
            $('#nav_block').child('#' + selectedPage).addClass('selectedN'); // mark selected */

            draw();
            stats();
        };


        // "NAVIGATION" FUNCTION (SHOWS NAVIGATION PANEL)
        var navigation;
        navigation = function () {

            // re-count items / pages for the case of deletion / status change
            if (whatToShow === 0)
            {
                itemsNumber = pend + done;
                pagesNumber = Math.ceil(itemsNumber / itemsPerPage);
            }
            if (whatToShow === 1)
            {
                itemsNumber = pend;
                pagesNumber = Math.ceil(itemsNumber / itemsPerPage);
            }
            if (whatToShow === 2)
            {
                itemsNumber = done;
                pagesNumber = Math.ceil(itemsNumber / itemsPerPage);
            }

            if (pagesNumber < 1)
            {
                pagesNumber = 1;
                document.getElementById('nav_block').innerHTML = '<div class="pageN" id="1">' + pagesNumber + '</div>';
            }
            else
            {
                document.getElementById('nav_block').innerHTML = "";
                for (var i = 1; i <= pagesNumber; i++)
                {
                    $('#nav_block').append('<div class="pageN" id="' + i + '">' + i + '</div>');
                }
            }
        };


        // SHOW STATS & NAVIGATION PANEL ON STARTUP
        stats();
        navigation();


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
                // itemsArray[itemID] = taskItem;
                itemsArray.push(taskItem);

                // reset the input field and focus it
                $('#text').val("").focus();

                pend++;
                itemID++;

                // show item in the list if show !== 2 (done)
                if (whatToShow !== 2)
                {
                    draw();
                }

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

        // page number click
        $('#nav_block').on('click', '.pageN', pagination);

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
/**
 * Created by master on 01.03.16.
 */
function loadNewItems() {

    // we initiate an xmlhttprequest and read out its body
    xhr("GET","data/listitems.json",null,function(xhr) {
        var textContent = xhr.responseText;
        console.log("loaded textContent from server: " + textContent);
        var jsonContent = JSON.parse(textContent);

        // we assume jsonContent is an array and iterate over its members
        jsonContent.forEach(function(contentItem){
            createListElementForContentItem(contentItem);
        });

    });

}

function createListElementForContentItem(item) {

    var li = document.createElement("li");
    li.textContent = item.name;
    var button = document.createElement("button");
    li.appendChild(button);
    button.classList.add("edit-item");
    button.classList.add("imgbutton");

    // add the element to the list
    document.getElementsByTagName("ul")[0].appendChild(li);

}
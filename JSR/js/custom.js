/* Modifiziert im Pair Programming Verfahren durch: Benito Ernst, Arthur Muszynski 

Sämtlicher Inhalt wurde selbst verfasst.

*/




class ViewController {

    constructor(props) {
        this.listenersSet = false;
    }

    oncreate() {
        this.prepareEventHandler();
        this.fetchItems();
    }

    prepareEventHandler() {

        this.fadeoutViewHandler = (evt) => this.changeView();

        document.getElementById("change-view").onclick = () => {
            this.fadeoutView();
        }

        document.getElementById("refresh-list").onclick = () => {
            this.clearList();
        }

        document.getElementById("add-item").onclick = () => {
            this.addItem();
        }
    }


    fadeoutView() {

        this.triggerTransitionEventListener(this.fadeoutViewHandler);

        document.body.getElementsByTagName("main")[0].classList.remove("view-active");
        document.body.getElementsByTagName("main")[0].classList.add("view-shown");
    }

    fadeinView() {

        document.body.getElementsByTagName("main")[0].classList.remove("view-shown");
        document.body.getElementsByTagName("main")[0].classList.add("view-active");
    }

    changeView() {

        this.triggerTransitionEventListener(this.fadeoutViewHandler);
        

        if (document.body.classList[0] == "list-view") {
            document.body.classList.remove("list-view");
            document.body.classList.add("tile-view");
        }
        else
        {
            document.body.classList.remove("tile-view");
            document.body.classList.add("list-view");
        }

        this.fadeinView();
    }

    triggerTransitionEventListener(handler) {

        if (this.listenersSet) {
            document.getElementById("main-content").removeEventListener('transitionend', handler);
            this.listenersSet = false;
        } else {
            document.getElementById("main-content").addEventListener('transitionend', handler);
            this.listenersSet = true;
        }
    }

    showTitel(data) {
        alert("Title: " + data.title);
    }

    showTitelAndUrl(data) {
        alert("Title: " + data.title + "\nUrl: " + data.src);
    }

    deleteItem(data, item) {
        let text = "Wollen Sie das Element löschen? \n" + "Title: " + data.title + "\n" + "Image-Url: " + data.src;
        if (confirm(text) == true) {
            item.remove();
        }
    }

    clearList() {
        document.body.getElementsByClassName("main-list")[0].innerHTML = "";
        this.fetchItems();
    }

    createListElementForContentItem(data) {

        var li = document.createElement("li");
    
        var itemContent = document.createElement("div");
        itemContent.classList.add("item-content");
        li.appendChild(itemContent);
    
        itemContent.addEventListener("click", () => {
            const vc = new ViewController();
            vc.showTitel(data);
        });
    
        var itemImage = document.createElement("img");
        itemImage.classList.add("item-image");
        itemImage.src = data.src; //val
        itemContent.appendChild(itemImage);
    
        var itemInfo = document.createElement("div");
        itemInfo.classList.add("item-info");
        itemContent.appendChild(itemInfo);
    
        var div1 = document.createElement("div");
        var textOrigin = document.createElement("p");
        textOrigin.classList.add("text-origin");
        textOrigin.innerText = data.owner; // val
        var textDate = document.createElement("p");
        textDate.classList.add("text-date");
        textDate.innerText = data.added; // val
        div1.appendChild(textOrigin);
        div1.appendChild(textDate);
        itemInfo.appendChild(div1);
    
        var div2 = document.createElement("div");
        var textTitle = document.createElement("p");
        textTitle.classList.add("text-title");
        textTitle.innerText = data.title; // val
        div2.appendChild(textTitle);
        itemInfo.appendChild(div2);
    
        var div3 = document.createElement("div");
        var textTag = document.createElement("p");
        textTag.classList.add("text-tag");
        textTag.innerText = data.numOfTags; // val
        div3.appendChild(textTag);
        itemInfo.appendChild(div3);
        
        var optionButton = document.createElement("button");
        optionButton.classList.add("item-option");
        li.appendChild(optionButton);
    
        optionButton.addEventListener("click", () => {
            const vc = new ViewController();
            vc.deleteItem(data, li);
        });
        
        document.body.getElementsByTagName("ul")[0].appendChild(li);
        
    }

    async loadItems(textContent) {
        var jsonContent = JSON.parse(textContent);
    
        jsonContent.forEach((item) => {
            this.createListElementForContentItem(item);
        });
        
    }

    fetchItems() {

        fetch("data/listitems.json", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            }}).then(response => response.text(),
            response => alert(errormsg + response.status))
            .then(txt => {
                if (txt) {
                    this.loadItems(txt);
                }
            });
    }

    addItem() {
        console.log("add item");
        const placeholderItem = {
            title: "New Item",
            owner: "placekitten.com",
            added: (new Date()).toLocaleDateString(),
            numOfTags: 10,
            src: "https://placekitten.com/200/150"
        }

        this.createListElementForContentItem(placeholderItem);
    }
    
}

window.onload = async () => {
    const vc = new ViewController();
    vc.oncreate();
}
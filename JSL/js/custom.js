/* Modifiziert im Pair Programming Verfahren durch: Benito Ernst, Arthur Muszynski 

Sämtlicher Inhalt wurde selbst verfasst.

*/



class ViewController {

    constructor(props) {
        this.listenersSet = false;
    }

    oncreate() {
        this.prepareEventHandler();
    }
    

    prepareEventHandler() {

        this.fadeoutViewHandler = (evt) => this.changeView();

        // Register EventListener for Item-Info
        this.items = document.body.getElementsByClassName("item-content");
        for (let item of this.items) {
        item.addEventListener("click", () => {
           this.showTitel(item);
        });}

        // Register EventListener for Item-Option
        this.items = document.body.getElementsByClassName("item-option");
        for (let item of this.items) {
        item.addEventListener("click", () => {
            this.showTitelAndUrl(item);
        });}


        document.getElementById("change-view").onclick = () => {
            this.fadeoutView();
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

    showTitel(item) {
        alert("Title: " + item.getElementsByClassName("text-titel")[0].innerText);
    }

    showTitelAndUrl(item) {
        alert("Title: " + item.parentElement.getElementsByClassName("text-titel")[0].innerText + "\n" +
        "Image-Url: " + item.parentElement.getElementsByClassName("item-image")[0].src);
    }
}

window.onload = () => {
    const vc = new ViewController();
    vc.oncreate();    
}
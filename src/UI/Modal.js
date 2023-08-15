export class Modal {    // Modal an overlay on the screen
    constructor(contentId, fallbackText) {
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEl = document.getElementById('modal-template');
    }

    show() {
        if ('content' in document.createElement('template')) {  //As createElement not in IE-Check fails there
            const modalElements = document.importNode(this.modalTemplateEl.content, true); //true to get deep clone
            this.modalElement = modalElements.querySelector('.modal');
            this.backdropElement = modalElements.querySelector('.backdrop');
            //2 elements needed as a frame and background for background overlay

            //content we want to display
            const contentElement = document.importNode(
                this.contentTemplateEl.content, true
            );

            this.modalElement.appendChild(contentElement);   

            document.body.insertAdjacentElement('afterbegin', this.modalElement); //Inside of the body right after beginning
            document.body.insertAdjacentElement('afterbegin', this.backdropElement); 

        } else {
            // fallback code
            alert(this.fallbackText);
        }
    }

    hide() {
        if (this.modalElement){
            document.body.removeChild(this.modalElement); //this.modalElement.remove()
            document.body.removeChild(this.backdropElement);
            this.modalElement = null; //Tell DOM these elements are empty and reference to the
                                      //copied DOM element is no longer needed and can be cleared up
            this.backdropElement = null;
        }
    }
}
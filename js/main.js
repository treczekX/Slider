class Slider {
    constructor(images) {
        this.images = images;
        this.slide = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.image = null;
        this.currentSlide = 0;
        this.slideArrayLength = 0;
        this.slideCaption = null

        this.UiSelectors = {
            slide: '[data-slider]',
            buttonPrv: '[data-button-prev]',
            buttonNext: '[data-button-next]'
        }
    }

    initializeSlider() {
        this.slide = document.querySelector(this.UiSelectors.slide);
        this.prevBtn = document.querySelector(this.UiSelectors.buttonPrv);
        this.nextBtn = document.querySelector(this.UiSelectors.buttonNext);
        this.image = document.createElement('img');
        this.image.classList.add('slide__image');
        this.slide.appendChild(this.image);
        this.addListeners();
        this.setSlideAtributes(0);
        this.slideArrayLength = this.images && this.images.length;
        this.disableButtons();
        this.slideCaption = document.createElement('figcaption');
        this.slideCaption.classList.add('slide__caption')
        this.addCaption();
        this.slide.appendChild(this.slideCaption);
    }

    addListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.changeSlide(this.currentSlide - 1)
        })
        this.nextBtn.addEventListener('click', () => {
            this.changeSlide(this.currentSlide + 1)
        })
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 37) {
                this.changeSlide(this.currentSlide - 1)
            } else if (e.keyCode === 39) {
                this.changeSlide(this.currentSlide + 1)
            }
        })
    }

    disableButtons() {
        this.currentSlide === 0 ? this.prevBtn.setAttribute('disabled', true) : this.prevBtn.removeAttribute('disabled')
        this.currentSlide === this.slideArrayLength - 1 ? this.nextBtn.setAttribute('disabled', true) : this.nextBtn.removeAttribute('disabled')
    }

    changeSlide(index) {
        if (index === -1 || index === this.slideArrayLength) return;
        this.currentSlide = index;
        this.setSlideAtributes(index);
        this.disableButtons();
        this.addCaption()
    }
    setSlideAtributes(index) {
        this.image.setAttribute('src', Array.isArray(this.images) && this.images.length && this.images[index]);
        this.image.setAttribute('alt', `Slide ${index+1}`);
    }

    addCaption() {
        this.slideCaption.innerText = `${this.currentSlide+1}/${this.slideArrayLength}`
    }
}
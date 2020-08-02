const getTemplate = (options, placeholder) => {
  const text = placeholder ?? 'Placeholder by default';
  const langs = options.map((el) => {
    return `<li class="select__item" data-type="item" data-id=${el.id}>${el.name}</li>`
  })
  return `
        <div class="select__input" data-type="input">
          <span data-type="value">${text}</span>
          <i class="fa fa-chevron-down" data-type="arrow"></i>
        </div>
        <div class="select__dropdown">
           <ul class="select__list">
             ${langs.join('')}
           </ul> 
       </div>
  `
}


export class Select {
  constructor(selector, options){
    this.$el = document.querySelector(selector);
    this.options = options;
    this.langs = options.langs;
    this.selectedId = null;
    this.render();
    this.#setup();
  }
  render() {
    const {placeholder} = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(this.langs, placeholder);
  }

  #setup() {
   this.clickHandler = this.clickHandler.bind(this);
   this.$el.addEventListener('click', this.clickHandler);
   this.$arrow = this.$el.querySelector('[data-type="arrow"]');
   this.$value= this.$el.querySelector('[data-type="value"]');
  }

  get current() {
    return this.langs.find(item => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.name;
    this.close();
  }

  clickHandler() {
    const {type} = (event.target.dataset);

    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
        const id = (event.target.dataset.id);
        this.select(id);
    }
  }

  open() {
    this.$el.classList.add('open');
    this.$arrow.classList.remove('fa-chevron-down');
    this.$arrow.classList.add('fa-chevron-up');
  }

  close() {
    this.$el.classList.remove('open');
    this.$arrow.classList.add('fa-chevron-down');
    this.$arrow.classList.remove('fa-chevron-up');
  }



  toggle() {
    this.isOpen ? this.close() : this.open(); 
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  destroy() {
   this.$el.removeEventListener('click', this.clickHandler);
    this.$el.remove();
  }
};

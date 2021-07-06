import Component from '../../component';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this._itemsMap = {};

    this._render();

    this.on('click', 'remove', (event) => {
      const itemElement = event.target.closest('[data-element="item"]');

      this.remove(itemElement.dataset.itemId);
    });
  }

  add(itemId) {
    if (!(itemId in this._itemsMap)) {
      this._itemsMap[itemId] = 0;
    }

    this._itemsMap[itemId] += 1;

    this._render();
  }

  remove(itemId) {
    if (!(itemId in this._itemsMap)) {
      return;
    }

    this._itemsMap[itemId] -= 1;

    if (this._itemsMap[itemId] === 0) {
      delete this._itemsMap[itemId];
    }

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>
      ${Object.keys(this._itemsMap).map(itemId => `
          
         <li data-element="item" data-item-id="${itemId}">
            ${itemId} (${this._itemsMap[itemId]})
            <button data-element="remove">-</button>
          </li>
        
        `).join('')}
      </ul>
    `;
  }
}

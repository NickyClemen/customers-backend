class Cart {
  constructor() {
    this.id = this.#idGenerator();
    this.products = []; // array con objetos { id, quantity }
  }

  #idGenerator() {
    return 1;
  }

  addProductsToCart({ id, quantity }) {
    const product = this.products.fidnIndex((product) => product.id === id);

    if (product !== -1) {
      // sumar el stock al producto existente
    }

    this.products.push({ id, quantity });
  }
}

// each time a cart is interacted with it creates a new cart.
// items are stored as an object in order to store with with custom key being the item id.
module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {}; // passing items from old cart to new cart
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    // group same items together
    this.add = function(item, id) {
      var storedItem = this.items[id];
      if (!storedItem) { // if added item is not already in cart
        storedItem = this.items[id] = {item: item, qty: 0, price: 0}; // assign new object with product id as key
      }
      // Grouped quantity
      storedItem.qty++;
      // Group price
      storedItem.price = storedItem.item.price * storedItem.qty;
      // Total of objects in cart
      this.totalQty++;
      // Add group total to cart total price
      this.totalPrice += storedItem.item.price;
    }
    // Returns cart items as an array, stored as object above.
    this.generateArray = function () {
        var arr = [];
        // loop through objects
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};
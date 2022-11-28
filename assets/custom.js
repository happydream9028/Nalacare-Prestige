/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

document.addEventListener('variant:changed', function(event) {
  var variant = event.detail.variant; // Gives you access to the whole variant details
  var description = metaData[variant.id];
  var descriptionElement = document.querySelector(".ProductMeta__Description .Rte");
  if(!descriptionElement){
    descriptionElement = document.querySelector(".ProductMeta__Description.Rte");
  }

  descriptionElement.innerText = description;
});

var d = document,
    tabs = d.querySelector('.Product__Tab__Items'),
    tab,
    contents = d.querySelectorAll('.Product__Tab__Content');

if (tabs) {
  tab = tabs.querySelectorAll('li')
  tabs.addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === 'LI') {
      // change tabs
      for (var i = 0; i < tab.length; i++) {
        tab[i].classList.remove('active');
      }
      e.target.classList.toggle('active');


      // change content
      for (i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
      }

      var tabId = '#' + e.target.dataset.tabId;
      d.querySelector(tabId).classList.toggle('active'); 
    }  
  });
}


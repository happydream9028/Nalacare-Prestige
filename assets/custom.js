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

// Products Shortcode
var holder = document.querySelector('[data-products]');
if (holder) {
  var handle = holder.dataset.products;
  fetch(`/collections/${handle}/?view=json`)
  .then(response => response.json())
  .then((data) => {
    holder.innerHTML += `
      <div class="ProductList ProductList--grid  Grid" data-mobile-count="2" data-desktop-count="2">
      </div>
    `;
    console.log(data)
    data.products.forEach((el) => {
      holder.querySelector('.ProductList').innerHTML += `
        <div class="Grid__Cell 1/2--phone 1/2--tablet-and-up 1/2--desk">
          <div class="ProductItem">
            <div class="ProductItem__Wrapper">
              <a href="${ el.url }" class="ProductItem__ImageWrapper ProductItem__ImageWrapper--withAlternateImage">
                <div class="AspectRatio AspectRatio--withFallback" style="max-width: 2000px; padding-bottom: 100.0%; --aspect-ratio: 1.0">
                  <img class="ProductItem__Image ProductItem__Image--alternate Image--lazyLoad Image--fadeIn" data-src="${ el.secondary_image }" data-widths="[200,300,400,600,800,900,1000,1200]" data-sizes="auto">
                  <img class="ProductItem__Image Image--lazyLoad Image--fadeIn" data-src="${ el.featured_image }" data-widths="[200,300,400,600,800,900,1000,1200]" data-sizes="auto">
                  <span class="Image__Loader"></span>
                </div>
              </a>
              <div class="ProductItem__Info ProductItem__Info--center">
                <h2 class="ProductItem__Title Heading">
                  <a class="s_link" href="${ el.url }">${ el.title }</a>
                </h2>
                <div class="ProductItem__Rating Heading Text--subdued u-h7">
                  <span class=" stamped-product-reviews-badge collection-badge" data-product-sku="${ el.handle }" data-id="${ el.id }" data-product-title="${ el.title }" data-product-type="${ el.type }" style="display:block;"></span>
                </div>
                <div class="ProductItem__PriceList ProductItem__PriceList--showOnHover Heading">
                  <span class="ProductItem__Price Price Text--subdued">${ el.price }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  });
}
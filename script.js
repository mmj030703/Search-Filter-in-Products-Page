//* products array (array of objects) => contains details of products
const products = [
    {
        productName: "Tecno Spark 9",
        productPrice: 7499,
        productBrand: "tecno",
        productType: "smartphone",
        image: "./Images/product1.jpg"
    },
    {
        productName: "Dell 15 (2022)",
        productPrice: 40999,
        productBrand: "dell",
        productType: "laptop",
        image: "./Images/product2.jpg"
    },
    {
        productName: "boAt Xtend Smartwatch",
        productPrice: 2799,
        productBrand: "boat",
        productType: "smartwatch",
        image: "./Images/product3.jpg"
    },
    {
        productName: "Apple iPad 2021",
        productPrice: 28900,
        productBrand: "apple",
        productType: "tablet",
        image: "./Images/product4.jpg"
    },
    {
        productName: "HP Victus Gaming Laptop",
        productPrice: 66645,
        productBrand: "hp",
        productType: "laptop",
        image: "./Images/product5.jpg"
    },
    {
        productName: "Apple iPhone 14",
        productPrice: 67499,
        productBrand: "apple",
        productType: "smartphone",
        image: "./Images/product6.jpg"
    },
    {
        productName: "Noise Vivid",
        productPrice: 1598,
        productBrand: "noise",
        productType: "smartwatch",
        image: "./Images/product7.jpg"
    },
    {
        productName: "Swipe X1 Tab",
        productPrice: 14999,
        productBrand: "swipe",
        productType: "tablet",
        image: "./Images/product8.jpg"
    },
    {
        productName: "OnePlus Nord CE 2 Lite 5G",
        productPrice: 17999,
        productBrand: "oneplus",
        productType: "smartphone",
        image: "./Images/product9.jpg"
    },
    {
        productName: "Apple MacBook Air",
        productPrice: 134900,
        productBrand: "apple",
        productType: "laptop",
        image: "./Images/product10.jpg"
    }
];
//* contains filtered products according to the applied filters
const filteredProducts = [...products];

const productsContainer = document.querySelector('.products');
const filters = document.querySelector('.filters');
const search = document.querySelector('.search');
const brandFilters = document.querySelector('.brand_filter');
const typeFilters = document.querySelectorAll('.label');
const priceRange = document.querySelector('.price_range');
const priceAmount = document.querySelector('.price_amount');
const filterOpenButton = document.querySelector('.open_filter');
const filterCloseButton = document.querySelector('.close_filter');

//* keeps count of checked items in type filter
let checkedItemsCount = 0;

//* resets filtered products array and removes products from DOM
const resetShowProducts = () => {
    filteredProducts.length = 0;
    [...productsContainer.children].forEach((child) => {
        child.remove();
    });
}

//* Creates product element and appends in the products container element
const showProducts = () => {
    filteredProducts.forEach((product) => {
        if (product.productPrice <= Number(priceRange.value)) {
            //* Creating Elements
            const productContainer = document.createElement('div');
            const productImage = document.createElement('img');
            const productDetails = document.createElement('div');
            const productName = document.createElement('h3');
            const productPrice = document.createElement('p');
            const buyNowButton = document.createElement('button');

            //* Adding respective classes 
            productContainer.classList.add('product');
            productImage.classList.add('img');
            productDetails.classList.add('product_details');
            buyNowButton.classList.add('buy_now');

            //* Adding content to element
            productImage.src = product.image;
            productName.textContent = product.productName;
            productPrice.innerHTML = '&#8377;' + product.productPrice;
            buyNowButton.textContent = 'Buy Now';

            //* Appending the elements in their respective parent element
            productContainer.append(productImage);
            productDetails.append(productName, productPrice, buyNowButton);
            productContainer.append(productDetails);
            productsContainer.append(productContainer);
        }
    });
}

//* it finds product with product name that matches the match variable
const findSearchMatch = (match) => {
    resetTypeFilters();

    //* Corner case if user inputs empty string
    if (match === '') {
        return;
    }

    resetShowProducts();

    products.forEach((product) => {
        if (product.productName.toLowerCase().includes(match.toLowerCase())) {
            filteredProducts.push(product);
        }
    });

    showProducts();
}

//* resets the checkedItemsCount and checked checkboxes and make them unchecked.
const resetTypeFilters = () => {
    if (checkedItemsCount !== 0) {
        checkedItemsCount = 0;

        typeFilters.forEach((type) => {
            const checkBox = type.previousElementSibling;
            checkBox.checked = false;
        });
    }
}

//* finds user clicked brand and shows those products in the DOM
const findBrandMatch = (eventObj) => {
    resetShowProducts();
    resetTypeFilters();

    const brand = eventObj.target;

    if (brand.textContent.toLowerCase() === "all") {
        filteredProducts.push(...products);
    }
    else {
        filteredProducts.push(...products.filter((product) => {
            return product.productBrand === brand.textContent.toLowerCase();
        }));
    }

    showProducts();
}

//* removes the products in filtered products array from DOM. 
const removeFilteredProductElements = () => {
    if (filteredProducts.length === 0) {
        return;
    }

    Array.from(productsContainer.children).forEach((product) => {
        product.remove();
    });
}

//* shows user clicked product type products in the DOM. 
const findTypeMatch = (eventObj) => {
    if (checkedItemsCount === 0) {
        resetShowProducts();
    }

    const type = eventObj.target;
    const checkBox = type.previousElementSibling;

    //* !checkBox.checked because user clicks on label and that time checkbox is unchecked and after clicking its checkbox becomes checked.
    if (!checkBox.checked) {
        removeFilteredProductElements();
        //* used unshift because want to append in the start of the array.
        filteredProducts.unshift(...products.filter((product) => {
            return product.productType === checkBox.id;
        }));
        showProducts();
        checkedItemsCount++;
    }
    else {
        const products = filteredProducts.filter((product) => {
            return !(product.productType === checkBox.id);
        });
        resetShowProducts();
        filteredProducts.push(...products);
        showProducts();
        checkedItemsCount--;
        if (checkedItemsCount === 0) {
            loadProducts();
        }
    }
}

//* Displays the products in the DOM according to the price range value.
const findPriceMatch = () => {
    const filteredProductsCopy = [...filteredProducts];
    resetShowProducts();
    filteredProducts.push(...filteredProductsCopy);
    showProducts();
};

//* checks the key entered by the user while searching.
const checkKey = (eventObj) => {
    if (eventObj.key === 'Enter') {
        findSearchMatch(search.value.trim());
        search.value = '';
    }
}

//* loads all products in the DOM.
const loadProducts = () => {
    resetShowProducts();
    filteredProducts.push(...products);
    showProducts();
}

const openFilters = () => {
    filters.style.right = "0%";
    filters.style.display = "block";
    filterOpenButton.style.display = "none";
    filterCloseButton.style.display = "block";
}

const closeFilters = () => {
    filters.style.right = "-100%";
    filters.style.display = "none";
    filterOpenButton.style.display = "block";
    filterCloseButton.style.display = "none";
}

//* Adding Event Listeners
document.addEventListener('DOMContentLoaded', loadProducts);
search.addEventListener('keypress', checkKey);

brandFilters.addEventListener('click', findBrandMatch);

typeFilters.forEach((type) => {
    type.addEventListener('click', findTypeMatch);
});

priceRange.addEventListener('input', (eventObj) => {
    priceAmount.innerHTML = `Value : &#8377; ${priceRange.value}`;
});

priceRange.addEventListener('change', (eventObj) => {
    findPriceMatch();
});

window.addEventListener('scroll', () => {
    if (window.outerWidth > 849 && window.scrollY >= (140)) {
        filters.style.position = 'fixed';
        filters.style.top = '0';
        productsContainer.style.paddingLeft = "16.2em";
    } else if(window.outerWidth > 849) {
        filters.style.position = 'static';
        productsContainer.style.paddingLeft = "0em";
    }
});

filterOpenButton.addEventListener('click', openFilters);
filterCloseButton.addEventListener('click', closeFilters);
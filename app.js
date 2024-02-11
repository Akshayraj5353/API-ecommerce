const URL = "https://dummyjson.com/products";
const productBody = document.querySelector("#productBody");
const categoryList = document.querySelector(".category-list");
const searchInput = document.getElementById("search-input");

document.addEventListener('DOMContentLoaded', function() {
    getAllProducts(); // Show all products by default
    getCategory();
    searchInput.addEventListener('input', handleSearch);
});

const getAllProducts = async () => {
    console.log("getAllProducts");
    try {
        let response = await fetch(URL);
        let data = await response.json();
        displayProducts(data.products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const getCategory = async () => {
    console.log("getCategory");
    try {
        let response = await fetch("https://dummyjson.com/products/categories");
        let data = await response.json();
        data.forEach(category => {
            const categoryOption = document.createElement('div');
            categoryOption.innerText = category;
            categoryOption.classList.add('category-option');
            categoryOption.addEventListener('click', function() {
                getProductsByCategory(category);
            });
            categoryList.appendChild(categoryOption);
        });

        // Event listener for "All Products"
        const allProductsOption = document.getElementById('allProducts');
        allProductsOption.addEventListener('click', getAllProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const getProductsByCategory = async (category) => {
    console.log("getProductsByCategory")
    try {
        let response = await fetch(`https://dummyjson.com/products/category/${category}`);
        let data = await response.json();
        //console.log(data.products);
        displayProducts(data.products);
        
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const handleSearch = async () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    try {
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data.products)
        let filteredProducts = data.products.filter(product => {
            return product.title.toLowerCase().includes(searchValue);
        });
        displayProducts(filteredProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const displayProducts = (products, currentPage = 1, productsPerPage = 5) => {
    console.log("displayProducts");
    productBody.innerHTML = '';
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayedProducts = products.slice(startIndex, endIndex);

    displayedProducts.forEach(product => {
        console.log(product);
        const newDiv = document.createElement('div');
        newDiv.classList.add('productDiv');
        const imagelink = product.images[0];
        newDiv.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${imagelink}" height="100px" width="100px">   
            <p> Company :${product.brand}</p>
            <br>
            <br>       
            <small> ${product.description}</small>
            <br>
            <br>
            <p> ${product.price}$</p>
        `;
        productBody.appendChild(newDiv);
    });

    // Add pagination controls
    const totalPages = Math.ceil(products.length / productsPerPage);
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');
    
    // Previous page button
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            displayProducts(products, currentPage - 1, productsPerPage);
        }
    });
    paginationDiv.appendChild(prevButton);

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', function() {
            displayProducts(products, i, productsPerPage);
        });
        paginationDiv.appendChild(pageButton);
    }

    // Next page button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            displayProducts(products, currentPage + 1, productsPerPage);
        }
    });
    paginationDiv.appendChild(nextButton);

    productBody.appendChild(paginationDiv);
};



























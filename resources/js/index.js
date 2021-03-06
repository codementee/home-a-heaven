const categories = document.querySelectorAll('.categories-section-row .category')

categories.forEach(category => {
    category.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryContainer = e.target.parentElement.firstElementChild.innerText;
        console.log(categoryContainer)
        // adding category data to localstorage
        let categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || " ";
        localStorage.setItem('categoryArray', JSON.stringify(categoryContainer));
        reqByCategory(JSON.parse(localStorage.getItem('categoryArray')))
    })
})

async function reqByCategory(categoryName) {
    const res = await fetch('http://localhost:3333/req-by-category', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            categoryName
        })
    })
    const response = await res.json();
    if(response.isAdded) {
        window.location = 'collections/products';
    }
}
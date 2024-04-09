console.log("Running React");

const productDataRoute = document.getElementById("productData").value;
const updateProductRoute = document.getElementById("editProdData").value;
const deleteProductRoute = document.getElementById("delProd").value;
const categoryDataRoute = document.getElementById("categoryData").value;
const ce = React.createElement;


class productTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showing: "table", 
        products : [], 
        categories: [], 
        prodID: 0, 
        productName: "", 
        price: 0, 
        description: "", 
        inventory: 0, 
        selectedCategories: [],
        imgPath: ""
    }}

    render() {
        this.getProducts();
        this.getCategories();
        if(this.state.showing === "table") {
            return ce(
                'table',
                null,
                ce(
                  'thead',
                  null,
                  ce(
                    'tr',
                    null,
                    ce('th', null, 'ID'),
                    ce('th', null, 'Name'),
                    ce('th', null, 'Price'),
                    ce('th', null, 'Description'),
                    ce('th', null, 'Inventory')
                  )
                ),
                ce(
                  'tbody',
                  null,
                  this.state.products.map((item, index) =>
                    ce(
                      'tr',
                      { key: index },
                      ce('td', {onClick: e => this.getEditForm(item)}, item.productID),
                      ce('td', {onClick: e => this.getEditForm(item)}, item.productName),
                      ce('td', {onClick: e => this.getEditForm(item)}, item.price),
                      ce('td', {onClick: e => this.getEditForm(item)}, item.description),
                      ce('td', {onClick: e => this.getEditForm(item)}, item.inventory)
                    )
                  )
                )
              );
        }
        else if(this.state.showing === "product") {
            return ce('div', null,
            ce('h1', null, 'Product Information:'),
            ce('br'),
            ce('form',{id:"prodInfoForm"}, 
            ce('label',null,'Product Name '),
            ce('br'),
            ce('input', {type: "text", id: "productName", value: this.state.productName, onChange: e => this.changerHandler(e)}),
            ce('br'),
            ce('label',null,'Description '),
            ce('br'),
            ce('textarea', {id:"description", value: this.state.description, onChange: e => this.changerHandler(e)}),
            ce('br'),
            ce('label',null,'Price '),
            ce('input', {type: "number", step: "0.01", min: "0.00", id: "price", value: this.state.price, onChange: e => this.changerHandler(e)}),
            ce('label',null,'Inventory '),
            ce('input', {type: "number", min: "0", id:"inventory", value: this.state.inventory, onChange: e => this.changerHandler(e)}),
            ce('br'),
            ce('div',{id:'catInput'}, 
            ce('label', null, 'Categories'),
            ce('div',null,"Select multiple with cntrl + click"),
            ce('select',{id:'categories', multiple:'true', onChange: e => this.categoryChange(e)},
            this.state.categories.map((category, index) => 
                ce('option', {value:category.categoryName, key:index},category.categoryName)
            ))),
            ce('img',{src:this.state.imgPath, alt:"Current Product Image", id:"oldProductImage"}),
            ce('label',null, 'Change Product Picture'),
            ce('input',{type:"file", id:"productImg", name:"productImg"}),
            ce('br')),
            ce('button', {id:"updateButton", onClick: e => this.updateProduct(e)}, 'Update Product'),
            ce('button', {id:"removeButton", onClick: e => this.deleteProduct(e)}, 'Remove Product'),
            //ce('span', {id: "create-message"}, this.state.createMessage)
    );
        }
        
    };

    getProducts() {
        fetch(productDataRoute).then(res => res.json()).then(products => this.setState({ products }));
    }

    getCategories() {
        fetch(categoryDataRoute).then(res => res.json()).then(categories => this.setState({ categories }));
    }

    getEditForm(item) {
        this.setState({showing: "product",
        prodID:item.productID,
        productName:item.productName,
        price:item.price,
        description:item.description,
        inventory: item.inventory,
        imgPath: item.imagePath
    })
    }

    changerHandler(e) {
        this.setState({ [e.target['id']]: e.target.value });
    }

    categoryChange(e) {
        this.setState({selectedCategories:e.target.selectedOptions}) ;
    }

    updateProduct(info) {
        const productID = this.state.prodID;
        const productName = this.state.productName;
        const price = this.state.price;
        const inventory = this.state.inventory;
        const description = this.state.description;
        const category = [];
        for(let i = 0; i < this.state.selectedCategories.length; i++) {
            category[i] = this.state.selectedCategories.item(i).innerHTML;
        }

        let formData = new FormData();
        formData.append("productID",productID);
        formData.append("productName",productName);
        formData.append("price",price);
        formData.append("inventory",inventory);
        formData.append("description",description);
        formData.append("category",category);
        formData.append("productImg", document.getElementById("productImg").files[0])

        //console.log("b4 fetch category(1) = " + category.item(0).innerHTML);

        fetch(updateProductRoute, { 
        method: 'POST',
        body: formData
        // headers: {'Content-Type': 'multipart/form-data'},
        // body: JSON.stringify({ productID, productName, price, description, inventory, category})
        }).then(()=>this.setState({showing:"table"}))
    }

    deleteProduct() {
        const productID = this.state.prodID;

        fetch(deleteProductRoute, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({productID})
        })
        this.setState({showing:"table"})
    }
    
}

ReactDOM.render(
    ce(productTable,null,null),
    document.getElementById('react-root')
);
 
console.log("Running React");

const productDataRoute = document.getElementById("productData").value;
const updateProductRoute = document.getElementById("editProdData").value;
const deleteProductRoute = document.getElementById("delProd").value;
const ce = React.createElement;


class productTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showing: "table", products : [], prodID: 0, productName: "", price: 0, description: "", inventory: 0}
    }

    render() {
        this.getProducts();
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
                      ce('td', null, item.price),
                      ce('td', null, item.description),
                      ce('td', null, item.inventory)
                    )
                  )
                )
              );
        }
        else if(this.state.showing === "product") {
            return ce('div', null,
            ce('h2', null, 'Product Information:'),
            ce('br'),
            'Product Name: ',
            ce('input', {type: "text", id: "productName", value: this.state.productName, onChange: e => this.changerHandler(e)}),
            ce('br'),
            'Price: ',
            ce('input', {type: "number", step: "0.01", min: "0.00", id: "price", value: this.state.price, onChange: e => this.changerHandler(e)}),
            ce('br'),
            'Inventory: ',
            ce('input', {type: "number", min: "0", id:"inventory", value: this.state.inventory, onChange: e => this.changerHandler(e)}),
            ce('br'),
            'Description: ',
            ce('input', {type:"text", id:"description", value: this.state.description, onChange: e => this.changerHandler(e)}),
            ce('br'),
            ce('button', {onClick: e => this.updateProduct(e)}, 'Update Product'),
            ce('button', {onClick: e => this.deleteProduct(e)}, 'Remove Product'),
            //ce('span', {id: "create-message"}, this.state.createMessage)
    );
        }
        
    };

    getProducts() {
        fetch(productDataRoute).then(res => res.json()).then(products => this.setState({ products }));
    }

    getEditForm(item) {
        this.setState({showing: "product",
        prodID:item.productID,
        productName:item.productName,
        price:item.price,
        description:item.description,
        inventory: item.inventory
    })
    }

    changerHandler(e) {
        this.setState({ [e.target['id']]: e.target.value });
    }

    updateProduct(info) {
        const productID = this.state.prodID;
        const productName = this.state.productName;
        const price = this.state.price;
        const inventory = this.state.inventory;
        const description = this.state.description;

        console.log("b4 fetch id = " + productID);

        fetch(updateProductRoute, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ productID, productName, price, description, inventory })
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
 
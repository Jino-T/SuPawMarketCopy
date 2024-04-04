console.log("Running React");

const getUsersRoute = document.getElementById("getUsers").value;
// const updateProductRoute = document.getElementById("editProdData").value;
// const deleteProductRoute = document.getElementById("delProd").value;
const ce = React.createElement;


class userTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showing: "table", users : [], userID: 0, username: "", isAdmin: 0}
    }

    render() {
        this.getusers();
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
                    ce('th', null, 'isAdmin'),
                  )
                ),
                ce(
                  'tbody',
                  null,
                  this.state.users.map((user, index) =>
                    ce(
                      'tr',
                      { key: index },
                      ce('td', {onClick: e => this.getEditForm(user)}, user.userID),
                      ce('td', {onClick: e => this.getEditForm(user)}, user.username),
                      ce('td', {onClick: e => this.getEditForm(user)}, user.isAdmin)
                    )
                  )
                )
              );
        }
        // else if(this.state.showing === "product") {
        //     return ce('div', null,
        //     ce('h1', null, 'Product Information:'),
        //     ce('br'),
        //     ce('label',null,'Product Name '),
        //     ce('input', {type: "text", id: "username", value: this.state.username, onChange: e => this.changerHandler(e)}),
        //     ce('br'),
        //     ce('label',null,'Description '),
        //     ce('textarea', {id:"description", value: this.state.description, onChange: e => this.changerHandler(e)}),
        //     ce('br'),
        //     ce('label',null,'isAdmin '),
        //     ce('input', {type: "number", step: "0.01", min: "0.00", id: "isAdmin", value: this.state.isAdmin, onChange: e => this.changerHandler(e)}),
        //     ce('label',null,'Inventory '),
        //     ce('input', {type: "number", min: "0", id:"inventory", value: this.state.inventory, onChange: e => this.changerHandler(e)}),
        //     ce('br'),
        //     ce('button', {id:"updateButton", onClick: e => this.updateProduct(e)}, 'Update Product'),
        //     ce('button', {id:"removeButton", onClick: e => this.deleteProduct(e)}, 'Remove Product'),
        //     //ce('span', {id: "create-message"}, this.state.createMessage)
        //     );
        // }
        
    };

    getusers() {
        fetch(getUsersRoute).then(res => res.json()).then(users => this.setState({ users }));
    }

    getEditForm(user) {
        this.setState({showing: "user",
        userID:user.productID,
        username:user.username,
        isAdmin:user.isAdmin,
        description:user.description,
        inventory: user.inventory
    })
    }

    // changerHandler(e) {
    //     this.setState({ [e.target['id']]: e.target.value });
    // }

    // updateProduct(info) {
    //     const productID = this.state.userID;
    //     const username = this.state.username;
    //     const isAdmin = this.state.isAdmin;
    //     const inventory = this.state.inventory;
    //     const description = this.state.description;

    //     console.log("b4 fetch id = " + productID);

    //     fetch(updateProductRoute, { 
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({ productID, username, isAdmin, description, inventory })
    //     }).then(()=>this.setState({showing:"table"}))
    // }

    // deleteProduct() {
    //     const productID = this.state.userID;

    //     fetch(deleteProductRoute, {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({productID})
    //     })
    //     this.setState({showing:"table"})
    // }
    
}

ReactDOM.render(
    ce(userTable,null,null),
    document.getElementById('react-root')
);
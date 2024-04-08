console.log("Running React");

const getUsersRoute = document.getElementById("getUsers").value;
const toggleAdminRoute = document.getElementById("toggleAmdmin").value;
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
                    ce('th',null, 'Admin Toggle')
                  )
                ),
                ce(
                  'tbody',
                  null,
                  this.state.users.map((user, index) =>
                    ce(
                      'tr',
                      { key: index },
                      ce('td', null, user.userID),
                      ce('td', null, user.username),
                      ce('td', null, user.isAdmin),
                      ce('td',null,
                      ce('button',{onClick: e => this.toggleAdmin(user)}, "Toggle Admin Status")
                    )
                    )
                  )
                )
              );
        }        
    };

    getusers() {
        fetch(getUsersRoute).then(res => res.json()).then(users => this.setState({ users }));
    }

    toggleAdmin(user) {
      const userID = user.userID;
      const currentStatus = user.isAdmin;

      fetch(toggleAdminRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userID, currentStatus})
      })
    }

    // getEditForm(user) {
    //     this.setState({showing: "user",
    //     userID:user.productID,
    //     username:user.username,
    //     isAdmin:user.isAdmin,
    //     description:user.description,
    //     inventory: user.inventory
    //   })
    // }

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
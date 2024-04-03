console.log("Running React");

const categoryDataRoute = document.getElementById("categoryData").value;

class categoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
}

ReactDOM.render(
    ce(categoryList,null,null),
    document.getElementById('categories')
);
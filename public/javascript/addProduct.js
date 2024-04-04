console.log("Running React");

const categoryDataRoute = document.getElementById("categoryData").value;
const ce = React.createElement;

class categoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categories : [] }
    }

    render() {
        this.getCategories();
        return this.state.categories.map((category, index) => 
            ce('option', {value:category.categoryName, key:index},category.categoryName)
        )
    }

    getCategories() {
        fetch(categoryDataRoute).then(res => res.json()).then(categories => this.setState({ categories }));
    }
}

ReactDOM.render(
    ce(categoryList,null,null),
    document.getElementById('categories')
);
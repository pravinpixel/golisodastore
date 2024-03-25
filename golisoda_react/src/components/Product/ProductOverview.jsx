function ProductOverview({ product }) {
    if (product.overview.length) return (
        <div>
            <hr />
            <h5>Product Overview</h5>
            {product.overview.map((view) => (
                <div className="row">
                    <div className="col-md-3 text-title">
                        <ul className="bullet-points">
                            <li key={view.id}>
                                <span className="text-info">{view.title}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="w-auto">
                        <span> : </span>
                    </div>
                    <div className="col-md-8">
                        <ul>
                            <li>
                                {view.attribute_values}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
            {/* <ul className="bullet-points mt-3">
                {product.overview.map((view) => (
                    <li key={view.id}>
                        <span className="text-info">{view.title}</span>:  {view.attribute_values}
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default ProductOverview
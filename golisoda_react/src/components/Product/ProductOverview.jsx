function ProductOverview({ product }) {
    if (product.overview.length || product?.no_of_items !== null
        || product?.material_ingredients !== null || product?.features !== null || product?.benefits !== null) return (
            <div>
                <hr />
                <h5>Product Overview</h5>
                {product?.no_of_items !== null ?
                    <div className="row">
                        <div className="col-md-3 text-title">
                            <ul className="bullet-points">
                                <li><span className="text-info">No of Items</span></li>
                            </ul>
                        </div>
                        <div className="w-auto"><span> : </span></div>
                        <div className="col-md-8">
                            <ul>
                                <li>{product?.no_of_items}</li>
                            </ul>
                        </div>
                    </div> : null
                }
                {product?.material_ingredients !== null ?
                    <div className="row">
                        <div className="col-md-3 text-title">
                            <ul className="bullet-points">
                                <li><span className="text-info">Material Ingredients</span></li>
                            </ul>
                        </div>
                        <div className="w-auto"><span> : </span></div>
                        <div className="col-md-8">
                            <ul>
                                <li>{product?.material_ingredients}</li>
                            </ul>
                        </div>
                    </div> : null
                }
                {product?.features !== null ?
                    <div className="row">
                        <div className="col-md-3 text-title">
                            <ul className="bullet-points">
                                <li><span className="text-info">Features</span></li>
                            </ul>
                        </div>
                        <div className="w-auto"><span> : </span></div>
                        <div className="col-md-8">
                            <ul>
                                <li>{product?.features}</li>
                            </ul>
                        </div>
                    </div> : null
                }
                {product?.benefits !== null ?
                    <div className="row">
                        <div className="col-md-3 text-title">
                            <ul className="bullet-points">
                                <li><span className="text-info">Benefits</span></li>
                            </ul>
                        </div>
                        <div className="w-auto"><span> : </span></div>
                        <div className="col-md-8">
                            <ul>
                                <li>{product?.benefits}</li>
                            </ul>
                        </div>
                    </div> : null
                }
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
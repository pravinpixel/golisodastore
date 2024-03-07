import NoDataComponent from "components/NoDataComponent/NoDataComponent";
import CardComponent from "components/CardComponent/CardComponent";

function ProductGridComponent({ products, action }) {
  if (products.length > 0) {
    return (
      <div className="row g-2 g-lg-0 border-start">
        {products.map((product) => (
          <div className='col-6 col-lg-4 border-bottom col-md-4 p-3'>
            <CardComponent
              product={product}
              key={product.id} />
          </div>
        ))}
      </div>
    );
  } else {
    return <NoDataComponent />;
  }
}

export default ProductGridComponent;

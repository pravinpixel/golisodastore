import { Helmet } from "react-helmet";
import "../errors/styles.scss";
function NotFound() {
  return (
    <div className="error-body text-center">
      <Helmet>
        <title>Golisoda | 404 Not Found</title>
        <meta name="description" content={"notfound"} />
        <meta name="keywords" content={"notfound"} />
      </Helmet>
      <div className="number">404</div>
      <div className="text">
        <span>Ooops...</span>
        <div>page not found</div>
      </div>
    </div>
  );
}

export default NotFound;

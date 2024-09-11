import { Connectsites } from "./InnerComponents/ConnectSites";

const Shops = ["Shopify", "WooCommerce", "others"];

const TestingComponent = () => {
  return (
    <div>
      <Connectsites names={Shops} />
    </div>
  );
};

export default TestingComponent;

declare module "swagger-ui-react" {
  import * as React from "react";
  const SwaggerUI: React.ComponentType<{ url: string } & Record<string, unknown>>;
  export default SwaggerUI;
}
declare module "swagger-ui-react/swagger-ui.css";

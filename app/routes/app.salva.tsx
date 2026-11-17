import { useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";

interface ShopData {
  collections: {
    edges: [] | {}
  }
}

export const loader = async ({request}: {request: Request}) => {
  const {admin} = await authenticate.admin(request);
  const response = await admin.graphql(`#graphql
  query {
    collections(first: 10, query: "*") {
      edges {
        node {
          id
          title
          handle
          updatedAt
        }
      }
    }
  }`,
  );
  const json = await response.json();
  console.log(json.data);
  return json.data;  
}

export default function SalvaPage() {
  const shopData: any = useLoaderData();
  console.log(shopData.collections.edges);
  return (
    <s-page heading="Salva1 Page"  >
      <s-section slot="aside" heading="Resources">
        <s-unordered-list>
          <s-list-item>
            <s-link
              href="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
              target="_blank"
            >
              App nav best practices
            </s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}

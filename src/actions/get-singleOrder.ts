import axios from 'axios'
import { RuntimeError } from '@botpress/client'
import { SHOPIFY_API_VERSION } from '../const'
import { IntegrationProps } from '.botpress'

type GetSingleOrder = IntegrationProps['actions']['getSingleOrder']

export const getSingleOrder: GetSingleOrder = async ({ ctx, input, logger }) => {
  const { orderId } = input;  // Assumes `orderId` is passed in `input`

  const axiosConfig = {
    baseURL: `https://${ctx.configuration.shopName}.myshopify.com`,
    headers: {
      'X-Shopify-Access-Token': ctx.configuration.access_token,
    },
  };

  try {
    const response = await axios.get(`/admin/api/${SHOPIFY_API_VERSION}/orders/${orderId}.json`, axiosConfig);

    const order = response.data.order;  // Assuming the API returns the order under `order` key

    logger
      .forBot()
      .info(`Successfully retrieved order with ID: ${orderId}`);

    return { order };  // Return the order object
  } catch (e) {
    const errorMsg = `Failed to retrieve order with ID ${orderId}: ${JSON.stringify(e)}`;
    logger.forBot().error(errorMsg);
    throw new RuntimeError(errorMsg);
  }
}

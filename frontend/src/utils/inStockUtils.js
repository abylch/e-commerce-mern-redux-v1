// inStockUtils.js

import { useUpdateProductCountInStockMutation } from '../slices/productsApiSlice';
import { toast } from 'react-toastify';

export const useUpdateProductCountInStock = () => {
  const [ updateProductCountInStockMutation ] = useUpdateProductCountInStockMutation();

  const updateProductCountInStock = async ({ order, userInfo }) => {
    console.log("hi from updateStockOnOrderPayment in the inStockUtils.js");
    console.log("order", order);
    console.log("userInfo", userInfo);
    console.log("orderItems", order.orderItems);

    for (const orderItem in order.orderItems) {
        console.log("orderItem", orderItem);
      const productId = order.orderItems[orderItem].product;
      const qty = order.orderItems[orderItem].qty;
      console.log("productId in loop", productId);
      console.log("quantity in loop", qty);

      try {
        const data = {productId: productId, qty: qty}
        console.log("data", data);
        const res = await updateProductCountInStockMutation( { data, userInfo } );
        console.log("res", res);
        //toast.success('Product countInStock updated for product!', productId);
        return true;
      } catch (error) {
        console.error('Error updating product countInStock:', error);
        //toast.error('Failed to update countInStock for product');
        throw error; // Rethrow the error for the caller to handle
      }
    }
  };

  return { updateProductCountInStock };
};


// // inStockUtils.js

// import { useUpdateProductCountInStockMutation } from '../slices/productsApiSlice'; // Update the path as needed
// // eslint-disable-next-line
// import { useEffect } from 'react';
// import { toast } from 'react-toastify';

// export const useUpdateStockOnOrderPayment = () => {
//   const updateProductMutation = useUpdateProductCountInStockMutation();

//   const updateStockOnOrderPayment = async (order) => {
//     console.log("hi from updateStockOnOrderPayment in the inStockUtils.js");
//     console.log("order", order.order.orderItems);

//     order.order.orderItems.forEach(async function(orderItem) {
//         const productId = orderItem.product;
//         const qty = orderItem.qty;
//         console.log("productId", productId);
//         console.log("quantity", qty);
//         const toUpdate = { productId: productId, qty: qty };

//         try {
//             const data = await updateProductMutation({ toUpdate });
//             console.log("data", data);
//             toast.success('product Updated countInStock for products!', toUpdate.productId);
//             return true;
            
//           } catch (error) {
//             console.error('Error updating product countInStock:', error);
//             toast.error('Failed to update countInStock for product');
//             throw error; // Rethrow the error for the caller to handle
//           }

//   }); // end of for loop
  
//   };

//   return { updateStockOnOrderPayment };
// };

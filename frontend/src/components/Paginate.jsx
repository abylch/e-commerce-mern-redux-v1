import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useEffect } from 'react';



const Paginate = ({ pages, page, listType, isAdmin = false, keyword = '' }) => {

  // Scroll to the 'Products' section when the page changes
  useEffect(() => {
    const productsSection = document.getElementById('products-section');
    if (productsSection && page>>1) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    else if (productsSection && page === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [page]);

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/${listType}list/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;



// import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';

// const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
//   return (
//     pages > 1 && (
//       <Pagination>
//         {[...Array(pages).keys()].map((x) => (
//           <LinkContainer
//             // key={x + 1} to={!isAdmin ? `/page/${x + 1}` : `/admin/productlist/${x + 1}`}
//             // new updated search functionality
//             key={x + 1}
//             to={
//               !isAdmin
//                 ? keyword
//                   ? `/search/${keyword}/page/${x + 1}`
//                   : `/page/${x + 1}`
//                 : `/admin/orderlist/${x + 1}`
//             }
//           >
//             <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
//           </LinkContainer>
//         ))}
//       </Pagination>
//     )
//   );
// };

// export default Paginate;
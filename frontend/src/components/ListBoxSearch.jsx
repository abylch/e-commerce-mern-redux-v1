import { useState } from 'react';
import { ListGroup, Card } from 'react-bootstrap';

const ListBoxSearch = () => {
  // Your list of search terms or categories
  const searchTerms = [
    'Skull', 'Phone', 'Cannon', 'Pantum', 'Amazon', 'Headphones',
    'Sony', 'Viking', 'מדפסת', 'Brother', 'Mouse', 'לייזר'
  ];

  // Number of items to display initially
  const initialDisplayCount = 4;

  // Separate the first 3 items and the rest
  const initialItems = searchTerms.slice(0, initialDisplayCount);
  const accordionItems = searchTerms.slice(initialDisplayCount);

  // State variable to track whether the additional items are visible
  const [additionalItemsVisible, setAdditionalItemsVisible] = useState(false);

  return (
    <>
      <ListGroup>
        <Card className='card rounded my-3 p-3'>
          {/* Display the initial items */}
          {initialItems.map((term, index) => (
            <ListGroup.Item key={index} variant="light" action href={`/search/${term}`}>
              {term}
            </ListGroup.Item>
          ))}
          {/* Display the additional items if visible */}
          {additionalItemsVisible && (
            <>
              {accordionItems.map((term, index) => (
                <ListGroup.Item key={index} variant="light" action href={`/search/${term}`}>
                  {term}
                </ListGroup.Item>
              ))}
            </>
          )}
          {/* Toggle visibility on click */}
          <ListGroup.Item
            variant="light"
            action
            onClick={() => setAdditionalItemsVisible(!additionalItemsVisible)}
          >
            {additionalItemsVisible ? 'Show fewer Options' : 'Show more Options'}
          </ListGroup.Item>
        </Card>
      </ListGroup>
    </>
  );
};

export default ListBoxSearch;
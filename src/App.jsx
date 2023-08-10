import './reset.scss';
import './sort.scss';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { MdDragHandle } from 'react-icons/md';
import { useState } from 'react';

const SortableItem = SortableElement(({ number, value }) => (
  <li className='sort-item'>
    <p>{`${number + 1}. ${value}`}</p>
    <MdDragHandle />
  </li>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul className='sort'>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} number={index} value={value} />
      ))}
    </ul>
  );
});

function App() {
  const [items, setItems] = useState([
    '🍉수박',
    '🍊오렌지',
    '🍋레몬',
    '🍌바나나',
    '🍍파인애플',
    '🍏사과',
    '🍒체리',
    '🍓딸기',
    '🫐포도',
    '🥑아보카도',
  ]);

  const move = (collection, fromIndex, toIndex) => {
    const result = [];
    const shift = toIndex - fromIndex > 0 ? 1 : -1;
    const start = toIndex < fromIndex ? toIndex : fromIndex;
    const end = start < toIndex ? toIndex : fromIndex;

    for (let index = 0; index < collection.length; index++) {
      const offset = index >= start && index <= end ? shift : 0;
      result[index] = collection[index + offset];
    }

    result[toIndex] = collection[fromIndex];

    return result;
  };

  const handleSortEnd = ({ oldIndex, newIndex }) =>
    setItems(prevItems => move(prevItems, oldIndex, newIndex));
  return (
    <div className='app'>
      <SortableList items={items} lockAxis='y' onSortEnd={handleSortEnd} />
    </div>
  );
}

export default App;

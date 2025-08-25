import { useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  function onAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function onClickDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function onSelectToggle(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          item.packed = true;
        }
        return item;
      })
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={onAddItems} />
      <PackingList
        items={items}
        onClickDelete={onClickDelete}
        onSelectToggle={onSelectToggle}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴FAR AWAY💼</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function submitForm(e) {
    e.preventDefault();
    if (!description) return;
    const item = { description, quantity, packed: false, id: Date.now() };
    onAddItems(item);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={submitForm}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onClickDelete, onSelectToggle }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onClickDelete={onClickDelete}
            onSelectToggle={onSelectToggle}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onClickDelete, onSelectToggle }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onSelectToggle(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
        <button onClick={() => onClickDelete(item.id)}>❌</button>
      </span>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Your are yet to pack.</em>
      </footer>
    );
  let itemsCount = items.length;
  let packedItems = items.filter((item) => item.packed).length;
  let packedpercentage = Math.round((packedItems / itemsCount) * 100);
  return (
    <footer className="stats">
      <em>
        {itemsCount === packedItems
          ? `your got everything! ready to go ✈️`
          : `💼 You have ${itemsCount} items on your list, and you already packed ${packedItems} items (${packedpercentage} %)`}
      </em>
    </footer>
  );
}

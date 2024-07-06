import { useState } from "react";
import { searchable } from "../../components/Searchable";

export function Movements() {
  const [hiddenELements, setHiddenElements] = useState([]);
  const movements = [
    {
      id: 1,
      amount: 100,
      date: "2021-10-01",
      description: "Salary",
    },
    {
      id: 2,
      amount: -50,
      date: "2021-10-02",
      description: "Rent",
    },
    {
      id: 3,
      amount: -10,
      date: "2021-10-03",
      description: "Food",
    },
    {
      id: 4,
      amount: 200,
      date: "2021-10-04",
      description: "Freelance",
    },
  ];
  return (
    <>
      {movements.map((movement) => (
        <Item
          onShow={() =>
            setHiddenElements(hiddenELements.filter((el) => el !== movement.id))
          }
          onHide={() => setHiddenElements([...hiddenELements, movement.id])}
          id={movement.id}
          date={movement.date}
          description={movement.description}
          amount={movement.amount}
        />
      ))}
      {hiddenELements.length === movements.length && <div>not FOund</div>}
    </>
  );
}

const Item = searchable(({ HighlightText, id, date, description, amount }) => {
  return (
    <div key={id} className="flex justify-between">
      <div>
        <HighlightText>{date}</HighlightText>
      </div>
      <div>
        <HighlightText>{description}</HighlightText>
      </div>
      <div>
        <HighlightText>{amount}</HighlightText>
      </div>
    </div>
  );
});

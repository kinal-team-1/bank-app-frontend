import { useQueries } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { searchable } from "../../components/Searchable";
import { getTransactions } from "../../actions/GET/get-transactions.js";
import { getTransferences } from "../../actions/GET/get-transferences";
import { getPayouts } from "../../actions/GET/get-payouts.js";

export function Movements() {
  // const [hiddenELements, setHiddenElements] = useState([]);
  const { locale } = useParams();
  const params = useSearchParams();
  useQueries({
    queries: [
      {
        queryKey: ["transactions", { locale, params }],
        queryFn: getTransactions,
      },
      {
        queryKey: ["transferences", { locale, params }],
        queryFn: getTransferences,
      },
      {
        queryKey: ["payouts", { locale, params }],
        queryFn: getPayouts,
      },
      // {
      //   queryKey: ["purchases", { locale, params }],
      //   queryFn: getPurchases,
      // },
    ],
  });
  return <>hi</>;
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

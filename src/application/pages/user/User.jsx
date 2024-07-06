import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getUsers } from "../../actions/GET/get-users";
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { UserCard } from "./UserCard";

export function User() {
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const { locale } = useParams();
  const [params] = useSearchParams();
  const {
    data: [users] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    queryKey: ["users", { locale, params }],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!users) return null;

  console.log({ users }, { hiddenElements });

  return (
    <div className="h-full flex flex-col">
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {users.map((user) => (
          <UserCard
            onShow={() => {
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.delete(user._id);
                return new Set(prev);
              });
            }}
            onHide={() =>
              setHiddenElements((prev) => {
                // eslint-disable-next-line no-underscore-dangle
                prev.add(user._id);
                return new Set(prev);
              })
            }
            /* eslint-disable-next-line no-underscore-dangle */
            key={user._id}
            email={user.email}
            username={user.username}
            password={user.password}
            name={user.name}
            last_name={user.last_name}
            address={user.address}
            DPI={user.DPI}
            phone_number={user.phone_number}
            job_name={user.job_name}
            monthly_income={user.monthly_income}
            currency_income={user.currency_income}
            main_account={user.main_account}
            accounts={user.accounts}
          />
        ))}
      </div>
      {hiddenElements.size === users.length && (
        <div className="flex text-3xl justify-center items-center h-full">
          <span>No elements found</span>
        </div>
      )}
    </div>
  );
}
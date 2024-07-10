import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { getAdminUser } from "../../actions/GET/get-adminUser";
import { ErrorContainer } from "../../components/ErrorContainer";
import { useFetchWithToast } from "../../hooks/use-fetch-with-toast";
import { UserAdminCard } from "./UserAdminCard";

export function UserAdmin() {
  const [hiddenElements, setHiddenElements] = useState(new Set());
  const { locale } = useParams();
  const [params] = useSearchParams();
  const {
    data: [users] = [],
    isLoading,
    error,
  } = useFetchWithToast({
    queryKey: ["admins", { locale, params }],
    queryFn: getAdminUser,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <ErrorContainer />;

  if (!users) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end">
        <Link
          className="bg-primary-400 rounded py-2 px-4 text-white"
          to="./create"
        >
          Crear Admin
        </Link>
      </div>
      <div className="grow content-start overflow-y-scroll gap-5 md:px-4 grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))]">
        {users.map((user) => (
          <UserAdminCard
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
            // eslint-disable-next-line no-underscore-dangle
            id={user._id}
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

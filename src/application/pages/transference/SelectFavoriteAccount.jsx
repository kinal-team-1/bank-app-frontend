import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useAuthService } from "../../../services/auth";
import { getFavoriteAccounts } from "../../actions/GET/get-favorite-accounts";
import { useMutationWithToast } from "../../hooks/use-mutation-with-toast";
import { postFavoriteAccount } from "../../actions/POST/post-favorite-account";
import { UISelect } from "../../components/UI/Select";

export function FavoriteAccountsSelect({
  ownerAccountId,
  onCreate,
  onChange,
  accountSelected,
}) {
  const { locale } = useParams();
  const { user } = useAuthService();
  const [form, setForm] = useState({
    alias: "",
    account: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    data: [favoriteAccounts] = [],
    isLoading,
    isError,
  } = useQuery({
    // eslint-disable-next-line no-underscore-dangle
    queryKey: ["favorite-accounts", { locale, userId: user._id }],
    queryFn: getFavoriteAccounts,
  });

  const mutation = useMutationWithToast(postFavoriteAccount, {
    invalidateQueries: ["favorite-accounts"],
  });

  useEffect(() => {
    if (!mutation.isSuccess && !mutation.isError) return;

    // wait 3 seconds before being able to submit again
    setTimeout(() => {
      mutation.reset();
    }, 3000);
  }, [mutation.isSuccess, mutation.isError]);

  useEffect(() => {
    if (!mutation.isSuccess) return;

    // when success, reset form
    onCreate(form);
    setForm({
      alias: "",
      account: "",
    });
  }, [mutation.isSuccess]);

  if (isLoading || isError) return null;

  return (
    <div className="w-full flex flex-col gap-2">
      <UISelect
        value={accountSelected}
        onChange={onChange}
        options={favoriteAccounts.map((fav) => {
          return {
            // eslint-disable-next-line no-underscore-dangle
            label: `${fav.alias} - ${fav.account.name}`,
            // eslint-disable-next-line no-underscore-dangle
            value: fav.account._id,
          };
        })}
      />
      <div>
        <button
          type="button"
          onClick={() => {
            setIsFormOpen((prev) => !prev);
          }}
          className="px-4 py-2 rounded border flex gap-2 items-center"
        >
          {!isFormOpen && (
            <>
              <span>Add more</span>
              <FontAwesomeIcon icon={faPlus} />
            </>
          )}
          {isFormOpen && (
            <>
              <span>Collapse</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </>
          )}
        </button>
      </div>
      {isFormOpen && (
        <div className="flex flex-col gap-3 py-2 px-10">
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            placeholder="Alias"
            value={form.alias}
            onChange={(e) => setForm({ ...form, alias: e.target.value })}
            type="text"
            className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
          />
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            placeholder="Account"
            value={form.account}
            onChange={(e) => setForm({ ...form, account: e.target.value })}
            type="text"
            className="min-w-[20ch] dark:text-silver-200 w-full px-3 py-2 rounded-lg border dark:bg-[#3B3F51] bg-gray-200 outline-none focus:outline-offset-2 focus:outline-primary-400"
          />
          <button
            type="button"
            onClick={() => {
              // TODO CREATE FAVORITE ACCOUNT
              if (!mutation.isIdle) return;
              mutation.mutate({
                locale,
                favoriteAccount: form,
                owner: ownerAccountId,
              });
            }}
            className="bg-primary-400 outline-none focus:outline-offset-2 focus:outline-primary-400 px-4 py-2 text-center rounded text-white hover:bg-primary-300 flex gap-2 justify-center"
          >
            Crear Favorite Account
          </button>
        </div>
      )}
    </div>
  );
}

FavoriteAccountsSelect.propTypes = {
  ownerAccountId: PropTypes.string.isRequired,
  onCreate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  accountSelected: PropTypes.string.isRequired,
};

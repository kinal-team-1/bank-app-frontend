import { useLocaleService } from "../../services/locale";

export function ErrorContainer() {
  const { LL } = useLocaleService();

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <h1 className="text-7xl font-bold">
          {LL.ERROR.SOMETHING_WENT_WRONG()}
        </h1>
        <p className="text-2xl">{LL.ERROR.PLEASE_TRY_AGAIN_LATER()}</p>
      </div>
    </div>
  );
}

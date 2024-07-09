import { useLocaleService } from "../../../services/locale";

export function Home() {
  const { LL } = useLocaleService();

  return (
    <div className="flex justify-center items-center h-full">
      <span className="text-7xl dark:text-silver-400 text-center">
        {LL?.TITLE()}
      </span>
    </div>
  );
}

import CurrentDateTime from "@/components/CurrentDateTime";
import { getServerSessionWrapper } from "@/utils";

export default async function Home() {
  let timeOfDay = "";
  const session = await getServerSessionWrapper();
  const date = new Date();
  const hour = date.getHours();
  switch (true) {
    case hour >= 0 && hour <= 11:
      timeOfDay = "morning";
      break;
    case hour >= 12 && hour <= 17:
      timeOfDay = "afternoon";
      break;
    case hour >= 18:
      timeOfDay = "evening";
      break;
    default:
      timeOfDay = "day";
      break;
  }

  return (
    <div>
      <span className="space-y-2">
        <h1 className="capitalize text-xl font-semibold">
          Good {timeOfDay}, {session?.user?.name}! 👋
        </h1>
        <p className="text-[.9rem]">
          <CurrentDateTime />
        </p>
      </span>
    </div>
  );
}

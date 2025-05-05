import { getServerSessionWrapper } from "@/utils";
import SettingsPage from ".";

const Settings = async () => {
  const session = await getServerSessionWrapper();

  return <SettingsPage userData={session.user} />;
};

export default Settings;

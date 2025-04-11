import { createGroup } from "@/app/actions/group";
import GroupForm from "@/components/GroupForm";

export default function CreateGroupPage() {
  return <GroupForm formAction={createGroup} initialData={{ title: "" }} />;
}

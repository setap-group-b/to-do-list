import Groups from "@/components/Groups";
import PageHeader from "@/components/PageHeader";

export default function UserGroups() {
  return (
    <div className="flex flex-col gap-8 h-full !overflow-hidden">
      <div className="flex items-center gap-4 justify-between">
        <PageHeader title={" Collaborative Lists"} />
      </div>
      <div className="flexx flex-col gap-4 flex-1 overflow-y-auto">
        <Groups />
      </div>
    </div>
  );
}

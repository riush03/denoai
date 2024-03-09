

import { UserProfile } from "@clerk/nextjs";
import { TopMainContent } from "@/components/TopMainContent";

import { DeleteSection } from "@/components/DeleteSection";

export default async function SettingsPage() {
  return (
    <div className="h-full">
      <TopMainContent title="Settings" displayUploadButton />
      <div className="m-8 flex flex-col flex-grow space-y-10 2xl:space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Manage account
          </h1>
             <UserProfile/>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Account</h1>
          <DeleteSection />
        </div>
      </div>
    </div>
  );
}

import Profile from "../../components/account/Profile";
// import UserInformation from "@/components/account/UserInformation";
import Menu from "../../components/account/Menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-100 min-h-[700px]">
      <div className="w-main mx-auto pt-10 flex gap-10">
        <Profile />
        <div className="flex-1">
          <Menu />
          {children}
        </div>
      </div>
    </section>
  );
}

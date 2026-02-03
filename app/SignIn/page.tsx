import LeftSide from "@/components/SignIn/LeftSide";
import Logo from "@/components/SignIn/logo";
import RightSide from "@/components/SignIn/Rightside";

export default function SignIn() {
    return (
        <div className="flex min-h-screen w-full bg-white flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden min-h-screen lg:min-h-full">
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_0%_100%,#E0F7FA_0%,#FFFFFF_40%)]" />

                <div className="z-10 w-full max-w-[360px] flex flex-col ml-35">
                    <Logo />
                    <LeftSide />
                </div>
            </div>
            <div className="hidden lg:flex w-1/2 p-5 h-screen sticky top-0">
                <RightSide />
            </div>
        </div>
    );
}
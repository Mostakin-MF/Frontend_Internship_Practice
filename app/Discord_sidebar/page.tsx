import SideBar from '../../components/Discord_sidebar';

export default function Home() {
    return (
        <div className="flex">
            <SideBar />
            <main className="ml-16 p-8 bg-discord-700 h-screen w-full text-white">
                <h1 className="text-2xl font-bold">Content Area</h1>
                <p className="mt-4">The sidebar is fixed and animated!</p>
                <div className="mt-8 p-4 bg-discord-600 rounded-lg shadow-md max-w-md">
                    <h2 className="font-bold mb-2">Instructions</h2>
                    <ul className="list-disc list-inside space-y-2 text-discord-200">
                        <li>Hover over icons to see the tooltips.</li>
                        <li>Hover over icons to see the rounded corner animation.</li>
                        <li>This layout mimics the Discord application structure.</li>
                    </ul>
                </div>
            </main>
        </div>
    );
}
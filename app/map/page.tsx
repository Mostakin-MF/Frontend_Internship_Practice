import { Map, MapControls } from "@/components/ui/map";

export default function MapPage() {
    return (
        <div className="h-[800px] w-full">
            <Map center={[-74.006, 40.7128]} zoom={11}>
                <MapControls />
            </Map>
        </div>
    );
}
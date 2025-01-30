import { RoomCanvas } from "@/components/RoomCanvas";

export default function CanvasPage({ params }: { params: { slug: string[] } }) {
  const roomId = params.slug[1];
  console.log(roomId);

  return <RoomCanvas roomId={roomId} />;
}

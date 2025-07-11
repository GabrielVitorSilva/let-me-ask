import { Link } from "react-router-dom";
import { useRooms } from "@/http/use-rooms";
import { useDeleteRoom } from "@/http/use-delete-room";
import { dayjs } from "@/lib/dayjs";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import deleteIcon from "@/assets/delete.svg";
import editIcon from "@/assets/edit.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function RoomList() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const { mutate: deleteRoom } = useDeleteRoom();

  const { data, isLoading } = useRooms();

  function handleEdit(roomId: string, name: string, description: string) {
    navigate(`/edit/${roomId}`, {
    state: {
      name,
      description,
    },
  });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando salas...</p>
        )}

        {data?.map((room) => {
          return (
            <Link
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
              key={room.id}
              to={`/room/${room.id}`}
              onMouseEnter={() => setHovered(room.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-medium">{room.name}</h3>

                <div className="flex items-center gap-2">
                  <Badge className="text-xs" variant="secondary">
                    {dayjs(room.createdAt).toNow()}
                  </Badge>
                  <Badge className="text-xs" variant="secondary">
                    {room.questionsCount} pergunta(s)
                  </Badge>
                </div>
              </div>

              <div className={`${hovered == room.id ? "flex" : "hidden"} `}>
                <button
                  className="hover:cursor-pointer hover:scale-125"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleEdit(room.id, room.name, room.description);
                  }}
                >
                  <img
                    className="mr-1.5 w-5"
                    src={editIcon}
                    alt="Editar sala"
                  />
                </button>
                <button
                  className="hover:cursor-pointer hover:scale-125"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteRoom(room.id);
                  }}
                >
                  <img className="w-5" src={deleteIcon} alt="Apagar sala" />
                </button>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}


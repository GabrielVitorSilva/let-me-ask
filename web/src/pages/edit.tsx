import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useEditRoom } from "@/http/use-edit-room";
import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const editRoomSchema = z.object({
  name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres" }),
  description: z.string(),
});

type EditRoomFormData = z.infer<typeof editRoomSchema>;

type RoomParams = {
  roomId: string;
};

export function EditRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<RoomParams>();
  const { name, description } = location.state || {};
  const { mutate: editRoom } = useEditRoom();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  const editRoomForm = useForm<EditRoomFormData>({
    resolver: zodResolver(editRoomSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
    },
  });

  async function handleEditRoom({ name, description }: EditRoomFormData) {
    editRoom({ id: params.roomId!, data: { name, description } });

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center">
      <div className="flex justify-start mt-8 w-[90%] ">
        <Link to="/">
          <Button variant="outline" className="">
            <ArrowLeft className="ml-2 size-4" />
            Voltar ao Início
          </Button>
        </Link>
      </div>
    <Card className="w-[90%] m-auto my-20">
        
      <CardHeader>
        <CardTitle>Editar Sala</CardTitle>
        <CardDescription>Editar uma sala</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...editRoomForm}>
          <form
            className="flex flex-col gap-4"
            onSubmit={editRoomForm.handleSubmit(handleEditRoom)}
          >
            <FormField
              control={editRoomForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da sala</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Digite o nome da sala..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={editRoomForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Digite a descrição..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Editar Sala
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  );
}


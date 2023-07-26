import { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
    id: string; // 할 일 ID
    order: number; // 할 일 순서
    title: string; // 할 일 제목
    done: boolean; // 할 일 완료 여부
    createdAt: string; // 할 일 생성일
    updatedAt: string; // 할 일 수정일
}

export default function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState("");
    const [isTest, setIsTest] = useState(false);

    useEffect(() => {
        readTodos();
    }, [isTest]);

    async function readTodos() {
        const { data } = await axios({
            url: "/api/todos",
            method: "POST",
            data: {
                method: "GET",
            },
        });
        console.log(data);

        setTodos(data);
    }

    async function createTodo() {
        const { data } = await axios({
            url: "/api/todos",
            method: "POST",
            data: {
                method: "POST",
                data: {
                    title,
                },
            },
        });
        console.log(data);
        setTitle("");
        setIsTest(!isTest);
    }

    async function deleteTodo(todoId: Todo["id"]) {
        const { data } = await axios({
            url: "/api/todos",
            method: "POST",
            data: {
                path: todoId,
                method: "DELETE",
            },
        });
        console.log(data);
        setIsTest(!isTest);
    }

    console.log(todos);
    return (
        <>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") createTodo();
                }}
            />
            {todos.map((todo) => (
                <div key={todo.id} onClick={() => deleteTodo(todo.id)}>
                    {todo.title}
                </div>
            ))}
        </>
    );
}

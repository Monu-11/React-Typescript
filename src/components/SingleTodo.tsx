import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    ele: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo: React.FC<Props> = ({ ele, todos, setTodos, index }) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(ele.todo)

    const handleDone = (id: number) => {
        setTodos(
            todos.map((ele) => ele.id === id ? { ...ele, isDone: !ele.isDone } : ele)
        )
    }
    const handleDelete = (id: number) => {
        setTodos(
            todos.filter((ele) => ele.id !== id)
        )
    }
    const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault()
        setTodos(
            todos.map((ele) => ele.id === id ? { ...ele, todo: editTodo } : ele)
        )
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    return (
        <Draggable draggableId={ele.id.toString()} index={index} >
            {
                (provided,snapshot) => (
                    <form 
                    className={`todos_single ${snapshot.isDragging ? 'drag': ''}`}
                    onSubmit={(e) => handleEdit(e, ele.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >
                        {
                            edit ? (
                                <input
                                    ref={inputRef}
                                    value={editTodo}
                                    onChange={(e) => setEditTodo(e.target.value)}
                                    className='todos_single-text'
                                />
                            ) : (

                                ele.isDone ? (
                                    <s className='todos_single-text'>{ele.todo}</s>
                                ) : (
                                    <span className='todos_single-text'>{ele.todo}</span>
                                )

                            )
                        }



                        <div>
                            <span className="icon"
                                onClick={() => {
                                    if (!edit && !ele.isDone) {
                                        setEdit(!edit)
                                    }
                                }}>
                                <AiFillEdit />
                            </span>
                            <span className="icon" onClick={() => handleDelete(ele.id)}>
                                <AiFillDelete />
                            </span>
                            <span className="icon" onClick={() => handleDone(ele.id)}>
                                <MdDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo
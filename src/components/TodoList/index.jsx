import React, { useState } from "react";
import { Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import {
  listAdd,
  listToggleComplete,
  listRemove,
} from "../../store/slice/todoListSlice";
import Message from "../Message";
import "./styles.css";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const [list, setList] = useState("");

  const data = useAppSelector((state) => state.todoList);
  const { todoList, repeat } = data;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listAdd({ name: list, complete: false }));
    setList("");
  };

  const handleDelete = (item) => {
    dispatch(listRemove(item));
  };

  const handleToggleComplete = (item) => {
    dispatch(listToggleComplete(item));
  };

  return (
    <div className='todoList'>
      <Form className='mx-2 my-2' onSubmit={submitHandler}>
        <Form.Group controlId='inputList'>
          <Row>
            <Col xs={9} sm={8}>
              <Form.Control
                type='text'
                value={list}
                onChange={(e) => setList(e.target.value)}
                placeholder='Enter list'
                required
              />
            </Col>
            <Col xs={3} sm={4} className='d-flex align-items-end'>
              <Button type='submit'>Add</Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      {todoList.length > 0 ? (
        <>
          {repeat && (
            <Message variant='danger'>This note is already added</Message>
          )}
          <ListGroup className='todolistList'>
            {todoList.map((listItem) => (
              <ListGroup.Item
                variant={listItem.complete ? "success" : "primary"}
                key={listItem.name}
                className='d-flex justify-content-between align-items-inline'
              >
                <span>- {listItem.name}</span>
                <div>
                  <Button
                    size="sm"
                    variant={listItem.complete ? "success" : "danger"}
                    className='me-1'
                    onClick={() => handleToggleComplete(listItem.name)}
                  >
                    {listItem.complete ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-eraser'></i>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant='dark'
                    onClick={() => handleDelete(listItem.name)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <ListGroup>
          <ListGroup.Item className='text-center'>
            Nothing to do yet
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
};

export default TodoList;

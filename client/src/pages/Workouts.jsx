import React from 'react'
import '../css/Workouts.css'
import { useState, useEffect, useRef } from 'react';
import { getExercises, reset } from '../redux/exercises/exerciseSlice';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



export const Workouts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { exercises } = useSelector((state) => state.exercises);
  useEffect(() => {
    if (exercises.length === 0) {
      dispatch(getExercises());
    }
  }, [exercises.length]);

  const [exercisesList, setExercisesList] = useState(exercises);

  const columnsBase = {
    ['mydragableexercises']: {
      name: 'mydragableexercises',
      items: exercisesList
    },
    ['inworkoutexercises']: {
      name: 'inworkoutexercises',
      items: []
    }
  }
  const [columns, setColumns] = useState(columnsBase);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <div className="workouts">

      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        <div className="workouts_create">
          <span className='input-item workouts_create_name'>
            <input type="text" placeholder="Workout Name" className='form-input' />
          </span>
          <div className="workouts_create_droped">
            <Droppable droppableId="inworkoutexercises">
              {(provided) => (
                <>
                  <div className="workouts_dragdrop_list" {...provided.droppableProps} ref={provided.innerRef}>
                    {columns['inworkoutexercises'].items.length === 0 && <h2>To add exercises to the workout drag them here</h2>}
                    {columns['inworkoutexercises'].items.map((exercise, index) => {
                      return (
                        <Draggable key={exercise._id} draggableId={exercise._id} index={index}>
                          {(provided, snapshot) => (
                            <div className="exercise_dragdrop" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                            style={{ boxShadow: snapshot.isDragging && '4px 4px 0 0 #00000040', ...provided.draggableProps.style }}>
                              <ExerciseDragableDropable exercise={exercise} key={index} />
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                </>
              )}
            </Droppable>

          </div>
        </div>
        <div className="workouts_dragdrop">
          <h1>Your exercise</h1>
          <Droppable droppableId="mydragableexercises">
            {(provided) => (
              <>
                <div className="workouts_dragdrop_list" {...provided.droppableProps} ref={provided.innerRef}>
                  {columns['mydragableexercises'].items.length === 0 && <h2>You have no more exercises avilable, to get more exercise create or like one!</h2>}
                  {columns['mydragableexercises'].items.map((exercise, index) => {
                    return (
                      <Draggable key={exercise._id} draggableId={exercise._id} index={index}>
                        {(provided, snapshot) => (
                          <div className="exercise_dragdrop" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          style={{ boxShadow: snapshot.isDragging && '4px 4px 0 0 #00000040', ...provided.draggableProps.style }}>
                            <ExerciseDragableDropable exercise={exercise} key={index} />
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
              </div>
              </>
            )}
        </Droppable>
    </div>
      </DragDropContext >
    </div >

  )
}

const ExerciseDragableDropable = ({ exercise }) => {
  return (
    <>
      <i class="fa-solid fa-grip"></i>
      {exercise.exercisename}
      <div className="workout_create_bodyparts">
      {exercise.bodypart.map((bodypart, index) => {
        return (
          <span key={index}>{bodypart}</span>
        )
      })}
      </div>
    </>
  )
}



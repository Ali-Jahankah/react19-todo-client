import type { ChangeEvent, FC, ReactElement } from 'react';
import type { IEditFormProps } from '../types/todos';
import { cancelAction } from '../constants';

const EditForm: FC<IEditFormProps> = ({
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  updateHandler,
  todo,
  editHandler
}): ReactElement => {
  return (
    <div>
      <input
        value={editTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEditTitle(e.target.value)
        }
      />
      <input
        value={editDescription}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEditDescription(e.target.value)
        }
      />
      <button
        type="button"
        onClick={() =>
          updateHandler({
            ...todo,
            title: editTitle,
            description: editDescription
          })
        }
      >
        Save
      </button>
      <button type="button" onClick={() => editHandler(todo, cancelAction)}>
        Cancel
      </button>
    </div>
  );
};

export default EditForm;

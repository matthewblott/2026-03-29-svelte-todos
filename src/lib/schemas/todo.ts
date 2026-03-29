import * as v from 'valibot';

export const TodoSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(1, 'Title is required'),
    v.maxLength(255, 'Title must be 255 characters or less'),
  ),
});

export type TodoInput = v.InferInput<typeof TodoSchema>;

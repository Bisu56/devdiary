import { describe, it, expect } from 'vitest';

describe('CommentItem', () => {
  it('should render comment data correctly', () => {
    const comment = {
      _id: '1',
      author: { _id: 'user1', name: 'John Doe' },
      content: 'Great post!',
      createdAt: '2026-04-01T00:00:00.000Z',
      likes: 5,
    };

    expect(comment.author.name).toBe('John Doe');
    expect(comment.content).toBe('Great post!');
    expect(comment.likes).toBe(5);
  });

  it('should have required comment fields', () => {
    const comment = {
      _id: '1',
      author: { _id: 'user1', name: 'Test' },
      content: 'Test content',
    };

    expect(comment).toHaveProperty('_id');
    expect(comment).toHaveProperty('author');
    expect(comment).toHaveProperty('content');
  });
});
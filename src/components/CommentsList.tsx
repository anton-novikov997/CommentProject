import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from '../api/commentApi';
import {  MemoizedCommentItem } from './CommentItem';
import { VariableSizeList as List } from 'react-window';
import {
  CommentWrapper,
  StyledList,
} from './styledComponents/StyledComponents';

export const CommentsList = () => {
  const { data: comments } = useGetCommentsQuery('');
  const [deleteComment] = useDeleteCommentMutation();

  const itemsHeights = useRef<Record<number, number>>({});
  const virtualList = useRef<List>(null);

  const handleDeleteComments = useCallback(async (id: string) => {
    try {
      await deleteComment(id).unwrap();
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
    }
  }, [deleteComment]);

  const getReplies = useCallback((parentId: string | null) => {
    return comments?.filter((comment) => comment.parentId === parentId) || [];
  }, [comments]);

  const getDialogItemSize = (index: number) =>
    itemsHeights.current[index] || 200;

  const setDialogItemSize = useCallback(
    (index: number, size: number) => {
      itemsHeights.current = {
        ...itemsHeights.current,
        [index]: size,
      };

      if (virtualList.current) {
        virtualList.current.resetAfterIndex(index);
      }
    },
    [itemsHeights],
  );

  const parentComments = useMemo(
    () => comments?.filter((comment) => comment.parentId === null) || [],
    [comments]
  );

  const Row: React.FC<{ index: number; style: object }> = ({
    index,
    style,
  }) => {
    const comment = parentComments[index];
    const newStyle = { ...style, width: '100%' };
    const replies = getReplies(comment.id);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref.current) {
        const height = ref.current.getBoundingClientRect().height;
        setDialogItemSize(index, height);
      }
    }, [index, setDialogItemSize]);

    return (
      <div style={newStyle} key={comment.id}>
        <CommentWrapper ref={ref}>
          <MemoizedCommentItem
            dislike={comment.dislike}
            like={comment.like}
            comment={comment}
            replies={replies}
            onDelete={handleDeleteComments}
            getReplies={getReplies}
          />
        </CommentWrapper>
      </div>
    );
  };
  return (
    <StyledList
      height={550}
      itemCount={parentComments.length}
      itemSize={getDialogItemSize}
      width={700}
      ref={virtualList}
    >
      {Row}
    </StyledList>
  );
};

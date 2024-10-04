import { styled } from 'styled-components';
import { VariableSizeList as List } from 'react-window';

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 40px;
`;
export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffff;
  padding: 10px 20px;
`;
export const Header = styled.h2`
  display: inline-flex;
  width: 100%;
  margin-bottom: 10px;
  text-align: start;
  justify-self: start;
`;


export const CommentContentContainer = styled.div<{ $parentId?: string }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: ${(props) => (props.$parentId === null ? '0' : '6px 0 16px 14px')};
`;

export const CommentItemAvNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const CommentForm = styled.div<{ $parentId?: string }>`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  height: auto;
  color: ${(props) => (props.$parentId === null ? 'black' : 'grey')};
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export const IconContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const IconButton = styled.button<{ isDisabledFormAdd?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  font-size: 1.5em;
  color: ${(props) => (props.isDisabledFormAdd ? 'gray' : '#0e7cdd')};

  &:hover {
    color: #000;
  }
`;

export const FormContainer = styled.div`
  border: 1px solid #00bfff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
`;
export const Username = styled.span`
  font-weight: bold;
  color: #333;
`;
export const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  height: 100px;
  border-radius: 4px;
  resize: none;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(128, 128, 128, 0.6);
  padding: 15px 0 0 0;
`;
export const AddCommentButton = styled.button<{ isDisabledFormAdd: boolean }>`
  padding: 15px 20px;
  background-color: ${(props) =>
  props.isDisabledFormAdd ? 'gray' : '#0e7cdd'};
  color: white;
  border: none;
  border-radius: 15px;
`;

export const CommentFormAvNameContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const CommentContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;
export const StyledList = styled(List)`
  scrollbar-width: auto;

  //&::-webkit-scrollbar {
    //  display: none;
    //}
`;
export const ModalForm = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden;
`;
export const ModalContent = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: white;
  height: 300px;
  width: 500px;
`;
export const ReplyModalTextArea = styled.textarea`
  width: 100%;
  border: none;
  height: 200px;
  resize: none;
  outline: none;
  padding: 10px;

  &:focus {
    border: 1px solid #4a90e2;
    border-radius: 20px;
    outline: none;
  }
`;
export const ReplyCommentAddContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
export const ReplyCommentAdd = styled(AddCommentButton)``;

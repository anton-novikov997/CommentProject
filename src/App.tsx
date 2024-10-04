import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import { CommentsList } from './components/CommentsList';
import { CommentForm } from './components/CommentsForm';
import {
  AppContainer,
  CommentWrapper,
  Header,
} from './components/styledComponents/StyledComponents';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <CommentWrapper>
          <Header>Comments</Header>
          <CommentForm avatar={'/img/avatar1.jpg'} username={'John Doe'} />
          <CommentsList />
        </CommentWrapper>
      </AppContainer>
    </>
  );
};

export default App;

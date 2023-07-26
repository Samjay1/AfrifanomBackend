import {Routes, Route, HashRouter} from 'react-router-dom'
import Login from './Screens/Login';
import Register from './Screens/Register';
import List from './Screens/List';
import Preview from './Screens/Preview';
import LoanRequest from './Screens/LoanRequest';

import React from 'react';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <Login />
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

function App() {
  return (
    <div>
      <HashRouter basename={'/'}>
       <Routes>
       <Route exact path={`${process.env.PUBLIC_URL}/*`} element={<Login/>}/>
       
         <Route exact path={`${process.env.PUBLIC_URL}/`} element={
         <ErrorBoundary>
         <Login/>
            </ErrorBoundary>} /> 
            <Route exact path={`${process.env.PUBLIC_URL}/login`} element={
         <ErrorBoundary>
             <Login/>
            </ErrorBoundary>} />
            
            <Route exact path={`${process.env.PUBLIC_URL}/request`} element={
         <ErrorBoundary>
             <LoanRequest/>
            </ErrorBoundary>} />
            
          
        <Route exact path={`${process.env.PUBLIC_URL}/list`} element={
          <ErrorBoundary>
            <List/>
          </ErrorBoundary>
          } /> 
           <Route exact path={`${process.env.PUBLIC_URL}/preview`} element={
          <ErrorBoundary>
            <Preview/>
          </ErrorBoundary>
          }/> 
 
         <Route exact path={`${process.env.PUBLIC_URL}/register`} element={
         <ErrorBoundary>
             <Register/>
         </ErrorBoundary>}/>
 
         {/* <Route path={`${process.env.PUBLIC_URL}/settings`} element={<Settings/>}/> */} 
         <Route path="/*" component={Register} />
 
       
       </Routes>
     </HashRouter>
    </div>
  );
}

export default App;
 


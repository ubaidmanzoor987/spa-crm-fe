import styled from "@emotion/styled";
import { ToastContainer } from "react-toastify";

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    
  }
  .Toastify__close-button--light{
    color:white;
  }
  .Toastify__toast {
    background-color:#8BC152;
    border-radius: 10px;
    margin-bottom:0.5rem;
  }
  .Toastify__toast-body {
    color:white;
  }
  .Toastify__progress-bar {
    background-color:white;
  }

  .Toastify__toast-container {
    // width: 320px;
  }
  .Toastify__toast--default {
      background: #fff;
      color: #aaa;
   }
    .Toastify__toast--info {
      background: #3498db;
   }
    .Toastify__toast--success {
      background: #8BC152;
   }
    .Toastify__toast--warning {
      background: #f1c40f;
   }
    .Toastify__toast--error {
      background:  #F05F97;
   }
 
`;

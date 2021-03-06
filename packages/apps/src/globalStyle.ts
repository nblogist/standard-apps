import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .loans-modal {
    // background: transparent !important;
    background: #fff !important;
    max-width: none !important;
}

  .loans-modal-actions {
    .ui--Button {
      color: var(--grey50);
      border: 1px solid var(--grey50);
    }
  }

  .loans-card {
    flex: 1 1 0% !important;
    margin: 0 !important;
    min-width: 350px !important;
    width: auto !important;
  }

  .loans-btn {
    color: #9a12b3 !important;
    border: 0 !important;
    border: 1px solid #9a12b3 !important;
    border-radius: 4px !important;
  }

  .loans-header {
    color: #9a12b3 !important;
  }
  
  .ui.placeholder {
    background-image: linear-gradient(
      to right,
      rgba(19,21,35, 0.01) 0,
      rgba(19,21,35, 0.15) 15%,
      rgba(19,21,35, 0.01) 30%
    );
  }
`;

export default GlobalStyle;

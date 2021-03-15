import React from "react";
import styled from "styled-components";
import { TextBlock, RoundShape, RectShape } from "react-placeholder/lib/placeholders";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

const CardPlaceholder = (
  <div className="cc-placeholder">
    <RoundShape className="cc-placeholder-shape" color="#6143bc" style={{ width: 70, height: 70 }} />
    <TextBlock className="cc-placeholder-shape" rows={2} color="#6143bc" style={{ width: 160, height: 25 }} />
    <TextBlock className="cc-placeholder-shape" rows={2} color="#6143bc" style={{ width: 160, height: 25 }} />
    <TextBlock className="cc-placeholder-shape" rows={2} color="#6143bc" style={{ width: 160, height: 25 }} />
  </div>
);

const CryptoCardPlaceholder = ({ className }: any) => {
  return (
    <ReactPlaceholder
      showLoadingAnimation={true}
      ready={false}
      customPlaceholder={CardPlaceholder}
      className={`${className}`}
    >
      <div></div>
    </ReactPlaceholder>
  );
};

export default React.memo(styled(CryptoCardPlaceholder)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .cc-placeholder-shape {
    margin-bottom: 20px;
  }
`);

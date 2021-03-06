import React, { useState } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Button, Card, Image, Message } from "semantic-ui-react";
import LoanActions from "./LoansActions";

// details are to come from loans and its form the back end
interface LoansDetailProps extends Props {
  details: any;
}

function LoansDetail({ className = "", details = {} }: LoansDetailProps): React.ReactElement<LoansDetailProps> {
  const [openBorrowedAction, setOpenBorrowedAction] = useState(false);
  const [openCollateralAction, setOpenCollateralAction] = useState(false);

  return (
    <div className={`${className} loans-detail--Wrapper`}>
      <Message warning className="warning">
        <Message.Header>Possible Warning</Message.Header>
        <p>Possible Warning</p>
      </Message>
      <div className="details-container">
        <Card className="loans-card">
          <h1 style={{ margin: "14px", color: "#000", fontSize: "1rem" }}>Borrowed</h1>
          <Card.Content>
            <Image floated="right" size="mini" src="/images/avatar/large/steve.jpg" />
            <Card.Header className="loans-header">
              {details.deposit} {details.token}
            </Card.Header>
            <Card.Meta>Aprox $000.00</Card.Meta>
            <Card.Description style={{ marginTop: "2rem" }}>
              <div>
                <p style={{ fontWeight: 300, fontSize: "1rem" }}>Can pay back</p>
                <p style={{ fontWeight: 300, color: "#000", fontSize: "1rem" }}>$000</p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontWeight: 300, fontSize: "1rem" }}>Can Generate</p>
                <p style={{ fontWeight: 300, color: "#000", fontSize: "1rem" }}>$000</p>
              </div>
            </Card.Description>
          </Card.Content>
          {openBorrowedAction ? <LoanActions cancel={() => setOpenBorrowedAction(false)} /> : ""}
          <Card.Content extra>
            <div className="ui two buttons">
              <Button className="loans-btn" onClick={() => setOpenBorrowedAction(true)}>
                Payback
              </Button>
              <Button className="loans-btn" onClick={() => setOpenBorrowedAction(true)}>
                Generate
              </Button>
            </div>
          </Card.Content>
        </Card>
        <Card className="loans-card">
          <h1 style={{ margin: "14px", color: "#000", fontSize: "1rem" }}>Collateral</h1>
          <Card.Content>
            <Image floated="right" size="mini" src="/images/avatar/large/steve.jpg" />
            <Card.Header className="loans-header">00 MPI</Card.Header>
            <Card.Meta>Aprox $000.00</Card.Meta>
            <Card.Description style={{ marginTop: "2rem" }}>
              <div>
                <p style={{ fontWeight: 300, fontSize: "1rem" }}>Can pay back</p>
                <p style={{ fontWeight: 300, color: "#000", fontSize: "1rem" }}>$000</p>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontWeight: 300, fontSize: "1rem" }}>Can Generate</p>
                <p style={{ fontWeight: 300, color: "#000", fontSize: "1rem" }}>$000</p>
              </div>
            </Card.Description>
          </Card.Content>
          {openCollateralAction ? <LoanActions cancel={() => setOpenCollateralAction(false)} /> : ""}
          <Card.Content extra>
            <div className="ui two buttons">
              <Button className="loans-btn" onClick={() => setOpenCollateralAction(true)}>
                Deposit
              </Button>
              <Button className="loans-btn" onClick={() => setOpenCollateralAction(true)}>
                Withdraw
              </Button>
            </div>
          </Card.Content>
        </Card>
        <div
          style={{
            background: "#fff",
            borderRadius: "4px",
            display: "flex",
            gap: "1rem",
            width: "100%"
          }}
        >
          <div>
            <div style={{ color: "#000", fontSize: "1rem", marginBottom: "0.5rem" }}>Interest Rate</div>
            <div>{details.interestRate}</div>
          </div>
          <div>
            <div style={{ color: "#000", fontSize: "1rem", marginBottom: "0.5rem" }}>Liquidation Price</div>
            <div>$23.123</div>
          </div>
          <div>
            <div style={{ color: "#000", fontSize: "1rem", marginBottom: "0.5rem" }}>Current Price</div>
            <div>$45.23</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(LoansDetail)`
  .warning {
    width: 100%;
  }

  .details-container {
    align-items: flex-start;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;
  }
`);

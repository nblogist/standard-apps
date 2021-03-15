import React from "react";
import styled from "styled-components";
import { BareProps as Props } from "@canvas-ui/react-components/types";
import { Table as SUITable } from "semantic-ui-react";

interface TableCellProps extends Props {
  cellData: Array<string>;
  type: string;
}

function TableCellFactory({ className = "", cellData, type }: TableCellProps): React.ReactElement<TableCellProps> {
  const renderCell = (type: string): React.ReactElement<TableCellProps> => {
    if (type === "farm") {
      const [image, head, ...rest] = cellData;
      return (
        <SUITable.Cell>
          <div className={`${className}`}>
            <div className="table-cell-farm-wrapper">
              <div className="table-cell-farm-image">
                <img width="35px" height="35px" src={image} />
              </div>
              <div>
                {rest.map((item, i) => {
                  return i < rest.length - 1 ? (
                    <p className="table-cell-text" key={i}>
                      {item}
                    </p>
                  ) : (
                    <a key={i} href={item}>
                      {"Details"}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </SUITable.Cell>
      );
    } else if (type == "yield") {
      {
        const [image, yieldAmount, coinType, unit, points] = cellData;
        return (
          <SUITable.Cell>
            <div className={className}>
              <p className="table-cell-text">
                {yieldAmount} {coinType} per {unit}
              </p>
            </div>
          </SUITable.Cell>
        );
      }
    } else if (type === "ROI") {
      const [oneY, oneM, oneD] = cellData;
      return (
        <SUITable.Cell>
          <div className={className}>
            <p className="table-cell-text">
              {oneY} <span className="table-cell-roi-unit ">/year</span>
            </p>
            <p className="table-cell-text">
              {oneM} <span className="table-cell-roi-unit ">/month</span>
            </p>
            <p className="table-cell-text">
              {oneD} <span className="table-cell-roi-unit ">/day</span>
            </p>
          </div>
        </SUITable.Cell>
      );
    }
    const [val, tok1, tok1Amt, tok2, tok2Amt] = cellData;
    return (
      <SUITable.Cell>
        <div className={className}>
          <p className="table-cell-text">{val} </p>
          <p className="table-cell-text">
            {tok1Amt} <span className="table-cell-roi-unit ">{tok1}</span>
          </p>
          <p className="table-cell-text">
            {tok2Amt} <span className="table-cell-roi-unit ">{tok2}</span>
          </p>
        </div>
      </SUITable.Cell>
    );
  };

  return renderCell(type);
}

export default React.memo(styled(TableCellFactory)`
  .table-cell-head {
  }

  .table-cell-farm-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: ${props => props.theme.margins.lg};
  }

  .table-cell-farm-wrapper {
    display: flex !important;
  }

  .table-cell-yield-wrapper {
    display: flex;
  }
  .table-cell-yield-info {
    margin-left: ${props => props.theme.margins.small};
  }

  .table-cell-text {
  }

  .table-cell-roi-unit {
    margin-left: 4px;
    color: ${props => props.theme.textlight};
  }
`);

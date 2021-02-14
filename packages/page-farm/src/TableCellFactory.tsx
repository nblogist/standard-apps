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
                <h1 className="table-cell-head">{head}</h1>
                {rest.map((item, i) => {
                  return i < rest.length - 1 ? (
                    <p className="table-cell-text" key={i}>
                      {item}
                    </p>
                  ) : (
                    <a key={i} href={item}>
                      {"View Pair"}
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
        const [image, yieldAmount, coinTypePeriod, points] = cellData;
        return (
          <SUITable.Cell>
            <div className={className}>
              <div className="table-cell-yield-wrapper">
                <img width="25px" height="25px" src={image} />
                <div className="table-cell-yield-info">
                  <p className="table-cell-text">{yieldAmount}</p>
                  <p className="table-cell-text">{coinTypePeriod}</p>
                </div>
              </div>
              <div>
                <p className="table-cell-text">{points}</p>
              </div>
            </div>
          </SUITable.Cell>
        );
      }
    }
    {
      const [head, ...rest] = cellData;
      return (
        <SUITable.Cell>
          <div className={className}>
            <h1 className="table-cell-head">{head}</h1>
            {rest.map((item, i) => {
              return (
                <p className="table-cell-text" key={i}>
                  {item}
                </p>
              );
            })}
          </div>
        </SUITable.Cell>
      );
    }
  };

  return renderCell(type);
}

export default React.memo(styled(TableCellFactory)`
  .table-cell-head {
    font-size: ${props => props.theme.fontSizes.base};
    font-weight: 600;
    color: ${props => props.theme.root.text};
    margin-bottom: ${props => props.theme.margins.base};
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
    font-size: ${props => props.theme.fontSizes.xs};
    color: ${props => props.theme.root.text1};
    margin-bottom: 0;
  }
`);

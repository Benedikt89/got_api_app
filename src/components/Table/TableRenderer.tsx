import * as React from "react";
import {DataPayloadType} from "../../types/data-types";
import {isCharacter} from "../../types/typeHelpers";
import {I_ColumnObject} from "../../constants/tableColums";

interface TableRendererProps {
  columns: I_ColumnObject[]
  dataArray: DataPayloadType[]
}
const TableRenderer: React.FC<TableRendererProps> = React.memo(({columns, dataArray}) => {
  return (
    <div className="ant-table">
      <div className="ant-table-container">
        <div className="ant-table-content">
          <table style={{tableLayout: 'auto'}}>
            <thead className="ant-table-thead">
            <tr>{columns.map(column => <th className="ant-table-cell"
                                           key={column.dataKey}>{column.title}</th>)}</tr>
            </thead>
            <tbody className="ant-table-tbody">
            {dataArray.map((item: DataPayloadType) => isCharacter(item) ? (
              <tr className="ant-table-row ant-table-row-level-0">
                {columns.map(column => (
                  <td key={column.dataKey + item.id}>
                    <div style={{maxWidth: column.width ? `${column.width}px` : `170px`}}>
                      {column.formatter(item)}
                    </div>
                  </td>
                ))}
              </tr>
            ) : null)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
});

export default TableRenderer;